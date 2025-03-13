
// Base profile page types
export type ProfilePageBaseTypes = {
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
};
