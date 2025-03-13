
import { ProfilePageBaseTypes } from './baseTypes';
import { ProfileOverviewTypes } from './overviewTypes';
import { ProfileSettingsTypes } from './settingsTypes';
import { ProfileBillingTypes } from './billingTypes';
import { ProfilePaymentsTypes } from './paymentsTypes';
import { ProfileServicesTypes } from './servicesTypes';
import { ProfileHistoryTypes } from './historyTypes';

// Combine all profile page types
export type ProfilePageTranslations = 
  & ProfilePageBaseTypes
  & ProfileOverviewTypes
  & ProfileSettingsTypes
  & ProfileBillingTypes
  & ProfilePaymentsTypes
  & ProfileServicesTypes
  & ProfileHistoryTypes;

// Re-export all profile types
export * from './baseTypes';
export * from './overviewTypes';
export * from './settingsTypes';
export * from './billingTypes';
export * from './paymentsTypes';
export * from './servicesTypes';
export * from './historyTypes';
