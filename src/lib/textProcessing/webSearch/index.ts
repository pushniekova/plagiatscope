
/**
 * Web search utilities for plagiarism detection
 * This module provides functionality to check text against external web sources
 * It supports both real Google Custom Search integration and fallback simulation
 */

import { WebSearchResult } from './types';
import { generateSearchQuery } from './query';
import { performGoogleSearch } from './googleApi';
import { simulateWebSearch } from './simulation';

/**
 * Search for matching content using web resources
 * This will use Google Custom Search API if credentials are available,
 * otherwise it will fall back to our internal simulation
 */
export async function searchMultipleResources(text: string): Promise<WebSearchResult[]> {
  // Generate a suitable search query from the text
  const query = generateSearchQuery(text);
  
  // First try to use Google Search API
  const googleResults = await performGoogleSearch(query, text);
  
  // If we got results from Google, return them
  if (googleResults && googleResults.length > 0) {
    return googleResults;
  }
  
  // Fall back to internal simulation if Google API is not configured or fails
  console.log("Using simulated search for plagiarism detection (fallback)");
  return simulateWebSearch(query);
}

// Re-export the simulation function for direct access
export { simulateWebSearch };
// Re-export the WebSearchResult type
export { WebSearchResult };
