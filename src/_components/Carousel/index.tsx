'use client';
import { cn } from '@/_libs/utils';
import { Dispatch, SetStateAction, useState } from 'react';

const CarouselContainer = ({
  className,
  ...props
}: React.ComponentProps<'div'>) => {
  return (
    <div className={cn('relative w-full max-h-full ', className)} {...props} />
  );
};

const CarouselMainContainer = ({
  className,
  itemLen,
  activeKey,
  setKey,
  children,
  ...props
}: React.ComponentProps<'div'> & {
  itemLen: number;
  activeKey: number;
  setKey: Dispatch<SetStateAction<number>>;
}) => {
  return (
    <div className="w-full h-full relative overflow-hidden border border-line-light dark:border-line-dark ">
      <CarouselArrow
        className="left-5 z-80"
        href="javascript:;"
        onClick={(e) => {
          e.preventDefault();
          setKey(activeKey - 1 < 0 ? itemLen - 1 : activeKey - 1);
        }}
      >
        &lt;
      </CarouselArrow>
      <div className="w-full h-full relative">
        <div
          id="main-carousel"
          className={cn(
            `relative h-full flex transition duration-300`,
            className
          )}
          style={{
            width: `${itemLen}00%`,
            transform: `translate3d(calc(-100% / ${itemLen} * ${activeKey}), 0px, 0px)`,
          }}
          data-carousel="static"
          {...props}
        >
          {children}
        </div>
      </div>
      <CarouselArrow
        className="right-5 z-80"
        href="javascript:;"
        onClick={(e) => {
          e.preventDefault();
          setKey((activeKey + 1) % itemLen);
        }}
      >
        &gt;
      </CarouselArrow>
    </div>
  );
};

const CarouselPreviewContainer = ({
  className,
  itemLen,
  activeKey,
  setKey = () => {},
  needArrow = false,
  children,
  ...props
}: React.ComponentProps<'div'> & {
  itemLen: number;
  activeKey: number;
  setKey?: Dispatch<SetStateAction<number>>;
  needArrow?: boolean;
}) => {
  return (
    <div className="w-full h-full relative overflow-hidden bg-gray-300">
      {needArrow ? (
        <CarouselArrow
          className="left-5 z-80"
          href="javascript:;"
          onClick={(e) => {
            e.preventDefault();
            setKey(activeKey - 1 < 0 ? itemLen - 1 : activeKey - 1);
          }}
        >
          &lt;
        </CarouselArrow>
      ) : (
        <></>
      )}
      <div
        id="main-carousel"
        className={cn(
          `h-full flex transition duration-300 snap-x min-w-full`,
          className
        )}
        style={{
          width: `calc(20% * ${itemLen})`,
          transform: `translate3d((calc(20% * -${activeKey} + 40%), 0px, 0px)`,
        }}
        data-carousel="static"
        {...props}
      >
        {children}
      </div>

      {needArrow ? (
        <CarouselArrow
          className="right-5 z-80"
          href="javascript:;"
          onClick={(e) => {
            e.preventDefault();
            setKey((activeKey + 1) % itemLen);
          }}
        >
          &gt;
        </CarouselArrow>
      ) : (
        <></>
      )}
    </div>
  );
};

const CarouselPreviewItem = ({
  className,
  itemLen,
  ...props
}: React.ComponentProps<'div'> & { itemLen: number }) => {
  return (
    <div
      className={cn(
        'h-full relative shrink-0 duration-700 ease-in-out snap-center mx-1 w-[20%] min-w-68',
        className
      )}
      {...props}
    />
  );
};

const CarouselImage = ({
  className,
  itemLen,
  imgUrl,
  ...props
}: React.ComponentProps<'div'> & { imgUrl: string; itemLen: number }) => {
  return (
    <div
      className={cn(
        `relative shrink-0 h-full duration-700 ease-in-out`,
        className
      )}
      style={{ width: `calc(100% / ${itemLen})` }}
      {...props}
    >
      <span className="w-full h-full object-cover">{imgUrl}</span>
    </div>
  );
};

const CarouselArrow = ({ className, ...props }: React.ComponentProps<'a'>) => {
  return (
    <a
      className={cn(
        'absolute top-1/2 translate-y-[-50%] rounded-full bg-gray-300',
        className
      )}
      {...props}
    ></a>
  );
};

// create carousel follow the props
const Carousel = ({ showPreview = false }: CarouselProps) => {
  const [activeKey, setKey] = useState(0);
  return (
    <CarouselContainer className="w-screen h-40">
      <div className={cn('w-full h-full', showPreview ? 'h-[80%]' : '')}>
        <CarouselMainContainer
          itemLen={4}
          activeKey={activeKey}
          setKey={setKey}
        >
          <CarouselImage itemLen={4} imgUrl="test1" />
          <CarouselImage itemLen={4} imgUrl="test2" />
          <CarouselImage itemLen={4} imgUrl="test3" />
          <CarouselImage itemLen={4} imgUrl="test4" />
        </CarouselMainContainer>
      </div>
      {showPreview ? (
        <div className="w-full h-[20%] pt-2">
          <CarouselPreviewContainer
            itemLen={4}
            activeKey={activeKey}
            setKey={setKey}
          >
            <CarouselImage itemLen={4} imgUrl="test1" className="w-[20%]" />
            <CarouselImage itemLen={4} imgUrl="test2" className="w-[20%]" />
            <CarouselImage itemLen={4} imgUrl="test3" className="w-[20%]" />
            <CarouselImage itemLen={4} imgUrl="test4" className="w-[20%]" />
          </CarouselPreviewContainer>
        </div>
      ) : (
        <></>
      )}
    </CarouselContainer>
  );
};

export type CarouselProps = {
  showPreview: boolean;
};

// container and mainconatiner use to custom carousel content
export {
  Carousel,
  CarouselContainer,
  CarouselMainContainer,
  CarouselPreviewContainer,
  CarouselPreviewItem,
  CarouselArrow,
};
