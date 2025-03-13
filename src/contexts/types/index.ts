
import { AboutPageTranslations } from './aboutPageTypes';
import { AuthTranslations } from './authTypes';
import { Language, LanguageContextProps } from './baseTypes';
import { CheckPageTranslations } from './checkPageTypes';
import { CommonTranslations } from './commonTypes';
import { HomePageTranslations } from './homePageTypes';
import { LegalPageTranslations } from './legalPageTypes';
import { ProfilePageTranslations } from './profilePageTypes';

// Combined type for all translations
export type Translations = 
  & CommonTranslations
  & AuthTranslations
  & HomePageTranslations
  & CheckPageTranslations
  & AboutPageTranslations
  & LegalPageTranslations
  & ProfilePageTranslations;

// Re-export all types
export * from './baseTypes';
export * from './commonTypes';
export * from './homePageTypes';
export * from './aboutPageTypes';
export * from './checkPageTypes';
export * from './authTypes';
export * from './legalPageTypes';
export * from './profilePageTypes';
export type { Language, LanguageContextProps };
