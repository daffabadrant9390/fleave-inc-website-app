import type { Language, LanguageConfig, Translations } from './i18n.types';
import { idLang } from './locales/id';
import { enLang } from './locales/en';

export const languages: LanguageConfig[] = [
  {
    code: 'id',
    name: 'Indonesia',
    flag: 'https://flagcdn.com/w40/id.png',
  },
  {
    code: 'en',
    name: 'English',
    flag: 'https://flagcdn.com/w40/us.png',
  },
];

export const translations: Record<Language, Translations> = {
  id: idLang,
  en: enLang,
};

export const defaultLanguage: Language = 'id';
