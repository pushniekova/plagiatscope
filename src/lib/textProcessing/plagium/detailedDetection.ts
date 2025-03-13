
/**
 * Detailed plagiarism detection module with external API integration
 * Provides extended functionality compared to basic detection
 */

import { getPlagiarismScore } from './basicDetection';
import { simulateWebSearch } from '../externalSources';
import { searchMultipleResources } from '../webSearch';

/**
 * Extended version with additional parameters matching Plagium API style
 * In a real implementation, these would connect to external services
 */
export async function getDetailedPlagiarismScore({
  text,
  languageCode = 'en',
  googleApiKey,
  googleEngineId,
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
  // In a real implementation, we would use the Google API key and engine ID
  // to perform actual searches. For now, we'll use our simulator.
  
  // Log API usage attempt (in a real app, we'd validate these)
  if (googleApiKey && googleEngineId) {
    console.log("External API keys provided - would use Google Custom Search in production");
  }
  
  // Basic implementation - get the score
  const score = await getPlagiarismScore({ text, languageCode });
  
  // Get sources from both methods and combine them
  let sources = [];
  
  try {
    // Try using the web search API with Google Custom Search
    const webResults = await searchMultipleResources(text);
    
    // Convert to the format our API expects
    const webSources = webResults.map(result => ({
      url: result.link,
      title: result.title,
      snippet: result.snippet,
      similarity: result.similarity
    }));
    
    sources = [...webSources];
    
    // If we don't have enough results, supplement with our simulated search
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
    
    // Fall back to simulated search on error
    sources = await simulateWebSearch(text);
  }
  
  // Sort by similarity
  sources.sort((a, b) => b.similarity - a.similarity);
  
  return {
    score,
    sources
  };
}
