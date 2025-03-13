
export type ProfilePageBaseTypes = {
  title: string;
  sidebar: {
    dashboard: string;
    services: string;
    documents: string;
    history: string;
    settings: string;
    payments: string;
    billing: string;
    logout: string;
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
    new?: string;
  };
  menu?: {
    profile: string;
    settings: string;
    billing: string;
    logout: string;
  };
  back: string;
  save: string;
  cancel: string;
  usageStats: {
    title: string;
    checksRemaining: string;
    checksTotal: string;
    checksUsed: string;
    upgradeButton: string;
    unlimited: string;
  };
};
