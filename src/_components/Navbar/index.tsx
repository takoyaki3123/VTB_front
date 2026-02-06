// fix container
// inside container
// logo position(option)
'use client';
import { cn } from '@/_libs/utils';
import NextLink from '@/_components/Link';
import { Avatar, AvatarFallback, AvatarImage } from '@/_components/Avatar';
import { Popover } from '@base-ui-components/react/popover';
import { List, ListItem } from '@/_components/List';
import { useState } from 'react';
import useTheme from '@/_hooks/theme';
import { useTranslations } from 'next-intl';
import { LangSwitcher } from '../LangSwitcher';

// link position(right)
const NavbarContainer = ({
  className,
  ...props
}: React.ComponentProps<'div'>) => {
  return (
    <div
      className={cn(
        'w-full relative top-0 left-0 min-h-8 max-h-10 flex border-b-navbar-border border-b bg-base-light dark:bg-base-dark',
        className
      )}
      {...props}
    />
  );
};

const NavbarContentContainer = ({
  className,
  ...props
}: React.ComponentProps<'div'>) => {
  return (
    <div
      className={cn(
        'w-full flex mx-0 px-4 justify-between md:mx-4 md:px-0',
        'group/nav',
        className
      )}
      {...props}
    />
  );
};

const NavbarIconContainer = ({
  className,
  ...props
}: React.ComponentProps<'div'>) => {
  return <div className={cn('mr-auto content-center', className)} {...props} />;
};

const NavbarContent = ({
  className,
  ...props
}: React.ComponentProps<'div'>) => {
  return (
    <div
      id="navContent"
      className={cn(
        'flex flex-nowrap text-font-light dark:text-font-dark bg-base-light dark:bg-base-dark',
        'w-screen absolute top-full h-(--nav-mobile-content-h) -left-full group-data-[navopen="true"]/nav:left-0 z-90',
        'transition-[left] duration-300 ease-in-out',
        'md:w-auto md:h-full md:relative md:top-0 md:left-0',
        className
      )}
      {...props}
    />
  );
};

const Navbar = () => {
  const [navOpen, setNavOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const t = useTranslations('Navbar');
  return (
    <NavbarContainer className="z-90">
      <NavbarContentContainer data-navopen={navOpen}>
        <NavbarIconContainer>
          <NextLink href="/">{t('home')}</NextLink>
        </NavbarIconContainer>
        <span
          className="absolute right-7 md:hidden"
          onClick={() => setNavOpen(!navOpen)}
        >
          &gt;
        </span>
        <NavbarContent>
          <List className="space-y-0 md:inline-flex md:flex-nowrap w-full md:w-auto">
            <ListItem>
              <LangSwitcher />
            </ListItem>
            <ListItem>
              <NextLink
                href="/group"
                className="hover:bg-base-hover-light dark:hover:bg-base-hover-dark rounded-lg px-4 py-2 whitespace-nowrap"
              >
                {t('group')}
              </NextLink>
            </ListItem>
            <ListItem>
              <NextLink
                href="/event"
                className="hover:bg-base-hover-light dark:hover:bg-base-hover-dark rounded-lg px-4 py-2 whitespace-nowrap"
              >
                {t('event')}
              </NextLink>
            </ListItem>
            <ListItem>
              <NextLink
                href="/member"
                className="hover:bg-base-hover-light dark:hover:bg-base-hover-dark rounded-lg px-4 py-2 whitespace-nowrap"
              >
                {t('member')}
              </NextLink>
            </ListItem>
            <ListItem className="md:h-full w-full md:w-auto px-4 md:px-0 mt-1 md:mt-0">
              <NextLink href="#" className="inline-block h-full content-center">
                <Avatar className="bg-gray-300 hover:bg-base-hover-light dark:hover:bg-base-hover-dark rounded-full size-8 my-auto">
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
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 8.56 12 15l7-6.44"
                    ></path>
                  </svg>
                </Popover.Trigger>
                <Popover.Portal>
                  <Popover.Positioner className={'z-99'} sideOffset={0}>
                    <Popover.Popup
                      className={
                        'bg-sub-base-light dark:bg-sub-base-dark border rounded-md border-gray-200 p-2'
                      }
                    >
                      <Popover.Title
                        className={
                          'text-font-light dark:text-font-dark font-bold'
                        }
                      >
                        Notifications
                      </Popover.Title>
                      <Popover.Description
                        className={'text-font-light dark:text-font-dark'}
                      >
                        You are all caught up. Good job!
                      </Popover.Description>
                    </Popover.Popup>
                  </Popover.Positioner>
                </Popover.Portal>
              </Popover.Root>
            </ListItem>
            <ListItem>
              <button
                className="material-symbols-outlined"
                onClick={() => {
                  toggleTheme();
                }}
              >
                clear_day
              </button>
            </ListItem>
          </List>
        </NavbarContent>
      </NavbarContentContainer>
    </NavbarContainer>
  );
};

export {
  NavbarContainer,
  NavbarContentContainer,
  NavbarIconContainer,
  NavbarContent,
  Navbar,
};
