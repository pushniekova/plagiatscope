
/**
 * Main module for plagiarism detection
 */

import { normalizeText, tokenizeText, calculateTF, generateNGrams } from './normalize';
import { calculateCosineSimilarity, findMatchingSegments } from './similarity';
import { databaseSources, academicSources } from './databaseSources';
import { simulateWebSearch } from './externalSources';

/**
 * Analyze text against both our database and external sources
 */
export const analyzePlagiarism = async (text: string): Promise<{
  overallScore: number;
  matches: Array<{
    text: string;
    startIndex: number;
    endIndex: number;
    matchPercentage: number;
    source: string;
    sourceUrl?: string;
  }>;
  externalSources: Array<{
    source: string;
    similarity: number;
    matchedText: string;
    sourceUrl: string;
  }>;
}> => {
  // Skip very short texts
  if (text.length < 30) {
    return {
      overallScore: 0,
      matches: [],
      externalSources: []
    };
  }
  
  // Prepare the text for analysis
  const normalizedInputText = normalizeText(text);
  const inputTokens = tokenizeText(normalizedInputText);
  const inputTF = calculateTF(inputTokens);
  
  // Match against our database sources
  const matches: Array<{
    text: string;
    startIndex: number;
    endIndex: number;
    matchPercentage: number;
    source: string;
    sourceUrl?: string;
  }> = [];
  
  // Check against academic database
  const allDatabaseSources = [...databaseSources, ...academicSources];
  for (const source of allDatabaseSources) {
    // Calculate cosine similarity
    const sourceNormalizedText = normalizeText(source.text);
    const sourceTokens = tokenizeText(sourceNormalizedText);
    const sourceTF = calculateTF(sourceTokens);
    
    const similarity = calculateCosineSimilarity(inputTF, sourceTF);
    
    // If there's enough similarity, find matching segments
    if (similarity > 0.2) {
      const matchingSegments = findMatchingSegments(text, source.text);
      
      for (const segment of matchingSegments) {
        matches.push({
          ...segment,
          source: source.title,
          sourceUrl: source.url
        });
      }
    }
  }
  
  // Check against external websites (simulated API calls)
  const externalResults = await simulateWebSearch(text);
  
  const externalSources = externalResults.map(result => ({
    source: result.title,
    similarity: result.similarity,
    matchedText: result.snippet,
    sourceUrl: result.url
  }));
  
  // Add matches from external sources to our general matches array
  externalSources.forEach((source) => {
    const matchingSegments = findMatchingSegments(text, source.matchedText);
    
    for (const segment of matchingSegments) {
      matches.push({
        ...segment,
        source: source.source,
        sourceUrl: source.sourceUrl
      });
    }
  });
  
  // Calculate overall score based on matches and external sources
  let totalMatchedChars = matches.reduce((sum, match) => sum + (match.endIndex - match.startIndex), 0);
  
  // Avoid counting overlapping regions twice
  totalMatchedChars = Math.min(totalMatchedChars, text.length);
  
  // Add weight from external sources
  const externalSourceWeight = externalSources.reduce((sum, source) => sum + source.similarity, 0);
  
  // Calculate overall score
  let overallScore = Math.round((totalMatchedChars / text.length) * 70);
  
  // Add external source weight (up to 30% of the score)
  overallScore += Math.min(30, Math.round(externalSourceWeight * 15));
  
  // Ensure score is between 0 and 100
  overallScore = Math.min(100, Math.max(0, overallScore));
  
  return {
    overallScore,
    matches,
    externalSources
  };
};

// Export all utilities for potential future use
export const analyzeDocument = {
  normalizeText,
  tokenizeText,
  generateNGrams,
  calculateTF,
  calculateCosineSimilarity,
  findMatchingSegments
};

// Re-export all individual functions for direct imports
export {
  normalizeText,
  tokenizeText,
  generateNGrams,
  calculateTF,
  calculateCosineSimilarity,
  findMatchingSegments,
  simulateWebSearch
};
