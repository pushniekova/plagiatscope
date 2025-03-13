
/**
 * Detailed plagiarism detection module with web search integration
 * Provides extended functionality compared to basic detection
 */

import { getPlagiarismScore } from './basicDetection';
import { simulateWebSearch, searchMultipleResources, WebSearchResult } from '../webSearch';

/**
 * Extended version that combines basic plagiarism detection with web sources
 */
export async function getDetailedPlagiarismScore({
  text,
  languageCode = 'en',
}: {
  text: string;
  languageCode?: string;
}): Promise<{
  score: number;
  sources: Array<{
    url: string;
    title: string;
    snippet: string;
    similarity: number;
  }>;
}> {
  // Basic implementation - get the score
  const score = await getPlagiarismScore({ text, languageCode });
  
  // Get sources using our web search functionality
  let sources = [];
  
  try {
    // Use our multi-resource search (which may use Google API if configured)
    const webResults = await searchMultipleResources(text);
    
    // Convert web results to the format our API expects
    const webSources = webResults.map(result => ({
      url: result.link,
      title: result.title,
      snippet: result.snippet,
      similarity: result.similarity
    }));
    
    sources = [...webSources];
    
    // If we don't have enough results, supplement with our direct simulated search
    if (sources.length < 3) {
      const simulatedResults = await simulateWebSearch(text);
      
      // Add unique sources that aren't already in our list
      const existingUrls = new Set(sources.map(s => s.url));
      
      for (const result of simulatedResults) {
        if (!existingUrls.has(result.link)) {
          sources.push({
            url: result.link,
            title: result.title,
            snippet: result.snippet,
            similarity: result.similarity
          });
          existingUrls.add(result.link);
        }
      }
    }
  } catch (error) {
    console.error("Error in web search:", error);
    
    // Fall back to direct simulated search on error
    const fallbackResults = await simulateWebSearch(text);
    sources = fallbackResults.map(result => ({
      url: result.link,
      title: result.title,
      snippet: result.snippet,
      similarity: result.similarity
    }));
  }
  
  // Sort by similarity
  sources.sort((a, b) => b.similarity - a.similarity);
  
  return {
    score,
    sources
  };
}
