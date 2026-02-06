import {
  CardContainer,
  CardContent,
  CardDescription,
  CardFooter,
} from '@/_components/Card';
import NextLink from '@/_components/Link';
import Image from 'next/image';

export type cardItem = {
  img: string;
  name: string;
  id: number;
};

export type CardListProps = {
  list: cardItem[];
  type: string;
};

export const CardList = ({ list, type }: CardListProps) => {
  return (
    <div className="flex flex-row w-full flex-wrap">
      {list.map((item, key) => (
        <CardContainer
          className="my-2 mx-auto size-81 md:mx-2 pt-0 overflow-hidden"
          key={key}
        >
          <NextLink
            href={'/' + type + '/' + item.id.toString()}
            className="size-full"
          >
            <CardContent className="relative h-[80%]">
              <Image
                src={item.img}
                alt={item.name}
                layout="fill"
                objectFit="cover"
                className="w-full"
              />
            </CardContent>
            <CardFooter>
              <CardDescription>{item.name}</CardDescription>
            </CardFooter>
          </NextLink>
        </CardContainer>
      ))}
    </div>
  );
};
