
/**
 * Detailed plagiarism detection module with simulated web search
 * Provides extended functionality compared to basic detection
 */

import { getPlagiarismScore } from './basicDetection';
import { simulateWebSearch } from '../webSearch';
import { searchMultipleResources } from '../webSearch';

/**
 * Extended version that combines basic plagiarism detection with web sources
 */
export async function getDetailedPlagiarismScore({
  text,
  languageCode = 'en',
}: {
  text: string;
  languageCode?: string;
  googleApiKey?: string;
  googleEngineId?: string;
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
  
  // Get sources using our simulated web search
  let sources = [];
  
  try {
    // Use our simulated search
    const webResults = await searchMultipleResources(text);
    
    // Convert to the format our API expects
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
        if (!existingUrls.has(result.url)) {
          sources.push(result);
          existingUrls.add(result.url);
        }
      }
    }
  } catch (error) {
    console.error("Error in web search:", error);
    
    // Fall back to direct simulated search on error
    sources = await simulateWebSearch(text);
  }
  
  // Sort by similarity
  sources.sort((a, b) => b.similarity - a.similarity);
  
  return {
    score,
    sources
  };
}
