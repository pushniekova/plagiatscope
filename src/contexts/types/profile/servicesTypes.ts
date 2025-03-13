
// Services section types
export type ProfileServicesTypes = {
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
};
