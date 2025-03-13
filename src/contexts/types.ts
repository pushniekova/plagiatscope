
import { AboutPageTypes } from './types/aboutPageTypes';
import { AuthTypes } from './types/authTypes';
import { BaseTypes } from './types/baseTypes';
import { CheckPageTypes } from './types/checkPageTypes';
import { CommonTypes } from './types/commonTypes';
import { HomePageTypes } from './types/homePageTypes';
import { LegalPageTypes } from './types/legalPageTypes';
import { ProfilePageTypes } from './types/profilePageTypes';

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
