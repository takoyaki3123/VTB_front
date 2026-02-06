import { ThemeContext } from '@/_context/themeContext';
import { use } from 'react';

export default function useTheme() {
  const context = use(ThemeContext);
  if (!context) {
    // 如果忘記包裹 Provider，則拋出錯誤
    throw new Error('ThemeContext must be used within a ThemeProvider');
  }

  // return context object(ref createContext)
  return context();
}
