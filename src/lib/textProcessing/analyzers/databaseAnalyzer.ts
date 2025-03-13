
/**
 * Database analyzer module for plagiarism detection
 * Handles checking text against our internal database of sources
 */

import { normalizeText, tokenizeText, generateNGrams, calculateTF } from '../normalize';
import { calculateCosineSimilarity, findMatchingSegments, calculateJaccardSimilarity } from '../similarity';
import { databaseSources, academicSources } from '../databaseSources';
import { hashText } from '../utils';

/**
 * Analyze text against internal database sources
 */
export const analyzeDatabaseSources = (text: string) => {
  // Preprocessing the text for analysis
  const normalizedInputText = normalizeText(text);
  const inputTokens = tokenizeText(normalizedInputText);
  
  // Generate n-grams for more robust comparison
  const inputNGrams3 = generateNGrams(inputTokens, 3); // Trigrams
  const inputNGrams5 = generateNGrams(inputTokens, 5); // 5-grams for longer phrase matching
  const inputNGrams7 = generateNGrams(inputTokens, 7); // 7-grams for even more context

  console.log(`Generated ${inputNGrams3.length} 3-grams, ${inputNGrams5.length} 5-grams, and ${inputNGrams7.length} 7-grams`);

  // Calculate term frequency for vector comparison
  const inputTF = calculateTF(inputTokens);
  
  // Generate fingerprints (hashes) for each n-gram
  const inputFingerprints3 = new Set(inputNGrams3.map(hashText));
  const inputFingerprints5 = new Set(inputNGrams5.map(hashText));
  const inputFingerprints7 = new Set(inputNGrams7.map(hashText));
  
  console.log("Fingerprinting completed");
  
  // Compare with database sources and find matches
  const matches: Array<{
    text: string;
    startIndex: number;
    endIndex: number;
    matchPercentage: number;
    source: string;
    sourceUrl?: string;
  }> = [];
  
  console.log("Checking against internal database of", databaseSources.length + academicSources.length, "sources");
  
  // Check against internal database
  const allDatabaseSources = [...databaseSources, ...academicSources];
  for (const source of allDatabaseSources) {
    // Preprocess source text
    const sourceNormalizedText = normalizeText(source.text);
    const sourceTokens = tokenizeText(sourceNormalizedText);
    const sourceNGrams3 = generateNGrams(sourceTokens, 3);
    const sourceNGrams5 = generateNGrams(sourceTokens, 5);
    const sourceNGrams7 = generateNGrams(sourceTokens, 7);
    const sourceTF = calculateTF(sourceTokens);
    
    // Generate source fingerprints
    const sourceFingerprints3 = new Set(sourceNGrams3.map(hashText));
    const sourceFingerprints5 = new Set(sourceNGrams5.map(hashText));
    const sourceFingerprints7 = new Set(sourceNGrams7.map(hashText));
    
    // Calculate Jaccard similarity for different n-gram sizes
    const jaccardSimilarity3 = calculateJaccardSimilarity(inputFingerprints3, sourceFingerprints3);
    const jaccardSimilarity5 = calculateJaccardSimilarity(inputFingerprints5, sourceFingerprints5);
    const jaccardSimilarity7 = calculateJaccardSimilarity(inputFingerprints7, sourceFingerprints7);
    
    // Weight different n-gram sizes (giving more weight to longer matches)
    const weightedJaccardSimilarity = 
      (jaccardSimilarity3 * 0.2) + 
      (jaccardSimilarity5 * 0.3) + 
      (jaccardSimilarity7 * 0.5);
    
    // Calculate cosine similarity for term frequency vectors
    const cosineSimilarity = calculateCosineSimilarity(inputTF, sourceTF);
    
    // Combined similarity score with multiple methods
    const combinedSimilarity = (weightedJaccardSimilarity * 0.6) + (cosineSimilarity * 0.4);
    
    // If there's enough similarity, find matching segments
    if (combinedSimilarity > 0.15) {
      console.log(`Found similarity of ${combinedSimilarity.toFixed(2)} with source: ${source.title}`);
      
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
  
  console.log(`Found ${matches.length} matches in database sources`);
  
  return matches;
};
