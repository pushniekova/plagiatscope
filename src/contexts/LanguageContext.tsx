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
  legal: {
    terms: {
      title: string;
      description: string;
      section1: {
        title: string;
        paragraph1: string;
        paragraph2: string;
      };
      section2: {
        title: string;
        paragraph1: string;
        paragraph2: string;
        bullet1: string;
        bullet2: string;
        bullet3: string;
        bullet4: string;
      };
      section3: {
        title: string;
        paragraph1: string;
        paragraph2: string;
      };
      section4: {
        title: string;
        paragraph1: string;
        paragraph2: string;
      };
      section5: {
        title: string;
        paragraph1: string;
        paragraph2: string;
      };
      lastUpdated: string;
    };
    privacy: {
      title: string;
      description: string;
      section1: {
        title: string;
        paragraph1: string;
        paragraph2: string;
      };
      section2: {
        title: string;
        paragraph1: string;
        bullet1: string;
        bullet2: string;
        bullet3: string;
        bullet4: string;
        bullet5: string;
      };
      section3: {
        title: string;
        paragraph1: string;
        paragraph2: string;
      };
      section4: {
        title: string;
        paragraph1: string;
        paragraph2: string;
      };
      section5: {
        title: string;
        paragraph1: string;
        paragraph2: string;
      };
      lastUpdated: string;
    };
    cookies: {
      title: string;
      description: string;
      section1: {
        title: string;
        paragraph1: string;
        paragraph2: string;
      };
      section2: {
        title: string;
        paragraph1: string;
        bullet1: string;
        bullet2: string;
        bullet3: string;
        bullet4: string;
      };
      section3: {
        title: string;
        paragraph1: string;
        paragraph2: string;
      };
      section4: {
        title: string;
        paragraph1: string;
        paragraph2: string;
      };
      lastUpdated: string;
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
    },
    legal: {
      terms: {
        title: 'Умови використання',
        description: 'Будь ласка, уважно прочитайте ці умови перед використанням нашого сервісу.',
        section1: {
          title: 'Прийняття умов',
          paragraph1: 'Використовуючи ForgenHub, ви погоджуєтесь дотримуватися цих Умов використання, нашої Політики конфіденційності та Політики щодо файлів cookie. Якщо ви не згодні з цими умовами, будь ласка, не використовуйте наш сервіс.',
          paragraph2: 'Ми залишаємо за собою право змінювати ці умови в будь-який час. Продовжуючи використовувати ForgenHub після внесення таких змін, ви приймаєте їх.'
        },
        section2: {
          title: 'Використання сервісу',
          paragraph1: 'ForgenHub надає інструменти для перевірки текстів на плагіат. Наш сервіс призначений для допомоги в забезпеченні оригінальності контенту, але не гарантує повного виявлення всіх можливих випадків плагіату.',
          paragraph2: 'Користуючись нашим сервісом, ви погоджуєтеся:',
          bullet1: 'Не використовувати сервіс для незаконних цілей',
          bullet2: 'Не порушувати права інтелектуальної власності третіх осіб',
          bullet3: 'Не намагатися отримати несанкціонований доступ до нашої системи',
          bullet4: 'Не розповсюджувати шкідливе програмне забезпечення через наш сервіс'
        },
        section3: {
          title: 'Обліковий запис користувача',
          paragraph1: 'Для використання деяких функцій нашого сервісу може знадобитися створення облікового запису. Ви несете відповідальність за збереження конфіденційності своїх облікових даних і за всі дії, що відбуваються в вашому обліковому записі.',
          paragraph2: 'Ми залишаємо за собою право видалити або заблокувати будь-який обліковий запис, який, на нашу думку, порушує ці умови.'
        },
        section4: {
          title: 'Інтелектуальна власність',
          paragraph1: 'Весь контент, що надається через ForgenHub, включаючи, але не обмежуючись, логотипи, тексти, графіку, код та програмне забезпечення, захищено авторським правом, товарними знаками та іншими законами про інтелектуальну власність.',
          paragraph2: 'Ви отримуєте обмежену, невиключну ліцензію на використання нашого сервісу відповідно до цих умов. Ця ліцензія не включає право на копіювання або модифікацію наших матеріалів чи створення похідних робіт на їх основі.'
        },
        section5: {
          title: 'Відмова від відповідальності',
          paragraph1: 'ForgenHub надається "як є" і "як доступно" без будь-яких гарантій, явних чи неявних. Ми не гарантуємо, що наш сервіс буде безперервним, безпечним або без помилок.',
          paragraph2: 'Ми не несемо відповідальності за будь-які прямі, непрямі, випадкові, спеціальні або подальші збитки, що виникають у зв\'язку з використанням або неможливістю використання нашого сервісу.'
        },
        lastUpdated: 'Останнє оновлення: 17 липня 2023 року'
      },
      privacy: {
        title: 'Політика конфіденційності',
        description: 'Ми серйозно ставимося до захисту ваших персональних даних. Дізнайтеся, як ми збираємо, використовуємо та захищаємо вашу інформацію.',
        section1: {
          title: 'Збір інформації',
          paragraph1: 'Ми збираємо інформацію, яку ви надаєте безпосередньо при використанні нашого сервісу, включаючи реєстраційні дані, тексти, які ви надсилаєте для перевірки, та іншу інформацію, яку ви добровільно надаєте.',
          paragraph2: 'Ми також автоматично збираємо певну інформацію про ваше використання нашого сервісу, включаючи IP-адресу, тип браузера, операційну систему, час відвідування та інші дані про використання.'
        },
        section2: {
          title: 'Використання інформації',
          paragraph1: 'Ми використовуємо зібрану інформацію для:',
          bullet1: 'Надання та підтримки нашого сервісу',
          bullet2: 'Покращення та розвитку нашого сервісу',
          bullet3: 'Спілкування з вами щодо вашого облікового запису або змін у наших умовах',
          bullet4: 'Захисту від шахрайських або незаконних дій',
          bullet5: 'Аналізу тенденцій використання та активності на нашому сервісі'
        },
        section3: {
          title: 'Поширення інформації',
          paragraph1: 'Ми не продаємо, не обмінюємо і не передаємо ваші особисті дані третім сторонам без вашої згоди, за винятком випадків, описаних у цій політиці.',
          paragraph2: 'Ми можемо поширювати інформацію з постачальниками послуг, які допомагають нам у роботі, з правоохоронними органами, якщо це вимагається законом, або в разі реорганізації нашого бізнесу.'
        },
        section4: {
          title: 'Безпека даних',
          paragraph1: 'Ми вживаємо розумних заходів для захисту ваших персональних даних від несанкціонованого доступу, використання або розкриття. Однак, жоден метод передачі через Інтернет або метод електронного зберігання не є абсолютно безпечним.',
          paragraph2: 'Ви також відповідаєте за збереження конфіденційності вашого облікового запису та пароля та за обмеження доступу до вашого комп\'ютера або пристрою.'
        },
        section5: {
          title: 'Ваші права',
          paragraph1: 'Залежно від вашого місцезнаходження, ви можете мати певні права щодо ваших персональних даних, включаючи право на доступ, виправлення, видалення вашої інформації або обмеження обробки.',
          paragraph2: 'Для реалізації цих прав або якщо у вас є запитання щодо нашої Політики конфіденційності, будь ласка, зв\'яжіться з нами за адресою, вказаною нижче.'
        },
        lastUpdated: 'Останнє оновлення: 17 липня 2023 року'
      },
      cookies: {
        title: 'Політика файлів cookie',
        description: 'Ця політика пояснює, як ми використовуємо файли cookie та подібні технології на нашому веб-сайті.',
        section1: {
          title: 'Що таке файли cookie',
          paragraph1: 'Файли cookie - це невеликі текстові файли, які зберігаються на вашому пристрої (комп\'ютері, планшеті або мобільному телефоні) при відвідуванні веб-сайтів. Вони широко використовуються для забезпечення роботи веб-сайтів або їх більш ефективної роботи.',
          paragraph2: 'Файли cookie також дозволяють веб-сайтам запам\'ятовувати ваші уподобання та надавати вам персоналізований досвід.'
        },
        section2: {
          title: 'Типи файлів cookie, які ми використовуємо',
          paragraph1: 'Ми використовуємо різні типи файлів cookie для різних цілей:',
          bullet1: 'Необхідні файли cookie: Ці файли cookie необхідні для роботи нашого веб-сайту і не можуть бути вимкнені в наших системах.',
          bullet2: 'Аналітичні файли cookie: Ці файли cookie дозволяють нам відстежувати та аналізувати використання нашого веб-сайту, щоб ми могли вимірювати та покращувати його продуктивність.',
          bullet3: 'Функціональні файли cookie: Ці файли cookie дозволяють нашому веб-сайту запам\'ятовувати вибір, який ви робите, та надавати розширені, більш персоналізовані функції.',
          bullet4: 'Рекламні файли cookie: Ці файли cookie використовуються для показу реклами, яка, ймовірно, вас зацікавить на основі ваших звичок перегляду.'
        },
        section3: {
          title: 'Управління файлами cookie',
          paragraph1: 'Більшість веб-браузерів дозволяють контролювати файли cookie через налаштування своїх уподобань. Однак, якщо ви обмежите нашу можливість встановлювати файли cookie, це може вплинути на вашу загальну взаємодію з веб-сайтом і обмежити доступ до деяких функцій.',
          paragraph2: 'Інструкції щодо управління файлами cookie у популярних браузерах можна знайти на офіційних веб-сайтах відповідних браузерів.'
        },
        section4: {
          title: 'Сторонні файли cookie',
          paragraph1: 'Ми також можемо використовувати сторонні файли cookie, які належать і управляються іншими сторонами, такими як Google Analytics. Ці компанії можуть використовувати файли cookie для відстеження вашої активності протягом часу та на різних веб-сайтах.',
          paragraph2: 'Ми не контролюємо сторонні файли cookie, і вам слід перевіряти політики конфіденційності та файлів cookie цих третіх сторін, якщо вам потрібна додаткова інформація про їхні практики.'
        },
        lastUpdated: 'Останнє оновлення: 17 липня 2023 року'
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
