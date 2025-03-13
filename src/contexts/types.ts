
import { Language, LanguageContextProps } from './types/baseTypes';
import { AboutPageTranslations } from './types/aboutPageTypes';
import { AuthTranslations } from './types/authTypes';
import { CheckPageTranslations } from './types/checkPageTypes';
import { CommonTranslations } from './types/commonTypes';
import { HomePageTranslations } from './types/homePageTypes';
import { LegalPageTranslations } from './types/legalPageTypes';
import { ProfilePageTranslations } from './types/profile';

export type Translations = 
  & CommonTranslations
  & HomePageTranslations 
  & AboutPageTranslations
  & CheckPageTranslations
  & AuthTranslations
  & LegalPageTranslations
  & ProfilePageTranslations;

export { Language, LanguageContextProps };
