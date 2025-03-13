
// Profile page related translation types
export type ProfilePageTranslations = {
  profile: {
    title?: string;
    subtitle?: string;
    dashboard?: string;
    welcomeMessage?: string;
    personalInfo?: string;
    personalInfoDesc?: string;
    fullName?: string;
    email?: string;
    username?: string;
    createdAt?: string;
    comingSoon?: string;
    menu: {
      title?: string;
      profile?: string;
      overview?: string;
      settings?: string;
      billing?: string;
      payments?: string;
      services?: string;
      history?: string;
    };
    sidebarMenu?: {
      plagiarismCheck?: string;
      aiContentCheck?: string;
      aiTextHumanization?: string;
      myOrders?: string;
      proofreading?: string;
      plagiarismRemoval?: string;
      payments?: string;
      helpdesk?: string;
      language?: string;
      new?: string;
    };
    overview?: {
      title?: string;
      welcomeBack?: string;
      credits?: string;
      creditsDesc?: string;
      checks?: string;
      checksDesc?: string;
      accuracy?: string;
      accuracyDesc?: string;
      upgradeTitle?: string;
      upgradeDesc?: string;
      upgradeButton?: string;
      recentActivity?: string;
      recentActivityDesc?: string;
      recentActivityEmpty?: string;
      viewAll?: string;
      fileChecked?: string;
      fileUploaded?: string;
      similarityScore?: string;
      dateFormat?: string;
      usageTitle?: string;
      usageDesc?: string;
      checksUsed?: string;
      checksLeft?: string;
      upgradeNow?: string;
      checksValue?: string;
    };
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
    billing: {
      title: string;
      currentPlan?: string;
      currentPlanDesc?: string;
      freePlan?: string;
      freePlanDesc?: string;
      premiumPlan?: string;
      premiumPlanDesc?: string;
      planFeatures?: string;
      feature1?: string;
      feature2?: string;
      feature3?: string;
      feature4?: string;
      feature5?: string;
      upgradePlan?: string;
      downgrade?: string;
      renewalDate?: string;
      paymentMethod?: string;
      paymentMethodDesc?: string;
      addPaymentMethod?: string;
      billingHistory?: string;
      billingHistoryDesc?: string;
      noBillingHistory?: string;
      receipt?: string;
      date?: string;
      amount?: string;
      invoiceId?: string;
      status?: string;
      downloadInvoice?: string;
      cancelSubscription?: string;
      confirmCancel?: string;
      cancelWarning?: string;
      confirm?: string;
      cancel?: string;
      planComparison?: string;
      planComparisonDesc?: string;
      monthly?: string;
      annually?: string;
      currentPlanBadge?: string;
      perMonth?: string;
      perYear?: string;
      savePercent?: string;
      getStarted?: string;
      billingInfo?: string;
      billingInfoDesc?: string;
      noCard?: string;
      addCardDesc?: string;
      addCard?: string;
      plans?: string;
      freePlanFeature1?: string;
      freePlanFeature2?: string;
      proPlan?: string;
      proPlanDesc?: string;
      proPlanFeature1?: string;
      proPlanFeature2?: string;
      month?: string;
      premiumPlanFeature1?: string;
      premiumPlanFeature2?: string;
    };
    payments: {
      title: string;
      paymentHistory?: string;
      paymentHistoryDesc?: string;
      invoiceId?: string;
      date?: string;
      amount?: string;
      status?: {
        completed: string;
        pending: string;
        failed: string;
      } | string; // Allow both object and string for backwards compatibility
      noHistory?: string;
      comingSoon?: string;
      billingInfo?: string;
      billingInfoDesc?: string;
      creditCard?: string;
      cardNumber?: string;
      cardholderName?: string;
      expiration?: string;
      cvv?: string;
      billingAddress?: string;
      country?: string;
      streetAddress?: string;
      city?: string;
      state?: string;
      zip?: string;
      updateCard?: string;
      transactionHistory?: string;
      transactionStatus?: {
        completed: string;
        pending: string;
        failed: string;
      };
      noTransactions?: string;
    };
    services: {
      title: string;
      description?: string;
      availableServices?: string;
      availableServicesDesc?: string;
      serviceTitle1?: string;
      serviceDesc1?: string;
      serviceTitle2?: string;
      serviceDesc2?: string;
      serviceTitle3?: string;
      serviceDesc3?: string;
      status?: {
        active: string;
        inactive: string;
      };
      usage?: string;
      usagesRemaining?: string;
      useService?: string;
      activateService?: string;
      comingSoon?: string;
      premium?: string;
      free?: string;
      premiumTextCheck?: {
        title?: string;
        description?: string;
        placeholder?: string;
        notice?: string;
        noticeText?: string;
        checkButton?: string;
      };
    };
    history: {
      title: string;
      checkHistory?: string;
      checkHistoryDesc?: string;
      search?: string;
      viewMode?: {
        card?: string;
        list?: string;
      };
      filter?: string;
      refresh?: string;
      serviceType?: {
        textcheck?: string;
        imagecheck?: string;
      };
      status?: {
        completed?: string;
        inQueue?: string;
        unavailable?: string;
        failed?: string;
      };
      score?: string;
      viewDetails?: string;
      viewReport?: string;
      downloadReport?: string;
      delete?: string;
      noHistory?: string;
      comingSoon?: string;
      queueEstimate?: string;
      unavailableMessage?: string;
    };
  };
};
