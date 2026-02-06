/* eslint-disable react-hooks/refs */
'use client';

import { createContext, useEffect, useRef } from 'react';
import Cookies from 'js-cookie';
import { createThemeStore, ThemeStoreType } from '@/_store/theme';

export enum THEME {
  dark = 'dark',
  light = 'light',
}

export const themeKey = 'theme';
export const ThemeContext = createContext<ThemeStoreType | null>(null);

export const themeHelper = {
  apply: (theme: THEME) => {
    document.documentElement.dataset[themeKey] = theme;
    Cookies.set(themeKey, theme, {
      expires: 365,
    });
  },
};

// bind user system theme by prefers-color-schema
function bindSysTheme(signal: AbortSignal) {
  const prefersQuery = window.matchMedia('(prefers-color-schema: dark)');
  prefersQuery.addEventListener(
    'change',
    (e) => {
      if (e.matches) {
        //apply dark theme
        themeHelper.apply(THEME.dark);
      } else {
        // apply light theme
        themeHelper.apply(THEME.light);
      }
    },
    { signal }
  );
}

export const ThemeProvider = ({
  value,
  children,
}: React.PropsWithChildren<{ value: THEME }>) => {
  // use ref make store will not initial every time when provider rerender
  const themeStore = useRef(
    createThemeStore({
      theme: value || (Cookies.get(themeKey) as THEME),
    })
  );

  const { theme } = themeStore.current();

  useEffect(() => {
    themeHelper.apply(theme);
  }, [theme]);

  // accept system theme
  useEffect(() => {
    const controller = new AbortController();
    bindSysTheme(controller.signal);

    // return will execute when site be closed cause it's provider at root of site
    return () => {
      controller.abort();
    };
  }, []);
  return <ThemeContext value={themeStore.current}>{children}</ThemeContext>;
};
