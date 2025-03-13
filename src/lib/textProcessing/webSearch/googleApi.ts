
/**
 * Google Custom Search API integration
 */

import { getGoogleApiCredentials } from '../utils';
import { GoogleCredentials, WebSearchResult } from './types';
import { processAndScoreResults } from './utils';

/**
 * Search using Google Custom Search API
 */
export async function searchWithGoogleApi(
  query: string, 
  credentials: GoogleCredentials
): Promise<any[]> {
  const { apiKey, engineId } = credentials;
  const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${engineId}&q=${encodeURIComponent(query)}&num=10`;
  
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Google API Error (${response.status}):`, errorText);
      throw new Error(`Google API returned ${response.status}`);
    }
    
    const data = await response.json();
    return data.items || [];
  } catch (error) {
    console.error("Error during Google API search:", error);
    throw error;
  }
}

/**
 * Search for content using Google API and process results
 */
export async function performGoogleSearch(query: string, text: string): Promise<WebSearchResult[] | null> {
  const googleCredentials = getGoogleApiCredentials();
  
  if (!googleCredentials) {
    console.log("No Google API credentials found in local storage");
    return null;
  }
  
  try {
    console.log("Using Google Custom Search API for plagiarism detection");
    const googleResults = await searchWithGoogleApi(query, googleCredentials);
    
    // If we got results from Google, calculate similarity and return
    if (googleResults && googleResults.length > 0) {
      const processedResults = processAndScoreResults(googleResults, text);
      console.log(`Found ${processedResults.length} real sources via Google API`);
      return processedResults;
    }
    
    return [];
  } catch (error) {
    console.error("Error using Google Search API:", error);
    return null;
  }
}
