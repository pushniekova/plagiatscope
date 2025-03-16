
import type { AboutPageTranslations } from './types/aboutPageTypes';
import type { AuthTranslations } from './types/authTypes';
import type { Language, LanguageContextProps } from './types/baseTypes';
import type { CheckPageTranslations } from './types/checkPageTypes';
import type { CommonTranslations } from './types/commonTypes';
import type { HomePageTranslations } from './types/homePageTypes';
import type { LegalPageTranslations } from './types/legalPageTypes';
import type { ProfilePageTranslations } from './types/profile';

// Combined type for all translations
export type Translations = 
  & CommonTranslations
  & AuthTranslations
  & HomePageTranslations
  & CheckPageTranslations
  & ProfilePageTranslations
  & AboutPageTranslations
  & LegalPageTranslations
  & {
    profile: {
      menu: {
        profile: string;
        settings: string;
        billing: string;
        logout: string;
      };
      [key: string]: any;
    };
  };

// Re-export the language types for easier access
export type { Language, LanguageContextProps };
