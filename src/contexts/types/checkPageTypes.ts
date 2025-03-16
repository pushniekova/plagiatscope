
// Check page related translation types
export type CheckPageTranslations = {
  textInput: {
    placeholder: string;
    characters: string;
  };
  check: {
    title: string;
    description: string;
    uploadYourText: string;
    pasteText: string;
    uploadFile: string;
    textPlaceholder: string;
    uploadPlaceholder?: string;
    checkButton: string;
    dropFile?: string;
    fileTypes?: string;
    enterText?: string;
    noticeTitle: string;
    noticeText: string;
    checkingStatus?: string;
    analyzing: string;
    emptyText?: string;
    enterTextMessage?: string;
    fileUploaded?: string;
    fileLoadedMessage?: string;
    analysisError?: string;
    analysisErrorMessage?: string;
    preview?: string;
    characters?: string;
    badge?: string;
    resultsTitle?: string;
    featuresTitle?: string;
    featuresDescription?: string;
    feature1?: {
      title: string;
      description: string;
    };
    feature2?: {
      title: string;
      description: string;
    };
    feature3?: {
      title: string;
      description: string;
    };
    apiConfiguration?: {
      title: string;
      description: string;
      saveChanges: string;
      cancel: string;
      saved: string;
      error: string;
    };
    reportPremiumFeatures?: {
      title: string;
      description: string;
      button: string;
      feature1: string;
      feature2: string;
      feature3: string;
      feature4: string;
    };
    queueStatus?: {
      waiting: string;
      position: string;
      estimatedTime: string;
      skipQueue: string;
      skipQueuePrice: string;
    };
  };
  results: {
    title: string;
    similarityScore: string;
    tabs: {
      highlighted: string;
      sources: string;
      summary: string;
      external?: string;
    };
    noPlagiarism: string;
    noSources: string;
    noExternalSources?: string;
    match: string;
    cosineSimilarity?: string;
    matchedText: string;
    characters: string;
    sourcesFound: string;
    charactersAnalyzed: string;
    analysisSummary: string;
    documentStructure?: string;
    paraphrasing?: string;
    improperCitation?: string;
    downloadReport?: string;
    highPlagiarismWarning?: string;
    riskLevel?: {
      title: string;
      low: string;
      medium: string;
      high: string;
    };
    summary: {
      low: string;
      medium: string;
      high: string;
    };
    summaryDetail?: {
      low: string;
      medium: string;
      high: string;
    };
    emoticons?: {
      veryLow: string;
      low: string;
      medium: string;
      high: string;
      veryHigh: string;
    };
    recommendations: string;
    recommendation1: string;
    recommendation2: string;
    recommendation3: string;
    recommendation4: string;
    scientificCheck?: {
      title: string;
      description: string;
      price: string;
      button: string;
      skipButton: string;
    };
  };
};
