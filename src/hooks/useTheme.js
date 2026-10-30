import { useCallback, useEffect, useState } from 'react';

// Saved choice wins. Otherwise follow the OS: light only if the OS asks for light,
// so dark is the default. An inline script in index.html applies the same rule before
// the first paint, so the page never flashes the wrong theme.
const STORAGE_KEY = 'mu-theme';

function saveTheme(theme) {
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    /* ignore: the theme still changes for this visit */
  }
}

export function useTheme() {
  const [theme, setTheme] = useState(() =>
    document.documentElement.dataset.theme === 'light' ? 'light' : 'dark',
  );

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const toggleTheme = useCallback(() => {
    const next = theme === 'dark' ? 'light' : 'dark';
    const root = document.documentElement;
    root.classList.add('theme-animating');
    window.setTimeout(() => root.classList.remove('theme-animating'), 600);
    saveTheme(next);
    setTheme(next);
  }, [theme]);

  return { theme, toggleTheme };
}
