import { useEffect, useState } from 'react';
import { lightTheme, darkTheme, Theme } from '../theme';

export const useDarkMode = () => {
  const [theme, setTheme] = useState<Theme>(lightTheme);

  const setMode = (mode: Theme) => {
    mode === lightTheme
      ? window.localStorage.setItem('theme', 'light')
      : window.localStorage.setItem('theme', 'dark');
    setTheme(mode);
  };

  const toggleTheme = () => {
    theme === lightTheme ? setMode(darkTheme) : setMode(lightTheme);
  };

  useEffect(() => {
    const localTheme = window.localStorage.getItem('theme');

    localTheme !== null && localTheme === 'dark'
      ? setTheme(darkTheme)
      : setTheme(lightTheme);
  }, []);

  return { theme, toggleTheme };
};
