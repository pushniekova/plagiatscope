
import { AboutPageTypes } from './aboutPageTypes';
import { AuthTypes } from './authTypes';
import { BaseTypes } from './baseTypes';
import { CheckPageTypes } from './checkPageTypes';
import { CommonTypes } from './commonTypes';
import { HomePageTypes } from './homePageTypes';
import { LegalPageTypes } from './legalPageTypes';
import { ProfilePageTranslations } from './profilePageTypes';

// Combined type for all translations
export type Translations = 
  & BaseTypes 
  & CommonTypes 
  & HomePageTypes 
  & AboutPageTypes 
  & CheckPageTypes
  & AuthTypes 
  & LegalPageTypes
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
