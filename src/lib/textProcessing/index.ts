
/**
 * Main module for plagiarism detection adapted from the Plagiarism-Checker algorithm
 * https://github.com/architshukla/Plagiarism-Checker
 * 
 * Also includes Plagium-inspired implementation
 * https://github.com/ceifa/plagium
 */

// Import from refactored modules
import { normalizeText, tokenizeText, generateNGrams, calculateTF } from './normalize';
import { calculateCosineSimilarity, findMatchingSegments, calculateJaccardSimilarity } from './similarity';
import { analyzePlagiarism } from './analyzePlagiarism';
import { simulateWebSearch, searchMultipleResources } from './webSearch';
import { getPlagiarismScore, getDetailedPlagiarismScore } from './plagium';
import { hashText, calculateNonOverlappingLength } from './utils';

// Re-export the analyzePlagiarism function as the main API
export { analyzePlagiarism };

// Export Plagium-inspired functions
export { getPlagiarismScore, getDetailedPlagiarismScore };

// Export web search functions
export { simulateWebSearch, searchMultipleResources };

// Export all utilities for potential future use
export const analyzeDocument = {
  normalizeText,
  tokenizeText,
  generateNGrams,
  calculateTF,
  calculateCosineSimilarity,
  calculateJaccardSimilarity,
  findMatchingSegments,
  hashText,
  calculateNonOverlappingLength
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
  hashText,
  calculateNonOverlappingLength
};
