
import { Language, LanguageContextProps } from './baseTypes';
import { CommonTranslations } from './commonTypes';
import { AuthTranslations } from './authTypes';
import { HomePageTranslations } from './homePageTypes';
import { CheckPageTranslations } from './checkPageTypes';
import { AboutPageTranslations } from './aboutPageTypes';
import { ProfilePageTranslations } from './profilePageTypes';
import { LegalPageTranslations } from './legalPageTypes';

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
