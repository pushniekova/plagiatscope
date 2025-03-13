
// Base language types
export type Language = 'uk' | 'en' | 'cs';

export interface LanguageContextProps {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}
