
// Settings section types
export type ProfileSettingsTypes = {
  settings: {
    title: string;
    accountSettings: string;
    accountSettingsDesc: string;
    language?: {
      title: string;
      description: string;
    };
    notifications: string;
    emailNotifications: string;
    emailNotificationsDesc: string;
    marketingEmails: string;
    marketingEmailsDesc: string;
    security: string;
    twoFactor: string;
    twoFactorDesc: string;
    comingSoon?: string;
  };
};
