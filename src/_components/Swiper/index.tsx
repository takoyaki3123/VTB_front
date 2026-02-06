'use client';
import { getRefValue, useStateRef } from '@/_libs/refHook';
import { cn, getTouchData } from '@/_libs/utils';
import { ReactNode, useRef, useState } from 'react';

const SwiperContainer = ({
  className,
  ...props
}: React.ComponentProps<'div'>) => {
  return (
    <div
      className={cn(
        'min-w-full w-full overflow-hidden touch-pan-y relative',
        className
      )}
      {...props}
    />
  );
};

const SwiperList = ({ className, ...props }: React.ComponentProps<'ul'>) => {
  return (
    <ul
      className={cn('min-w-full flex flex-row list-none', className)}
      {...props}
    />
  );
};

const SwiperItem = ({ className, ...props }: React.ComponentProps<'li'>) => {
  return <li className={cn('w-full h-full shrink-0', className)} {...props} />;
};

type swiperItemType = {
  items: Array<ReactNode>;
};

function moveSwiper(
  setOffsetX: (x: number) => void,
  leftLimit: number,
  rightLimit: number,
  newOffsetX: number
) {
  if (newOffsetX > leftLimit) {
    newOffsetX = leftLimit;
  } else if (newOffsetX < rightLimit) {
    newOffsetX = rightLimit;
  }
  setOffsetX(newOffsetX);
}

const Swiper = ({
  items,
  arrow = false,
  listClassName,
  itemClassName,
  containerClassName,
}: swiperItemType & {
  arrow?: boolean;
  listClassName?: string;
  itemClassName?: string;
  containerClassName?: string;
}) => {
  const listRef = useRef<HTMLUListElement>(null);
  const [swiping, setSwiping] = useState(false);
  const currentOffsetXRef = useRef(0);
  const startDragXRef = useRef(0);
  const rightEndOffsetX = useRef(0);
  const [offsetX, setOffsetX, offsetXRef] = useStateRef(0);

  const onTouchMove = (e: MouseEvent | TouchEvent) => {
    const currentX = getTouchData(e).clientX;
    const diff = getRefValue(startDragXRef) - currentX;
    const newOffsetX = getRefValue(currentOffsetXRef) - diff;

    // stop at the end of container
    moveSwiper(setOffsetX, 0, rightEndOffsetX.current, newOffsetX);
  };

  const onTouchEnd = () => {
    setSwiping(false);
    const ulWidth = getRefValue(listRef)!.scrollWidth;
    const itemWidth = ulWidth / items.length;
    let newOffsetX = getRefValue(offsetXRef);

    // auto stop at the closer item
    newOffsetX = Math.round(newOffsetX / itemWidth) * itemWidth;
    moveSwiper(setOffsetX, 0, rightEndOffsetX.current, newOffsetX);

    window.removeEventListener('mouseup', onTouchEnd);
    window.removeEventListener('mousemove', onTouchMove);
    window.removeEventListener('touchend', onTouchEnd);
    window.removeEventListener('touchmove', onTouchMove);
  };

  const onTouchStart = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) => {
    setSwiping(true);
    currentOffsetXRef.current = getRefValue(offsetXRef);
    startDragXRef.current = getTouchData(e).clientX;
    const ulElement = getRefValue(listRef);

    rightEndOffsetX.current = ulElement!.offsetWidth - ulElement!.scrollWidth;

    window.addEventListener('mousemove', onTouchMove);
    window.addEventListener('mouseup', onTouchEnd);
    window.addEventListener('touchmove', onTouchMove);
    window.addEventListener('touchend', onTouchEnd);
  };

  const switchSlide = (mark = 1) => {
    const ulElement = getRefValue(listRef);
    const ulWidth = ulElement!.scrollWidth;
    const itemWidth = ulWidth / items.length;
    const newOffsetX = getRefValue(offsetXRef) + itemWidth * mark;
    rightEndOffsetX.current = ulElement!.offsetWidth - ulWidth;

    moveSwiper(setOffsetX, 0, rightEndOffsetX.current, newOffsetX);
  };

  return (
    <SwiperContainer
      onMouseDown={onTouchStart}
      onTouchStart={onTouchStart}
      className={containerClassName}
    >
      {arrow ? (
        <button
          className="absolute z-80 top-1/2 size-8 rounded-lg justify-center items-center left-5 bg-gray-100/30 hover:bg-gray-300/30 hidden md:flex"
          onClick={() => {
            switchSlide();
          }}
        >
          <span className="text-2xl">&lt;</span>
        </button>
      ) : (
        <></>
      )}
      <SwiperList
        ref={listRef}
        data-swiping={swiping}
        className={cn(
          'transition ease-out duration-300 data-[swiping="false"]:duration-initial',
          listClassName
        )}
        style={{
          transform: `translate3d(${offsetX}px, 0, 0)`,
        }}
      >
        {items.map((item, key) => (
          <SwiperItem key={key} className={itemClassName}>
            {item}
          </SwiperItem>
        ))}
      </SwiperList>

      {arrow ? (
        <button
          className="absolute z-80 top-1/2 right-5 size-8 rounded-lg justify-center items-center bg-gray-100/30 hover:bg-gray-300/30 hidden md:flex"
          onClick={() => {
            switchSlide(-1);
          }}
        >
          <span className="text-2xl">&gt;</span>
        </button>
      ) : (
        <></>
      )}
    </SwiperContainer>
  );
};

export { Swiper, SwiperItem, SwiperContainer, SwiperList };
