/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Swiper } from '@/_components/Swiper';
import { eventList } from '@/app/fakeData';
import { CardContainer, CardContent, CardTitle } from '@/_components/Card';
import Image from 'next/image';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const Card = ({ event }: any) => {
  return (
    <CardContainer className="h-full py-0 overflow-hidden">
      <CardTitle className="h-[80%] relative">
        <Image
          src={event.img}
          alt={event.name}
          layout="fill"
          objectFit="cover"
          className="w-full"
          size=""
          draggable={false}
        />
      </CardTitle>
      <CardContent className="select-none">{event.name}</CardContent>
    </CardContainer>
  );
};
const CardList = eventList.map((event, key) => (
  <Card event={event} key={key} />
));
const meta = {
  title: 'Example/Swiper',
  component: Swiper,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
} satisfies Meta<typeof Swiper>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    items: CardList,
    arrow: true,
    containerClassName: 'w-[1000px] h-[400px]',
    listClassName: 'h-full',
    itemClassName: 'w-200',
  },
};
