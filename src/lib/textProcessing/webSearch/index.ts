
/**
 * Web search utilities for plagiarism detection
 * This module provides functionality to check text against external web sources
 * It supports both real Google Custom Search integration and fallback simulation
 */

import type { WebSearchResult } from './types';
import { generateSearchQuery } from './query';
import { performGoogleSearch } from './googleApi';
import { simulateWebSearch } from './simulation';
import { getGoogleApiCredentials } from '../utils';

/**
 * Search for matching content using web resources
 * This will use Google Custom Search API if credentials are available,
 * otherwise it will fall back to our internal simulation
 */
export async function searchMultipleResources(text: string): Promise<WebSearchResult[]> {
  // Generate suitable search queries from the text
  const query = generateSearchQuery(text);
  
  // First check if we have Google API credentials
  const googleCredentials = getGoogleApiCredentials();
  
  if (googleCredentials && googleCredentials.apiKey && googleCredentials.engineId) {
    try {
      console.log("Attempting to use Google Search API with credentials");
      // Try to use Google Search API with our query
      const googleResults = await performGoogleSearch(query, text);
      
      // If we got results from Google, return them
      if (googleResults && googleResults.length > 0) {
        console.log(`Successfully retrieved ${googleResults.length} results from Google API`);
        return googleResults;
      }
      
      console.log("Google API returned no results, falling back to simulation");
    } catch (error) {
      console.error("Google search failed, falling back to simulation:", error);
      // Continue to fallback if Google search fails
    }
  } else {
    console.log("No Google API credentials found, using simulation");
  }
  
  // Fall back to internal simulation if Google API is not configured or fails
  console.log("Using simulated search for plagiarism detection (fallback)");
  return simulateWebSearch(query);
}

// Re-export the simulation function for direct access
export { simulateWebSearch };
// Re-export the WebSearchResult type
export type { WebSearchResult };
