
export interface Match {
  startIndex: number;
  endIndex: number;
  text: string;
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

export interface QueueStatus {
  status: 'inQueue';
  position: number;
  estimatedMinutes?: number;
  skipQueueAvailable?: boolean;
  skipQueuePrice?: string;
  onSkipQueue?: () => void;
}

export interface ResultsProps {
  originalText: string;
  overallScore: number;
  matches: Match[];
  externalSources?: ExternalSource[];
  documentName?: string;
  analyzedCharacters?: number;
  queueStatus?: QueueStatus;
}
