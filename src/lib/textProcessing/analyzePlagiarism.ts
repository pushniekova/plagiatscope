
/**
 * Core plagiarism detection algorithm adapted from the Plagiarism-Checker algorithm
 * https://github.com/architshukla/Plagiarism-Checker
 * 
 * Also incorporates elements from Plagium
 * https://github.com/ceifa/plagium
 */

import { normalizeText, tokenizeText, calculateTF, generateNGrams } from './normalize';
import { calculateCosineSimilarity, findMatchingSegments, calculateJaccardSimilarity } from './similarity';
import { databaseSources, academicSources } from './databaseSources';
import { simulateWebSearch } from './webSearch';
import { searchMultipleResources } from './webSearch';
import { hashText, calculateNonOverlappingLength } from './utils';
import { getPlagiarismScore } from './plagiumDetection';

/**
 * Analyze text against both our database and external sources using an improved algorithm
 * inspired by the Plagiarism-Checker project and Plagium
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
  
  console.log("Starting plagiarism analysis for text of length:", text.length);
  
  // Step 1: Preprocessing the text for analysis
  const normalizedInputText = normalizeText(text);
  const inputTokens = tokenizeText(normalizedInputText);
  
  // Generate n-grams for more robust comparison
  const inputNGrams3 = generateNGrams(inputTokens, 3); // Trigrams
  const inputNGrams5 = generateNGrams(inputTokens, 5); // 5-grams for longer phrase matching
  const inputNGrams7 = generateNGrams(inputTokens, 7); // 7-grams for even more context

  console.log(`Generated ${inputNGrams3.length} 3-grams, ${inputNGrams5.length} 5-grams, and ${inputNGrams7.length} 7-grams`);

  // Calculate term frequency for vector comparison
  const inputTF = calculateTF(inputTokens);
  
  // Step 2: Generate fingerprints (hashes) for each n-gram
  const inputFingerprints3 = new Set(inputNGrams3.map(hashText));
  const inputFingerprints5 = new Set(inputNGrams5.map(hashText));
  const inputFingerprints7 = new Set(inputNGrams7.map(hashText));
  
  console.log("Fingerprinting completed");
  
  // Step 3 & 4: Compare with database sources and find matches
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
  
  // Step 5: Check against simulated web sources using our internal implementation
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
  
  console.log(`Total matches including external sources: ${matches.length}`);
  
  // Step 6: Calculate overall score based on matches and external sources
  // Avoid counting overlapping regions twice
  const matchRanges = matches.map(match => ({start: match.startIndex, end: match.endIndex}));
  const nonOverlappingLength = calculateNonOverlappingLength(matchRanges, text.length);
  const percentageMatched = (nonOverlappingLength / text.length) * 100;
  
  console.log(`Non-overlapping matched content: ${nonOverlappingLength} characters (${percentageMatched.toFixed(2)}%)`);
  
  // Add weight from external sources
  const externalSourceWeight = externalSources.reduce((sum, source) => sum + source.similarity, 0);
  
  // Step 7: Also get score from Plagium-inspired method
  const plagiumScore = await getPlagiarismScore({ text });
  const plagiumScoreWeighted = Math.round(plagiumScore * 100);
  
  console.log(`Plagium-inspired score: ${plagiumScoreWeighted}%`);
  
  // Calculate overall score with a weighted formula
  // Give more weight to the original method but boost with Plagium-inspired score
  let overallScore = Math.round(percentageMatched * 0.5); // 50% from direct match analysis
  
  // Add external source weight (up to 20% of the score)
  overallScore += Math.min(20, Math.round(externalSourceWeight * 10));
  
  // Add web search component (up to 10% of the score)
  const webSearchBoost = externalSources.length > 0 ? 
    Math.min(10, Math.round(externalSources[0].similarity * 20)) : 0;
  overallScore += webSearchBoost;
  
  // Add Plagium-inspired score component (up to 20% of the score)
  overallScore += Math.min(20, plagiumScoreWeighted);
  
  // Ensure score is between 0 and 100
  overallScore = Math.min(100, Math.max(0, overallScore));
  
  console.log(`Final plagiarism score: ${overallScore}%`);
  
  return {
    overallScore,
    matches,
    externalSources
  };
};
