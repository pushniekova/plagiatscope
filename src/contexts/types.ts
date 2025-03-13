
import type { AboutPageTypes } from './types/aboutPageTypes';
import type { AuthTypes } from './types/authTypes';
import type { BaseTypes } from './types/baseTypes';
import type { CheckPageTypes } from './types/checkPageTypes';
import type { CommonTypes } from './types/commonTypes';
import type { HomePageTypes } from './types/homePageTypes';
import type { LegalPageTypes } from './types/legalPageTypes';
import type { ProfilePageTypes } from './types/profilePageTypes';

// Combined type for all translations
export type Translations = BaseTypes &
  HomePageTypes &
  AuthTypes &
  CheckPageTypes &
  ProfilePageTypes &
  AboutPageTypes &
  LegalPageTypes & 
  CommonTypes & {
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
