
// Profile page related translation types
export type ProfilePageTranslations = {
  profile: {
    dashboard: string;
    welcomeMessage: string;
    title: string;
    personalInfo: string;
    personalInfoDesc: string;
    fullName: string;
    email: string;
    username: string;
    createdAt: string;
    comingSoon: string;
    menu: {
      title: string;
      profile: string;
      settings: string;
      billing: string;
      payments: string;
      services: string;
      history: string;
    };
    settings: {
      title: string;
      accountSettings: string;
      accountSettingsDesc: string;
      notifications: string;
      emailNotifications: string;
      emailNotificationsDesc: string;
      marketingEmails: string;
      marketingEmailsDesc: string;
      security: string;
      twoFactor: string;
      twoFactorDesc: string;
    };
    billing: {
      title: string;
      billingInfo: string;
      billingInfoDesc: string;
      noCard: string;
      addCardDesc: string;
      addCard: string;
      plans: string;
      month: string;
      freePlan: string;
      freePlanDesc: string;
      freePlanFeature1: string;
      freePlanFeature2: string;
      premiumPlan: string;
      premiumPlanDesc: string;
      premiumPlanFeature1: string;
      premiumPlanFeature2: string;
      proPlan: string;
      proPlanDesc: string;
      proPlanFeature1: string;
      proPlanFeature2: string;
      currentPlan: string;
      upgradePlan: string;
    };
    payments: {
      title: string;
      paymentHistory: string;
      paymentHistoryDesc: string;
      invoiceId: string;
      date: string;
      amount: string;
      status: {
        completed: string;
        pending: string;
        failed: string;
      };
      noHistory: string;
    };
    services: {
      title: string;
      availableServices: string;
      availableServicesDesc: string;
      serviceTitle1: string;
      serviceDesc1: string;
      serviceTitle2: string;
      serviceDesc2: string;
      serviceTitle3: string;
      serviceDesc3: string;
      status: {
        active: string;
        inactive: string;
      };
      usage: string;
      usagesRemaining: string;
      useService: string;
      activateService: string;
    };
    history: {
      title: string;
      checkHistory: string;
      checkHistoryDesc: string;
      search: string;
      serviceType: {
        textcheck: string;
        imagecheck: string;
      };
      status: {
        completed: string;
        failed: string;
      };
      score: string;
      viewDetails: string;
      noHistory: string;
    };
  };
};
