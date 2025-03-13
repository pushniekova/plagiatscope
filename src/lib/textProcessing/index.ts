
/**
 * Main module for plagiarism detection
 */

import { normalizeText, tokenizeText, calculateTF, generateNGrams } from './normalize';
import { calculateCosineSimilarity, findMatchingSegments, calculateJaccardSimilarity } from './similarity';
import { databaseSources, academicSources } from './databaseSources';
import { simulateWebSearch } from './externalSources';

/**
 * Analyze text against both our database and external sources using an improved algorithm
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
  
  // Step 1: Preprocessing the text for analysis
  const normalizedInputText = normalizeText(text);
  const inputTokens = tokenizeText(normalizedInputText);
  
  // Generate n-grams for more robust comparison
  const inputNGrams3 = generateNGrams(inputTokens, 3); // Trigrams
  const inputNGrams5 = generateNGrams(inputTokens, 5); // 5-grams for longer phrase matching

  // Calculate term frequency for vector comparison
  const inputTF = calculateTF(inputTokens);
  
  // Step 2: Generate fingerprints (hashes)
  const inputFingerprints = new Set(inputNGrams3.map(hashText));
  
  // Step 3 & 4: Compare with database sources and find matches
  const matches: Array<{
    text: string;
    startIndex: number;
    endIndex: number;
    matchPercentage: number;
    source: string;
    sourceUrl?: string;
  }> = [];
  
  // Check against internal database
  const allDatabaseSources = [...databaseSources, ...academicSources];
  for (const source of allDatabaseSources) {
    // Preprocess source text
    const sourceNormalizedText = normalizeText(source.text);
    const sourceTokens = tokenizeText(sourceNormalizedText);
    const sourceNGrams3 = generateNGrams(sourceTokens, 3);
    const sourceTF = calculateTF(sourceTokens);
    
    // Generate source fingerprints
    const sourceFingerprints = new Set(sourceNGrams3.map(hashText));
    
    // Calculate Jaccard similarity for n-grams (text fingerprinting method)
    const jaccardSimilarity = calculateJaccardSimilarity(inputFingerprints, sourceFingerprints);
    
    // Calculate cosine similarity for term frequency vectors (word distribution method)
    const cosineSimilarity = calculateCosineSimilarity(inputTF, sourceTF);
    
    // Combined similarity score with higher weight to Jaccard (better for plagiarism)
    const combinedSimilarity = (jaccardSimilarity * 0.7) + (cosineSimilarity * 0.3);
    
    // If there's enough similarity, find matching segments
    if (combinedSimilarity > 0.15) {
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
  
  // Step 5: Optimize by checking external sources only if necessary
  // We'll limit external checks if we already found substantial matches
  const hasSubstantialMatches = matches.length > 5 || 
    matches.reduce((sum, match) => sum + match.matchPercentage, 0) > 150;
  
  // Check against external websites (simulated API calls)
  // If we already have substantial matches, limit external source checks
  const externalResults = hasSubstantialMatches 
    ? await simulateWebSearch(text, 3) // Limited check
    : await simulateWebSearch(text);   // Full check
  
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
  
  // Step 6: Calculate overall score based on matches and external sources
  // Avoid counting overlapping regions twice
  const matchRanges = matches.map(match => ({start: match.startIndex, end: match.endIndex}));
  const nonOverlappingLength = calculateNonOverlappingLength(matchRanges, text.length);
  
  // Add weight from external sources for comprehensive analysis
  const externalSourceWeight = externalSources.reduce((sum, source) => sum + source.similarity, 0);
  
  // Calculate overall score with a new weighted formula
  let overallScore = Math.round((nonOverlappingLength / text.length) * 70);
  
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

// Utility function to simulate hashing text
function hashText(text: string): string {
  // Simple hash function for demonstration (in real implementation use MD5, SHA-1, etc.)
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    const char = text.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash.toString(16);
}

// Calculate total length of non-overlapping matched text segments
function calculateNonOverlappingLength(ranges: {start: number, end: number}[], textLength: number): number {
  if (ranges.length === 0) return 0;
  
  // Sort ranges by start index
  ranges.sort((a, b) => a.start - b.start);
  
  let totalLength = 0;
  let currentEnd = ranges[0].start;
  
  for (const range of ranges) {
    if (range.start > currentEnd) {
      // Non-overlapping range
      totalLength += range.end - range.start;
      currentEnd = range.end;
    } else if (range.end > currentEnd) {
      // Partially overlapping range
      totalLength += range.end - currentEnd;
      currentEnd = range.end;
    }
    // Completely overlapping ranges are ignored
  }
  
  return Math.min(totalLength, textLength);
}

// Export all utilities for potential future use
export const analyzeDocument = {
  normalizeText,
  tokenizeText,
  generateNGrams,
  calculateTF,
  calculateCosineSimilarity,
  calculateJaccardSimilarity,
  findMatchingSegments
};

// Re-export all individual functions for direct imports
export {
  normalizeText,
  tokenizeText,
  generateNGrams,
  calculateTF,
  calculateCosineSimilarity,
  calculateJaccardSimilarity,
  findMatchingSegments,
  simulateWebSearch
};
