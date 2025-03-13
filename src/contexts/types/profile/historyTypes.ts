
// History section types
export type ProfileHistoryTypes = {
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
    reportNotFound?: string;
    reportNotFoundDesc?: string;
  };
};
