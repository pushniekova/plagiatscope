
/**
 * Web analyzer module for plagiarism detection
 * Handles checking text against simulated web sources
 */

import { findMatchingSegments } from '../similarity';
import { simulateWebSearch, searchMultipleResources } from '../webSearch';

interface WebSource {
  source: string;
  similarity: number;
  matchedText: string;
  sourceUrl: string;
}

interface Match {
  text: string;
  startIndex: number;
  endIndex: number;
  matchPercentage: number;
  source: string;
  sourceUrl?: string;
}

/**
 * Analyze text against web sources
 */
export const analyzeWebSources = async (text: string): Promise<{
  externalSources: WebSource[];
  webMatches: Match[];
}> => {
  console.log("Checking against simulated web sources");
  
  let externalResults = [];
  
  try {
    // Use our simulated web search
    externalResults = await searchMultipleResources(text);
    console.log(`Found ${externalResults.length} potential external sources`);
  } catch (error) {
    console.error("Error during web search:", error);
    // Fallback to direct simulation on error
    externalResults = await simulateWebSearch(text);
  }
  
  // Process and format the results
  const externalSources = externalResults.map(result => {
    // Ensure we have the right properties from different APIs
    const sourceTitle = result.title || result.source || "Unknown source";
    const sourceUrl = result.link || result.url || result.sourceUrl || "#";
    const matchedText = result.snippet || result.matchedText || result.text || "";
    const similarity = result.similarity || 0;
    
    return {
      source: sourceTitle,
      similarity: similarity,
      matchedText: matchedText,
      sourceUrl: sourceUrl
    };
  });
  
  // Collect matches from external sources
  const webMatches: Match[] = [];
  externalSources.forEach((source) => {
    const matchingSegments = findMatchingSegments(text, source.matchedText);
    
    for (const segment of matchingSegments) {
      webMatches.push({
        ...segment,
        source: source.source,
        sourceUrl: source.sourceUrl
      });
    }
  });
  
  return {
    externalSources,
    webMatches
  };
};
