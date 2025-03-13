
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

// Define our supported languages
export type Language = 'uk' | 'cs' | 'en';

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Define all our translations
const translations: Record<Language, Record<string, string>> = {
  uk: {
    // Navigation
    'nav.home': 'Головна',
    'nav.check': 'Перевірка',
    'nav.about': 'Про нас',
    'nav.checkText': 'Перевірити текст',
    
    // Hero section
    'hero.badge': 'Сучасне виявлення плагіату',
    'hero.title': 'Забезпечте <span>оригінальність</span> вашого контенту з точністю',
    'hero.description': 'Розширений аналіз тексту для студентів, викладачів та авторів контенту. Швидкий, точний та простий у використанні сервіс виявлення плагіату.',
    'hero.checkButton': 'Перевірити текст',
    'hero.learnMore': 'Дізнатися більше',
    
    // Feature cards
    'feature.analysis.title': 'Точний аналіз',
    'feature.analysis.description': 'Сучасні алгоритми для точного виявлення плагіату',
    'feature.fast.title': 'Блискавична швидкість',
    'feature.fast.description': 'Отримуйте результати за секунди, а не хвилини чи години',
    'feature.reports.title': 'Детальні звіти',
    'feature.reports.description': 'Вичерпні звіти з виділенням потенційних проблем',
    
    // Footer
    'footer.description': 'Сучасний сервіс виявлення плагіату для студентів, викладачів та авторів контенту. Перевіряйте оригінальність вашого тексту з точністю та легкістю.',
    'footer.navigation': 'Навігація',
    'footer.legal': 'Юридична інформація',
    'footer.terms': 'Умови використання',
    'footer.privacy': 'Політика конфіденційності',
    'footer.cookies': 'Політика щодо файлів cookie',
    'footer.copyright': '© {year} PlagiatScope. Усі права захищено.',
    'footer.tagline': 'Зроблено з точністю та турботою',
    
    // Language selector
    'language.uk': 'Українська',
    'language.cs': 'Чеська',
    'language.en': 'Англійська',
  },
  
  cs: {
    // Navigation
    'nav.home': 'Domů',
    'nav.check': 'Kontrola',
    'nav.about': 'O nás',
    'nav.checkText': 'Zkontrolovat text',
    
    // Hero section
    'hero.badge': 'Moderní detekce plagiátů',
    'hero.title': 'Zajistěte <span>originalitu</span> vašeho obsahu s přesností',
    'hero.description': 'Pokročilá analýza textu pro studenty, učitele a tvůrce obsahu. Rychlá, přesná a snadno použitelná služba pro detekci plagiátů.',
    'hero.checkButton': 'Zkontrolovat text',
    'hero.learnMore': 'Více informací',
    
    // Feature cards
    'feature.analysis.title': 'Přesná analýza',
    'feature.analysis.description': 'Nejmodernější algoritmy pro přesnou detekci plagiátů',
    'feature.fast.title': 'Bleskově rychlé',
    'feature.fast.description': 'Získejte výsledky během sekund, ne minut nebo hodin',
    'feature.reports.title': 'Podrobné zprávy',
    'feature.reports.description': 'Komplexní zprávy zvýrazňující potenciální problémy',
    
    // Footer
    'footer.description': 'Pokročilá služba pro detekci plagiátů pro studenty, učitele a tvůrce obsahu. Zkontrolujte originalitu svého textu s přesností a snadností.',
    'footer.navigation': 'Navigace',
    'footer.legal': 'Právní informace',
    'footer.terms': 'Podmínky služby',
    'footer.privacy': 'Zásady ochrany osobních údajů',
    'footer.cookies': 'Zásady používání souborů cookie',
    'footer.copyright': '© {year} PlagiatScope. Všechna práva vyhrazena.',
    'footer.tagline': 'Vytvořeno s přesností a péčí',
    
    // Language selector
    'language.uk': 'Ukrajinština',
    'language.cs': 'Čeština',
    'language.en': 'Angličtina',
  },
  
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.check': 'Check',
    'nav.about': 'About',
    'nav.checkText': 'Check Text',
    
    // Hero section
    'hero.badge': 'Modern plagiarism detection',
    'hero.title': 'Ensure Your Content\'s <span>Originality</span> with Precision',
    'hero.description': 'Advanced text analysis for students, teachers, and content creators. Fast, accurate, and easy-to-use plagiarism detection service.',
    'hero.checkButton': 'Check Your Text',
    'hero.learnMore': 'Learn More',
    
    // Feature cards
    'feature.analysis.title': 'Precise Analysis',
    'feature.analysis.description': 'State-of-the-art algorithms for accurate plagiarism detection',
    'feature.fast.title': 'Lightning Fast',
    'feature.fast.description': 'Get results within seconds, not minutes or hours',
    'feature.reports.title': 'Detailed Reports',
    'feature.reports.description': 'Comprehensive reports highlighting potential issues',
    
    // Footer
    'footer.description': 'Advanced plagiarism detection service for students, teachers, and content creators. Check your text for originality with precision and ease.',
    'footer.navigation': 'Navigation',
    'footer.legal': 'Legal',
    'footer.terms': 'Terms of Service',
    'footer.privacy': 'Privacy Policy',
    'footer.cookies': 'Cookie Policy',
    'footer.copyright': '© {year} PlagiatScope. All rights reserved.',
    'footer.tagline': 'Made with precision and care',
    
    // Language selector
    'language.uk': 'Ukrainian',
    'language.cs': 'Czech',
    'language.en': 'English',
  }
};

type LanguageProviderProps = {
  children: ReactNode;
};

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  // Set Ukrainian as the default language
  const [language, setLanguage] = useState<Language>('uk');

  // Function to get a translated string
  const t = (key: string): string => {
    // Return the key itself if translation is not found
    return translations[language][key] || key;
  };

  // Load language preference from localStorage on component mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && Object.keys(translations).includes(savedLanguage)) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Save language preference to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the language context
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
