import { useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { config } from '@/config'

export const useDarkMode = () => {
  const [darkMode, setDarkMode] = useLocalStorage<boolean>('darkMode', false);

  useEffect(() => {
    if (!config.app.darkModeEnabled) {
      setDarkMode(true)
    }

    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode, config.app.darkModeEnabled]);

  return [darkMode, setDarkMode] as const;
};
