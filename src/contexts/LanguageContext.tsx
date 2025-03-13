
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
    description: string;
    navigation: string;
    legal: string;
    terms: string;
    privacy: string;
    cookies: string;
    copyright: string;
    tagline: string;
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
    continueWithGoogle: string;
  };
  hero: {
    badge: string;
    title: string;
    description: string;
    checkButton: string;
    learnMore: string;
  };
  feature: {
    analysis: {
      title: string;
      description: string;
    },
    fast: {
      title: string;
      description: string;
    },
    reports: {
      title: string;
      description: string;
    }
  };
  howItWorks: {
    badge: string;
    title: string;
    description: string;
    step1: {
      number: string;
      title: string;
      description: string;
    };
    step2: {
      number: string;
      title: string;
      description: string;
    };
    step3: {
      number: string;
      title: string;
      description: string;
    };
    tryItNow: string;
  };
  features: {
    badge: string;
    title: string;
    description: string;
    upload: {
      title: string;
      description: string;
    };
    analysis: {
      title: string;
      description: string;
    };
    reports: {
      title: string;
      description: string;
    };
    languages: {
      title: string;
      description: string;
    };
  };
  stats: {
    accuracy: string;
    accuracyLabel: string;
    documents: string;
    documentsLabel: string;
    checkTime: string;
    checkTimeLabel: string;
    support: string;
    supportLabel: string;
  };
  cta: {
    title: string;
    description: string;
    button: string;
  };
  check: {
    badge: string;
    title: string;
    description: string;
    pasteText: string;
    uploadFile: string;
    textPlaceholder: string;
    noticeTitle: string;
    noticeText: string;
    checkButton: string;
    analyzing: string;
    resultsTitle: string;
    featuresTitle: string;
    featuresDescription: string;
    feature1: {
      title: string;
      description: string;
    };
    feature2: {
      title: string;
      description: string;
    };
    feature3: {
      title: string;
      description: string;
    };
    fileUploaded: string;
    fileLoadedMessage: string;
    emptyText: string;
    enterTextMessage: string;
  };
  about: {
    badge: string;
    title: string;
    description: string;
    mission: {
      label: string;
      title: string;
      description1: string;
      description2: string;
      button: string;
    };
    values: {
      title: string;
      integrity: {
        title: string;
        description: string;
      };
      accuracy: {
        title: string;
        description: string;
      };
      innovation: {
        title: string;
        description: string;
      };
    };
    technology: {
      label: string;
      title: string;
      description: string;
    };
    textProcessing: {
      title: string;
      step1: string;
      step2: string;
      step3: string;
      step4: string;
    };
    comparison: {
      title: string;
      step1: string;
      step2: string;
      step3: string;
      step4: string;
    };
    languages: {
      title: string;
      description: string;
    };
    cta: {
      title: string;
      description: string;
      button: string;
    };
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
      description: 'ForgenHub - інтелектуальний інструмент для виявлення та запобігання плагіату у ваших текстах',
      navigation: 'Навігація',
      legal: 'Правова інформація',
      terms: 'Умови використання',
      privacy: 'Політика конфіденційності',
      cookies: 'Політика cookie',
      copyright: '© {year} ForgenHub. Всі права захищено.',
      tagline: 'Створено з любов\'ю'
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
      continueWithGoogle: 'Продовжити з Google',
    },
    hero: {
      badge: 'ШІ-інструмент',
      title: 'Перевірка плагіату з <span>ForgenHub</span>',
      description: 'Потужний онлайн-інструмент, який допомагає виявити плагіат та забезпечити оригінальність вашого контенту',
      checkButton: 'Перевірити текст',
      learnMore: 'Дізнатися більше'
    },
    feature: {
      analysis: {
        title: 'Глибокий аналіз',
        description: 'Детальне сканування тексту для виявлення потенційних збігів'
      },
      fast: {
        title: 'Швидка перевірка',
        description: 'Отримайте результати за лічені секунди'
      },
      reports: {
        title: 'Докладні звіти',
        description: 'Чіткі звіти з виділенням проблемних місць'
      }
    },
    howItWorks: {
      badge: 'Як це працює',
      title: 'Простий процес у три кроки',
      description: 'Швидка перевірка оригінальності вашого тексту за допомогою передової технології ШІ',
      step1: {
        number: '1',
        title: 'Завантаження тексту',
        description: 'Введіть або завантажте текст, який потрібно перевірити на плагіат'
      },
      step2: {
        number: '2',
        title: 'Аналіз ШІ',
        description: 'Наша система ШІ проаналізує текст і порівняє його з численними джерелами'
      },
      step3: {
        number: '3',
        title: 'Отримання результатів',
        description: 'Отримайте детальний звіт із відсотком оригінальності та виявленими співпадіннями'
      },
      tryItNow: 'Спробувати зараз'
    },
    features: {
      badge: 'Можливості',
      title: 'Передові функції для точної перевірки',
      description: 'ForgenHub надає інструменти, необхідні для ефективної боротьби з плагіатом',
      upload: {
        title: 'Легке завантаження',
        description: 'Введіть текст або завантажте файли для швидкої перевірки'
      },
      analysis: {
        title: 'Розумний аналіз',
        description: 'Наш ШІ перевіряє ваш текст на збіги з мільйонами джерел'
      },
      reports: {
        title: 'Детальні звіти',
        description: 'Отримайте чіткі звіти з виділеними збігами та посиланнями на джерела'
      },
      languages: {
        title: 'Багатомовна підтримка',
        description: 'Перевіряйте тексти українською, англійською та чеською мовами'
      }
    },
    stats: {
      accuracy: '99.8%',
      accuracyLabel: 'точність',
      documents: '10M+',
      documentsLabel: 'перевірених документів',
      checkTime: '<3 сек',
      checkTimeLabel: 'на перевірку',
      support: '24/7',
      supportLabel: 'підтримка'
    },
    cta: {
      title: 'Готові перевірити свій текст?',
      description: 'Почніть користуватися ForgenHub вже сьогодні та забезпечте оригінальність вашого контенту',
      button: 'Перевірити зараз'
    },
    check: {
      badge: 'ШІ-перевірка',
      title: 'Перевірка тексту на плагіат',
      description: 'Вставте текст або завантажте файл для перевірки на плагіат',
      pasteText: 'Вставити текст',
      uploadFile: 'Завантажити файл',
      textPlaceholder: 'Вставте текст для перевірки...',
      noticeTitle: 'Важлива інформація',
      noticeText: 'Для найкращих результатів, будь ласка, використовуйте тексти обсягом не менше 300 слів',
      checkButton: 'Перевірити',
      analyzing: 'Аналізуємо...',
      resultsTitle: 'Результати перевірки',
      featuresTitle: 'Особливості нашої перевірки',
      featuresDescription: 'ForgenHub пропонує передові інструменти для виявлення плагіату в текстах',
      feature1: {
        title: 'Глибокий аналіз',
        description: 'Детальне сканування тексту для виявлення потенційних збігів'
      },
      feature2: {
        title: 'Підтримка мов',
        description: 'Перевірка текстів різними мовами з однаковою точністю'
      },
      feature3: {
        title: 'Детальний звіт',
        description: 'Отримайте повний звіт з посиланнями на джерела'
      },
      fileUploaded: 'Файл завантажено',
      fileLoadedMessage: 'Текст з файлу успішно завантажено',
      emptyText: 'Порожній текст',
      enterTextMessage: 'Будь ласка, введіть текст для перевірки або завантажте файл',
    },
    about: {
      badge: 'Про ForgenHub',
      title: 'Наша місія та цінності',
      description: 'Дізнайтесь більше про нашу технологію та підхід до боротьби з плагіатом',
      mission: {
        label: 'Наша місія',
        title: 'Підтримка академічної та творчої доброчесності',
        description1: 'Ми створили ForgenHub, щоб допомогти авторам, студентам та науковцям захистити свої роботи та перевірити оригінальність текстів.',
        description2: 'Наша мета - надати доступний та точний інструмент для виявлення плагіату, який допоможе зробити інтелектуальне середовище більш чесним та прозорим.',
        button: 'Спробувати перевірку'
      },
      values: {
        title: 'Наші цінності',
        integrity: {
          title: 'Доброчесність',
          description: 'Ми віримо в важливість оригінальності та інтелектуальної чесності'
        },
        accuracy: {
          title: 'Точність',
          description: 'Ми прагнемо надавати найточніші результати перевірки'
        },
        innovation: {
          title: 'Інновації',
          description: 'Ми постійно вдосконалюємо наші алгоритми та підходи'
        }
      },
      technology: {
        label: 'Технологія',
        title: 'Як працює наша система',
        description: 'ForgenHub використовує передові алгоритми машинного навчання та штучного інтелекту для аналізу текстів та виявлення плагіату'
      },
      textProcessing: {
        title: 'Обробка тексту',
        step1: 'Семантичний аналіз тексту для розуміння контексту',
        step2: 'Розбиття на змістовні фрагменти для покращення точності',
        step3: 'Видалення шумів та нормалізація тексту',
        step4: 'Створення цифрових відбитків для порівняння'
      },
      comparison: {
        title: 'Процес порівняння',
        step1: 'Пошук у базі даних академічних та інтернет-джерел',
        step2: 'Порівняння з мільйонами документів в реальному часі',
        step3: 'Виявлення як прямих, так і перефразованих запозичень',
        step4: 'Генерація детального звіту з відсотком збігів'
      },
      languages: {
        title: 'Підтримка мов',
        description: 'Наша система здатна аналізувати тексти різними мовами, забезпечуючи точність перевірки незалежно від мови оригіналу'
      },
      cta: {
        title: 'Готові перевірити свій текст?',
        description: 'Почніть користуватися ForgenHub вже сьогодні та забезпечте оригінальність вашого контенту',
        button: 'Перевірити зараз'
      }
    }
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
      description: 'ForgenHub - an intelligent tool for detecting and preventing plagiarism in your texts',
      navigation: 'Navigation',
      legal: 'Legal',
      terms: 'Terms of Service',
      privacy: 'Privacy Policy',
      cookies: 'Cookie Policy',
      copyright: '© {year} ForgenHub. All rights reserved.',
      tagline: 'Made with love'
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
      continueWithGoogle: 'Continue with Google',
    },
    hero: {
      badge: 'AI-powered Tool',
      title: 'Plagiarism Checking with <span>ForgenHub</span>',
      description: 'A powerful online tool that helps detect plagiarism and ensure the originality of your content',
      checkButton: 'Check Text',
      learnMore: 'Learn More'
    },
    feature: {
      analysis: {
        title: 'Deep Analysis',
        description: 'Detailed scanning of text to identify potential matches'
      },
      fast: {
        title: 'Fast Checking',
        description: 'Get results in seconds'
      },
      reports: {
        title: 'Detailed Reports',
        description: 'Clear reports with highlighted problem areas'
      }
    },
    howItWorks: {
      badge: 'How It Works',
      title: 'Simple Three-Step Process',
      description: 'Quickly check the originality of your text using advanced AI technology',
      step1: {
        number: '1',
        title: 'Upload Text',
        description: 'Enter or upload the text you want to check for plagiarism'
      },
      step2: {
        number: '2',
        title: 'AI Analysis',
        description: 'Our AI system will analyze the text and compare it with numerous sources'
      },
      step3: {
        number: '3',
        title: 'Get Results',
        description: 'Receive a detailed report with originality percentage and detected matches'
      },
      tryItNow: 'Try It Now'
    },
    features: {
      badge: 'Features',
      title: 'Advanced Features for Accurate Checking',
      description: 'ForgenHub provides the tools needed to effectively combat plagiarism',
      upload: {
        title: 'Easy Upload',
        description: 'Enter text or upload files for quick checking'
      },
      analysis: {
        title: 'Smart Analysis',
        description: 'Our AI checks your text against millions of sources'
      },
      reports: {
        title: 'Detailed Reports',
        description: 'Get clear reports with highlighted matches and source references'
      },
      languages: {
        title: 'Multilingual Support',
        description: 'Check texts in English, Ukrainian, and Czech'
      }
    },
    stats: {
      accuracy: '99.8%',
      accuracyLabel: 'accuracy',
      documents: '10M+',
      documentsLabel: 'documents checked',
      checkTime: '<3 sec',
      checkTimeLabel: 'check time',
      support: '24/7',
      supportLabel: 'support'
    },
    cta: {
      title: 'Ready to Check Your Text?',
      description: 'Start using ForgenHub today and ensure the originality of your content',
      button: 'Check Now'
    },
    check: {
      badge: 'AI Check',
      title: 'Check Text for Plagiarism',
      description: 'Paste your text or upload a file to check for plagiarism',
      pasteText: 'Paste Text',
      uploadFile: 'Upload File',
      textPlaceholder: 'Paste your text to check...',
      noticeTitle: 'Important Information',
      noticeText: 'For best results, please use texts with at least 300 words',
      checkButton: 'Check Now',
      analyzing: 'Analyzing...',
      resultsTitle: 'Check Results',
      featuresTitle: 'Our Checking Features',
      featuresDescription: 'ForgenHub offers advanced tools for detecting plagiarism in texts',
      feature1: {
        title: 'Deep Analysis',
        description: 'Detailed scanning of text to identify potential matches'
      },
      feature2: {
        title: 'Language Support',
        description: 'Check texts in different languages with the same accuracy'
      },
      feature3: {
        title: 'Detailed Report',
        description: 'Get a complete report with references to sources'
      },
      fileUploaded: 'File Uploaded',
      fileLoadedMessage: 'Text from file successfully loaded',
      emptyText: 'Empty Text',
      enterTextMessage: 'Please enter text to check or upload a file',
    },
    about: {
      badge: 'About ForgenHub',
      title: 'Our Mission and Values',
      description: 'Learn more about our technology and approach to combating plagiarism',
      mission: {
        label: 'Our Mission',
        title: 'Supporting Academic and Creative Integrity',
        description1: 'We created ForgenHub to help authors, students, and researchers protect their work and verify the originality of texts.',
        description2: 'Our goal is to provide an accessible and accurate tool for detecting plagiarism that will help make the intellectual environment more honest and transparent.',
        button: 'Try Checking'
      },
      values: {
        title: 'Our Values',
        integrity: {
          title: 'Integrity',
          description: 'We believe in the importance of originality and intellectual honesty'
        },
        accuracy: {
          title: 'Accuracy',
          description: 'We strive to provide the most accurate checking results'
        },
        innovation: {
          title: 'Innovation',
          description: 'We constantly improve our algorithms and approaches'
        }
      },
      technology: {
        label: 'Technology',
        title: 'How Our System Works',
        description: 'ForgenHub uses advanced machine learning and artificial intelligence algorithms to analyze texts and detect plagiarism'
      },
      textProcessing: {
        title: 'Text Processing',
        step1: 'Semantic text analysis to understand context',
        step2: 'Breaking into meaningful fragments to improve accuracy',
        step3: 'Noise removal and text normalization',
        step4: 'Creating digital fingerprints for comparison'
      },
      comparison: {
        title: 'Comparison Process',
        step1: 'Search in a database of academic and internet sources',
        step2: 'Comparison with millions of documents in real-time',
        step3: 'Detection of both direct and paraphrased borrowings',
        step4: 'Generation of a detailed report with match percentage'
      },
      languages: {
        title: 'Language Support',
        description: 'Our system can analyze texts in different languages, ensuring checking accuracy regardless of the original language'
      },
      cta: {
        title: 'Ready to Check Your Text?',
        description: 'Start using ForgenHub today and ensure the originality of your content',
        button: 'Check Now'
      }
    }
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
      description: 'ForgenHub - inteligentní nástroj pro detekci a prevenci plagiátů ve vašich textech',
      navigation: 'Navigace',
      legal: 'Právní informace',
      terms: 'Podmínky použití',
      privacy: 'Zásady ochrany osobních údajů',
      cookies: 'Zásady cookies',
      copyright: '© {year} ForgenHub. Všechna práva vyhrazena.',
      tagline: 'Vytvořeno s láskou'
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
      continueWithGoogle: 'Pokračovat s Google',
    },
    hero: {
      badge: 'AI nástroj',
      title: 'Kontrola plagiátů s <span>ForgenHub</span>',
      description: 'Výkonný online nástroj, který pomáhá odhalit plagiáty a zajistit originalitu vašeho obsahu',
      checkButton: 'Zkontrolovat text',
      learnMore: 'Zjistit více'
    },
    feature: {
      analysis: {
        title: 'Hloubková analýza',
        description: 'Detailní skenování textu pro identifikaci potenciálních shod'
      },
      fast: {
        title: 'Rychlá kontrola',
        description: 'Získejte výsledky během několika sekund'
      },
      reports: {
        title: 'Podrobné zprávy',
        description: 'Přehledné zprávy se zvýrazněnými problematickými místy'
      }
    },
    howItWorks: {
      badge: 'Jak to funguje',
      title: 'Jednoduchý třístupňový proces',
      description: 'Rychle zkontrolujte originalitu vašeho textu pomocí pokročilé technologie AI',
      step1: {
        number: '1',
        title: 'Nahrání textu',
        description: 'Zadejte nebo nahrajte text, který chcete zkontrolovat na plagiáty'
      },
      step2: {
        number: '2',
        title: 'AI analýza',
        description: 'Náš AI systém analyzuje text a porovnává jej s mnoha zdroji'
      },
      step3: {
        number: '3',
        title: 'Získání výsledků',
        description: 'Obdržíte podrobnou zprávu s procentem originality a zjištěnými shodami'
      },
      tryItNow: 'Vyzkoušet nyní'
    },
    features: {
      badge: 'Funkce',
      title: 'Pokročilé funkce pro přesnou kontrolu',
      description: 'ForgenHub poskytuje nástroje potřebné k efektivnímu boji proti plagiátům',
      upload: {
        title: 'Snadné nahrávání',
        description: 'Zadejte text nebo nahrajte soubory pro rychlou kontrolu'
      },
      analysis: {
        title: 'Chytrá analýza',
        description: 'Naše AI kontroluje váš text oproti milionům zdrojů'
      },
      reports: {
        title: 'Podrobné zprávy',
        description: 'Získejte přehledné zprávy se zvýrazněnými shodami a odkazy na zdroje'
      },
      languages: {
        title: 'Vícejazyčná podpora',
        description: 'Kontrolujte texty v češtině, angličtině a ukrajinštině'
      }
    },
    stats: {
      accuracy: '99,8 %',
      accuracyLabel: 'přesnost',
      documents: '10M+',
      documentsLabel: 'zkontrolovaných dokumentů',
      checkTime: '<3 s',
      checkTimeLabel: 'čas kontroly',
      support: '24/7',
      supportLabel: 'podpora'
    },
    cta: {
      title: 'Připraveni zkontrolovat svůj text?',
      description: 'Začněte používat ForgenHub ještě dnes a zajistěte originalitu svého obsahu',
      button: 'Zkontrolovat nyní'
    },
    check: {
      badge: 'AI kontrola',
      title: 'Kontrola textu na plagiáty',
      description: 'Vložte svůj text nebo nahrajte soubor ke kontrole plagiátů',
      pasteText: 'Vložit text',
      uploadFile: 'Nahrát soubor',
      textPlaceholder: 'Vložte svůj text ke kontrole...',
      noticeTitle: 'Důležité informace',
      noticeText: 'Pro nejlepší výsledky použijte texty s minimálně 300 slovy',
      checkButton: 'Zkontrolovat',
      analyzing: 'Analyzuji...',
      resultsTitle: 'Výsledky kontroly',
      featuresTitle: 'Naše funkce kontroly',
      featuresDescription: 'ForgenHub nabízí pokročilé nástroje pro detekci plagiátů v textech',
      feature1: {
        title: 'Hloubková analýza',
        description: 'Detailní skenování textu pro identifikaci potenciálních shod'
      },
      feature2: {
        title: 'Jazyková podpora',
        description: 'Kontrolujte texty v různých jazycích se stejnou přesností'
      },
      feature3: {
        title: 'Podrobná zpráva',
        description: 'Získejte kompletní zprávu s odkazy na zdroje'
      },
      fileUploaded: 'Soubor nahrán',
      fileLoadedMessage: 'Text ze souboru byl úspěšně nahrán',
      emptyText: 'Prázdný text',
      enterTextMessage: 'Prosím, zadejte text ke kontrole nebo nahrajte soubor',
    },
    about: {
      badge: 'O ForgenHub',
      title: 'Naše mise a hodnoty',
      description: 'Zjistěte více o naší technologii a přístupu k boji proti plagiátům',
      mission: {
        label: 'Naše mise',
        title: 'Podpora akademické a tvůrčí integrity',
        description1: 'Vytvořili jsme ForgenHub, abychom pomohli autorům, studentům a výzkumníkům chránit jejich práci a ověřit originalitu textů.',
        description2: 'Naším cílem je poskytnout dostupný a přesný nástroj pro detekci plagiátů, který pomůže učinit intelektuální prostředí poctivějším a transparentnějším.',
        button: 'Vyzkoušet kontrolu'
      },
      values: {
        title: 'Naše hodnoty',
        integrity: {
          title: 'Integrita',
          description: 'Věříme v důležitost originality a intelektuální poctivosti'
        },
        accuracy: {
          title: 'Přesnost',
          description: 'Snažíme se poskytovat nejpřesnější výsledky kontroly'
        },
        innovation: {
          title: 'Inovace',
          description: 'Neustále zdokonalujeme naše algoritmy a přístupy'
        }
      },
      technology: {
        label: 'Technologie',
        title: 'Jak náš systém funguje',
        description: 'ForgenHub používá pokročilé algoritmy strojového učení a umělé inteligence k analýze textů a detekci plagiátů'
      },
      textProcessing: {
        title: 'Zpracování textu',
        step1: 'Sémantická analýza textu pro pochopení kontextu',
        step2: 'Rozdělení na smysluplné fragmenty pro zlepšení přesnosti',
        step3: 'Odstranění šumu a normalizace textu',
        step4: 'Vytváření digitálních otisků pro porovnání'
      },
      comparison: {
        title: 'Proces porovnávání',
        step1: 'Vyhledávání v databázi akademických a internetových zdrojů',
        step2: 'Porovnání s miliony dokumentů v reálném čase',
        step3: 'Detekce přímých i parafrázovaných výpůjček',
        step4: 'Generování podrobné zprávy s procentem shody'
      },
      languages: {
        title: 'Jazyková podpora',
        description: 'Náš systém dokáže analyzovat texty v různých jazycích a zajišťuje přesnost kontroly bez ohledu na původní jazyk'
      },
      cta: {
        title: 'Připraveni zkontrolovat svůj text?',
        description: 'Začněte používat ForgenHub ještě dnes a zajistěte originalitu svého obsahu',
        button: 'Zkontrolovat nyní'
      }
    }
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
