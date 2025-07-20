'use client';

import type React from 'react';
import { createContext, useContext, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Read theme from URL params, default to light if invalid/missing
  const themeParam = searchParams.get('theme');
  const isDarkMode = themeParam === 'dark';

  useEffect(() => {
    // Apply theme to document immediately
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    const newTheme = isDarkMode ? 'light' : 'dark';
    const currentUrl = new URL(window.location.href);

    // Update the theme parameter
    currentUrl.searchParams.set('theme', newTheme);

    // Use router.replace to update URL without page reload
    router.replace(currentUrl.pathname + currentUrl.search, { scroll: false });
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
