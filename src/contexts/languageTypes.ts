
export type Language = 'uk' | 'en' | 'cs';

export interface LanguageContextProps {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

// Translations type definition
export type Translations = {
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
  results: {
    title: string;
    similarityScore: string;
    tabs: {
      highlighted: string;
      sources: string;
      summary: string;
    };
    noPlagiarism: string;
    noSources: string;
    match: string;
    matchedText: string;
    characters: string;
    sourcesFound: string;
    charactersAnalyzed: string;
    analysisSummary: string;
    summary: {
      low: string;
      medium: string;
      high: string;
    };
    recommendations: string;
    recommendation1: string;
    recommendation2: string;
    recommendation3: string;
    recommendation4: string;
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
