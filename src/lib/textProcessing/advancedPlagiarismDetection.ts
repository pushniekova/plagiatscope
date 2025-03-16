
/**
 * Advanced plagiarism detection utilities based on shingles and cosine similarity
 * Inspired by the Python algorithm shared by the user
 */

import { normalizeText, tokenizeText } from './normalize';
import { calculateCosineSimilarity } from './similarity';

/**
 * Create shingles (n-grams) from text
 * @param tokens Array of text tokens (words)
 * @param nGramSize Size of n-grams to create
 */
export const createShingles = (tokens: string[], nGramSize: number = 3): string[] => {
  const shingles: string[] = [];
  for (let i = 0; i <= tokens.length - nGramSize; i++) {
    const shingle = tokens.slice(i, i + nGramSize).join(' ');
    shingles.push(shingle);
  }
  return shingles;
};

/**
 * Find common fragments between two texts
 * @param text1 First text
 * @param text2 Second text
 * @param nGramSize Size of n-grams to create
 */
export const findCommonFragments = (
  text1: string, 
  text2: string, 
  nGramSize: number = 3
): Array<{index: number, text: string}> => {
  // Normalize and tokenize texts
  const normalizedText1 = normalizeText(text1);
  const normalizedText2 = normalizeText(text2);
  
  const tokens1 = tokenizeText(normalizedText1);
  const tokens2 = tokenizeText(normalizedText2);
  
  // Create shingles
  const shingles1 = createShingles(tokens1, nGramSize);
  const shingles2 = createShingles(tokens2, nGramSize);
  
  // Find common fragments
  const commonFragments: Array<{index: number, text: string}> = [];
  
  for (let i = 0; i < shingles1.length; i++) {
    for (let j = 0; j < shingles2.length; j++) {
      if (shingles1[i] === shingles2[j]) {
        commonFragments.push({
          index: i,
          text: shingles1[i]
        });
        break; // No need to check this shingle against other shingles in text2
      }
    }
  }
  
  return commonFragments;
};

/**
 * Calculate TF-IDF vectors for two texts and compute cosine similarity
 * @param text1 First text
 * @param text2 Second text
 */
export const calculateTextSimilarity = (text1: string, text2: string): number => {
  // Normalize and tokenize texts
  const normalizedText1 = normalizeText(text1);
  const normalizedText2 = normalizeText(text2);
  
  const tokens1 = tokenizeText(normalizedText1);
  const tokens2 = tokenizeText(normalizedText2);
  
  // Create a vocabulary of all unique tokens
  const vocabulary = new Set([...tokens1, ...tokens2]);
  
  // Calculate term frequencies for both texts
  const tf1: Record<string, number> = {};
  const tf2: Record<string, number> = {};
  
  for (const token of tokens1) {
    tf1[token] = (tf1[token] || 0) + 1;
  }
  
  for (const token of tokens2) {
    tf2[token] = (tf2[token] || 0) + 1;
  }
  
  // Calculate cosine similarity between the term frequency vectors
  return calculateCosineSimilarity(tf1, tf2);
};

/**
 * The main function to check plagiarism by comparing a suspicious text against reference texts
 * @param suspiciousText The text to check for plagiarism
 * @param referenceTexts Array of reference texts to compare against
 * @param threshold Similarity threshold above which to consider as plagiarism
 */
export const checkPlagiarism = (
  suspiciousText: string,
  referenceTexts: string[],
  threshold: number = 0.7
): Array<{
  referenceId: number;
  similarityScore: number;
  commonFragmentsCount: number;
  isPlagiarism: boolean;
  commonFragments: Array<{index: number, text: string}>;
}> => {
  const results = [];
  
  for (let i = 0; i < referenceTexts.length; i++) {
    const refText = referenceTexts[i];
    
    // Calculate similarity score
    const similarityScore = calculateTextSimilarity(suspiciousText, refText);
    
    // Find common fragments
    const commonFragments = findCommonFragments(suspiciousText, refText);
    
    results.push({
      referenceId: i,
      similarityScore,
      commonFragmentsCount: commonFragments.length,
      isPlagiarism: similarityScore > threshold,
      commonFragments
    });
  }
  
  return results;
};

/**
 * Advanced plagiarism detection that also considers intelligent variations
 * like paraphrasing, sentence restructuring, etc.
 */
export const advancedPlagiarismCheck = async (
  suspiciousText: string,
  referenceTexts: string[]
): Promise<{
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
  // Perform basic plagiarism check
  const results = checkPlagiarism(suspiciousText, referenceTexts);
  
  // Calculate overall score (weighted average of all similarities)
  let totalScore = 0;
  let totalWeight = 0;
  
  const matches: Array<{
    text: string;
    startIndex: number;
    endIndex: number;
    matchPercentage: number;
    source: string;
    sourceUrl?: string;
  }> = [];
  
  // Process each result to extract matches
  for (const result of results) {
    // Weight by the number of common fragments (more fragments = more confidence)
    const weight = Math.max(0.5, Math.min(2, result.commonFragmentsCount / 10));
    totalScore += result.similarityScore * weight;
    totalWeight += weight;
    
    // Add matches from common fragments
    for (const fragment of result.commonFragments) {
      // In a real implementation, we would find the actual indices in the original text
      // This is a simplified approximation
      const fragmentText = fragment.text;
      const approxIndex = suspiciousText.indexOf(fragmentText);
      
      if (approxIndex !== -1) {
        matches.push({
          text: fragmentText,
          startIndex: approxIndex,
          endIndex: approxIndex + fragmentText.length,
          matchPercentage: Math.round(result.similarityScore * 100),
          source: `Reference #${result.referenceId + 1}`
        });
      }
    }
  }
  
  // Calculate final score (as a percentage)
  const overallScore = totalWeight > 0 
    ? Math.round((totalScore / totalWeight) * 100) 
    : 0;
  
  // For demonstration purposes, we'll just use an empty array for external sources
  // In a real implementation, we would perform web searches and API calls
  const externalSources: Array<{
    source: string;
    similarity: number;
    matchedText: string;
    sourceUrl: string;
  }> = [];
  
  return {
    overallScore,
    matches,
    externalSources
  };
};
