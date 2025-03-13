import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'uk' | 'en' | 'cs';

interface LanguageContextProps {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

// Extended translations type to include authentication
type Translations = {
  nav: {
    home: string;
    check: string;
    about: string;
    checkText: string;
  };
  footer: {
    rights: string;
    language: string;
  };
  common: {
    title: string;
    description: string;
    back: string;
    submit: string;
    loading: string;
    success: string;
    error: string;
  };
  language: {
    en: string;
    uk: string;
    cs: string;
  };
  textInput: {
    placeholder: string;
    characters: string;
  };
  auth: {
    welcome: string;
    signIn: string;
    signUp: string;
    signInDescription: string;
    signUpDescription: string;
    account: string;
    email: string;
    password: string;
    phoneNumber: string;
    forgotPassword: string;
    verificationCode: string;
    verify: string;
    alreadyHaveAccount: string;
    dontHaveAccount: string;
    or: string;
    continue: string;
  };
};

const LanguageContext = createContext<LanguageContextProps>({
  language: 'uk',
  setLanguage: () => {},
  t: (key: string) => key,
});

const translations: Record<Language, Translations> = {
  uk: {
    nav: {
      home: 'Головна',
      check: 'Перевірка',
      about: 'Про нас',
      checkText: 'Перевірити плагіат',
    },
    footer: {
      rights: 'Всі права захищено',
      language: 'Мова',
    },
    common: {
      title: 'ForgenHub',
      description: 'Потужний інструмент для перевірки плагіату з використанням AI',
      back: 'Назад',
      submit: 'Підтвердити',
      loading: 'Завантаження...',
      success: 'Успіх!',
      error: 'Помилка!',
    },
    language: {
      en: 'Англійська',
      uk: 'Українська',
      cs: 'Чеська',
    },
    textInput: {
      placeholder: 'Введіть текст для перевірки...',
      characters: 'символів',
    },
    auth: {
      welcome: 'Вітаємо у ForgenHub',
      signIn: 'Увійти',
      signUp: 'Зареєструватися',
      signInDescription: 'Увійдіть для доступу до свого облікового запису',
      signUpDescription: 'Створіть обліковий запис, щоб почати роботу',
      account: 'Мій акаунт',
      email: 'Електронна пошта',
      password: 'Пароль',
      phoneNumber: 'Номер телефону',
      forgotPassword: 'Забули пароль?',
      verificationCode: 'Код підтвердження',
      verify: 'Підтвердити',
      alreadyHaveAccount: 'Вже маєте обліковий запис?',
      dontHaveAccount: 'Не маєте облікового запису?',
      or: 'або',
      continue: 'Продовжити',
    },
  },
  en: {
    nav: {
      home: 'Home',
      check: 'Check',
      about: 'About',
      checkText: 'Check plagiarism',
    },
    footer: {
      rights: 'All rights reserved',
      language: 'Language',
    },
    common: {
      title: 'ForgenHub',
      description: 'Powerful AI-driven plagiarism checker',
      back: 'Back',
      submit: 'Submit',
      loading: 'Loading...',
      success: 'Success!',
      error: 'Error!',
    },
    language: {
      en: 'English',
      uk: 'Ukrainian',
      cs: 'Czech',
    },
    textInput: {
      placeholder: 'Enter text to check...',
      characters: 'characters',
    },
    auth: {
      welcome: 'Welcome to ForgenHub',
      signIn: 'Sign In',
      signUp: 'Sign Up',
      signInDescription: 'Sign in to access your account',
      signUpDescription: 'Create an account to get started',
      account: 'My Account',
      email: 'Email',
      password: 'Password',
      phoneNumber: 'Phone Number',
      forgotPassword: 'Forgot password?',
      verificationCode: 'Verification code',
      verify: 'Verify',
      alreadyHaveAccount: 'Already have an account?',
      dontHaveAccount: 'Don\'t have an account?',
      or: 'or',
      continue: 'Continue',
    },
  },
  cs: {
    nav: {
      home: 'Domů',
      check: 'Kontrola',
      about: 'O nás',
      checkText: 'Zkontrolovat plagiát',
    },
    footer: {
      rights: 'Všechna práva vyhrazena',
      language: 'Jazyk',
    },
    common: {
      title: 'ForgenHub',
      description: 'Výkonný nástroj pro kontrolu plagiátů s využitím AI',
      back: 'Zpět',
      submit: 'Potvrdit',
      loading: 'Načítání...',
      success: 'Úspěch!',
      error: 'Chyba!',
    },
    language: {
      en: 'Angličtina',
      uk: 'Ukrajinština',
      cs: 'Čeština',
    },
    textInput: {
      placeholder: 'Zadejte text ke kontrole...',
      characters: 'znaků',
    },
    auth: {
      welcome: 'Vítejte v ForgenHub',
      signIn: 'Přihlásit se',
      signUp: 'Zaregistrovat se',
      signInDescription: 'Přihlaste se pro přístup k vašemu účtu',
      signUpDescription: 'Vytvořte si účet, abyste mohli začít',
      account: 'Můj účet',
      email: 'E-mail',
      password: 'Heslo',
      phoneNumber: 'Telefonní číslo',
      forgotPassword: 'Zapomněli jste heslo?',
      verificationCode: 'Ověřovací kód',
      verify: 'Ověřit',
      alreadyHaveAccount: 'Již máte účet?',
      dontHaveAccount: 'Nemáte účet?',
      or: 'nebo',
      continue: 'Pokračovat',
    },
  },
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const storedLanguage = (localStorage.getItem('language') || 'uk') as Language;
  const [language, setLanguage] = useState<Language>(storedLanguage);

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key: string): string => {
    try {
      // Split the key into parts to access nested properties
      const keyParts = key.split('.');
      let translation: any = translations[language];
  
      // Traverse the key parts to find the translation
      for (const part of keyParts) {
        translation = translation[part];
        if (translation === undefined) {
          console.warn(`Translation not found for key: ${key} in language: ${language}`);
          return key; // Return the key as a fallback
        }
      }
  
      return translation as string;
    } catch (error) {
      console.error(`Error accessing translation for key: ${key} in language: ${language}`, error);
      return key; // Return the key as a fallback in case of an error
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextProps => {
  return useContext(LanguageContext);
};
