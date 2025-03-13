
/**
 * Shared types for web search functionality
 */

export interface WebSearchResult {
  title: string;
  snippet: string;
  link: string;
  similarity: number;
}

export interface GoogleCredentials {
  apiKey: string;
  engineId: string;
}

export interface SimulatedSource {
  title: string;
  link: string;
  content: string;
}
