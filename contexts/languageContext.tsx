'use client';

import type React from 'react';
import { createContext, useContext } from 'react';
import type { Language, Translations } from '@/i18n/i18n.types';
import { translations, defaultLanguage } from '@/i18n/config';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

interface LanguageProviderProps {
  children: React.ReactNode;
  initialLanguage?: Language;
}

export function LanguageProvider({
  children,
  initialLanguage,
}: LanguageProviderProps) {
  const pathname = usePathname();
  const router = useRouter();

  //TODO: Future improvement
  // Extract language from pathname or use initial/default
  // const getLanguageFromPath = (): Language => {
  //   if (initialLanguage) return initialLanguage;

  //   const segments = pathname.split('/');
  //   const potentialLang = segments[1] as Language;

  //   if (potentialLang === 'id' || potentialLang === 'en') {
  //     return potentialLang;
  //   }

  //   return defaultLanguage;
  // };

  /**
   * [NOTE]: Currently we will get the selected language from 2 sides
   * - URL Query Params -> support SSR
   * - Local Storage -> support CSR
   */
  const searchParams = useSearchParams();
  const languageParam = searchParams.get('lang');

  let finalSelectedLanguage: Language | null = null;
  if (!!languageParam) {
    if (languageParam === 'en') {
      finalSelectedLanguage = 'en';
    } else {
      finalSelectedLanguage = 'id';
    }
  }

  const setLanguage = (newLang: Language) => {
    // Get current path without language prefix
    const segments = pathname.split('/');
    const currentLang = segments[1];

    let newPath: string;
    if (currentLang === 'id' || currentLang === 'en') {
      // Replace existing language
      segments[1] = newLang;
      newPath = segments.join('/');
    } else {
      // Add language prefix
      newPath = `/${newLang}${pathname}`;
    }

    // Preserve theme query parameter if it exists
    const currentUrl = new URL(window.location.href);
    const theme = currentUrl.searchParams.get('theme');
    const searchParams = theme ? `?theme=${theme}` : '';

    router.push(newPath + searchParams);
  };

  const t = translations[finalSelectedLanguage || 'id'];

  return (
    <LanguageContext.Provider
      value={{ language: finalSelectedLanguage || 'id', setLanguage, t }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
