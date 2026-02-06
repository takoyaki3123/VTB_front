import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import {
  NavbarContainer,
  NavbarContent,
  NavbarContentContainer,
  NavbarIconContainer,
} from '@/_components/Navbar';
import { List, ListItem } from '@/_components/List';
import NextLink from '@/_components/Link';
import { Avatar, AvatarFallback, AvatarImage } from '@/_components/Avatar';
import { Popover } from '@base-ui-components/react/popover';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Example/Navbar',
  component: NavbarContainer,
  subcomponents: { NavbarContent, NavbarContentContainer, NavbarIconContainer },
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
} satisfies Meta<typeof NavbarContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    color: '',
    className: 'bg-gray-500',
  },
  render: () => (
    <NavbarContainer>
      <NavbarContentContainer>
        <NavbarIconContainer>test1</NavbarIconContainer>
        <NavbarContent>
          <List className="space-y-0 md:inline-flex md:flex-nowrap">
            <ListItem>
              <NextLink
                href="#"
                className="hover:bg-gray-100 rounded-lg px-4 py-2"
              >
                test1
              </NextLink>
            </ListItem>
            <ListItem>
              <NextLink
                href="#"
                className="hover:bg-gray-100 rounded-lg px-4 py-2"
              >
                test2
              </NextLink>
            </ListItem>
            <ListItem>
              <NextLink
                href="#"
                className="hover:bg-gray-100 rounded-lg px-4 py-2"
              >
                test3
              </NextLink>
            </ListItem>
            <ListItem className="h-full">
              <NextLink
                href="#"
                className="hover:bg-gray-600 bg-gray-300 rounded-full inline-block size-10"
              >
                <Avatar className="size-full">
                  {/* 故意使用一個無效的 src 來觸發 Fallback */}
                  <AvatarImage src="/non-existent-image.jpg" alt="User" />
                  <AvatarFallback className="align-middle">JD</AvatarFallback>
                </Avatar>
              </NextLink>
              <Popover.Root>
                <Popover.Trigger
                  className={
                    'select-none h-full inline-flex items-center content-center'
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="w-5 h-5"
                  >
                    <path
                      stroke="#464646"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 8.56 12 15l7-6.44"
                    ></path>
                  </svg>
                </Popover.Trigger>
                <Popover.Portal>
                  <Popover.Positioner sideOffset={8}>
                    <Popover.Popup
                      className={
                        'bg-gray-400 border rounded-md border-gray-200 p-2'
                      }
                    >
                      <Popover.Title>Notifications</Popover.Title>
                      <Popover.Description>
                        You are all caught up. Good job!
                      </Popover.Description>
                    </Popover.Popup>
                  </Popover.Positioner>
                </Popover.Portal>
              </Popover.Root>
            </ListItem>
          </List>
        </NavbarContent>
      </NavbarContentContainer>
    </NavbarContainer>
  ),
};
