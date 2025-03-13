
export interface Match {
  text: string;
  startIndex: number;
  endIndex: number;
  matchPercentage: number;
  source: string;
  sourceUrl?: string;
}

export interface ExternalSource {
  source: string;
  similarity: number;
  matchedText: string;
  sourceUrl: string;
}

export interface ResultsProps {
  originalText: string;
  overallScore: number;
  matches: Match[];
  externalSources?: ExternalSource[];
  documentName?: string;
  analyzedCharacters?: number;
}
