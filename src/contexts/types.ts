
import { Language, LanguageContextProps } from './types/baseTypes';
import { CommonTranslations } from './types/commonTypes';
import { AuthTranslations } from './types/authTypes';
import { HomePageTranslations } from './types/homePageTypes';
import { CheckPageTranslations } from './types/checkPageTypes';
import { AboutPageTranslations } from './types/aboutPageTypes';
import { ProfilePageTranslations } from './types/profile';
import { LegalPageTranslations } from './types/legalPageTypes';

// Re-export types
export type { Language, LanguageContextProps };

// Define the full Translations type by combining all separate translation types
export type Translations = 
  & CommonTranslations
  & AuthTranslations
  & HomePageTranslations
  & CheckPageTranslations
  & AboutPageTranslations
  & ProfilePageTranslations
  & LegalPageTranslations;
