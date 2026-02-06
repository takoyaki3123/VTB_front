'use client';
import { useRouter, usePathname } from '@/i18n/navigation';
import { Popover } from '@base-ui-components/react/popover';
import Cookies from 'js-cookie';
import { useLocale } from 'next-intl';
export const LangSwitcher = () => {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const switchLanguage = (lang: string) => {
    Cookies.set('NEXT_LOCALE', lang);
    router.replace(pathname, { locale: lang });
    router.refresh();
  };

  return (
    <Popover.Root>
      <Popover.Trigger
        className={'select-none h-full inline-flex items-center content-center'}
      >
        <span className="flex flex-nowarp">
          {locale.toLocaleUpperCase()}
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
        </span>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Positioner className={'z-99'} sideOffset={0}>
          <Popover.Popup
            className={
              'bg-sub-base-light dark:bg-sub-base-dark border rounded-md border-gray-200 p-2'
            }
          >
            <Popover.Title
              className={'text-font-light dark:text-font-dark font-bold'}
              onClick={() => {
                Cookies.set('locale', 'en');
              }}
            >
              <a>
                <button
                  onClick={() => {
                    switchLanguage('en');
                  }}
                >
                  English
                </button>
              </a>
            </Popover.Title>
            <Popover.Title
              className={'text-font-light dark:text-font-dark font-bold'}
            >
              <a>
                <button
                  onClick={() => {
                    switchLanguage('jp');
                  }}
                >
                  Japanese
                </button>
              </a>
            </Popover.Title>
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  );
};
