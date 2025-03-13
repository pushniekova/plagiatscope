
/**
 * Common types for both Plagiarism and AI detection APIs
 */

// Common status enum used by both APIs
export enum CheckStatus {
  // Plagiarism check statuses
  STATE_STORED = 2,
  STATE_SUBMITTED = 3,
  STATE_FAILED = 4,
  STATE_CHECKED = 5,
  
  // AI detection statuses
  AI_STATE_QUEUED = 1,
  AI_STATE_IN_PROGRESS = 2,
  AI_STATE_FAILED = 3,
  AI_STATE_CHECKED = 4
}

// Configuration object for the API
export interface PlagiarismCheckConfig {
  // Organization API (plagiarism check)
  groupToken: string;
  authorEmail: string;
  
  // Personal API (AI detection)
  personalApiToken?: string;
}

// Plagiarism check types
export interface PlagiarismCheckStatus {
  id: number;
  state: number;
  filename: string;
  report?: {
    id: number;
    percent: string;
    source_count: number;
  };
}

export interface PlagiarismReportNode {
  enabled: boolean;
  start: number;
  end: number;
  text: string;
  sources: number[];
  sources_improved: Array<{
    source: number;
    cos: number;
  }>;
  headers: number[];
  quotes: number[];
  destinations_clusters: number[];
}

export interface PlagiarismSource {
  content_type: string;
  source: string;
  percent: number;
  plagiarism_percent: number;
  link: {
    name: string;
    urls: string[];
  };
}

export interface PlagiarismReport {
  report: {
    id: number;
    percent: string;
    source_count: number;
  };
  report_data: {
    nodes: PlagiarismReportNode[];
    sources: PlagiarismSource[];
    matched_percent: number;
  };
}

// AI detection types
export interface AiDetectionStatus {
  id: number;
  status: number;
  percent: number | null;
  processed_percent: number | null;
  strong_percent: number | null;
  likely_percent: number | null;
  chunks: AiDetectionChunk[];
}

export interface AiDetectionChunk {
  reliability: number;
  position: [number, number]; // [start, end]
}

export interface AiDetectionReport {
  id: number;
  status: number;
  percent: number;
  processed_percent: number;
  strong_percent: number;
  likely_percent: number;
  content: string;
  chunks: AiDetectionChunk[];
}
