import React, { createContext } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { GlobalStyle } from './global-styles';
import { useDarkMode } from './hooks/useDarkMode';
import Home from './pages/Home';
import { darkTheme, lightTheme, Theme } from './theme';

interface ContextProps {
  theme: Theme;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ContextProps>({
  theme: lightTheme,
  toggleTheme: () => {
    return null;
  },
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
]);

const App = () => {
  const { theme, toggleTheme } = useDarkMode();
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <GlobalStyle theme={theme === lightTheme ? lightTheme : darkTheme} />
      <RouterProvider router={router} />
    </ThemeContext.Provider>
  );
};

export default App;
