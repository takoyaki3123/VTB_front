import { THEME } from '@/_context/themeContext';
import { create } from 'zustand';

export type ThemeState = {
  theme: THEME;
  toggleTheme: () => void;
};

export const createThemeStore = (initData?: Partial<ThemeState>) => {
  return create<ThemeState>((set, get) => ({
    theme: THEME.light,
    toggleTheme: () => {
      const newTheme = get().theme === THEME.light ? THEME.dark : THEME.light;
      set({ theme: newTheme });
    },
    ...initData,
  }));
};

export type ThemeStoreType = ReturnType<typeof createThemeStore>;
