
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, LanguageContextProps, Translations } from './types';
import ukTranslations from './translations/uk';
import enTranslations from './translations/en';
import csTranslations from './translations/cs';

const LanguageContext = createContext<LanguageContextProps>({
  language: 'uk',
  setLanguage: () => {},
  t: (key: string) => key,
});

const translations: Record<Language, Translations> = {
  uk: ukTranslations,
  en: enTranslations,
  cs: csTranslations,
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    // Load language from localStorage if available, or use navigator's language,
    // or default to 'uk' if neither are available/suitable
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && ['uk', 'en', 'cs'].includes(savedLanguage)) {
      return savedLanguage;
    }
    
    const browserLanguage = navigator.language.slice(0, 2);
    if (browserLanguage === 'uk' || browserLanguage === 'en' || browserLanguage === 'cs') {
      return browserLanguage as Language;
    }
    
    return 'uk';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];

    for (const k of keys) {
      if (value && value[k] !== undefined) {
        value = value[k];
      } else {
        console.warn(`Translation key not found: ${key}`);
        return key;
      }
    }

    return value;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
export type { Language };
