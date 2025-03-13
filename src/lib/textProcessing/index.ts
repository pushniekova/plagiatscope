
/**
 * Main module for plagiarism detection adapted from the Plagiarism-Checker algorithm
 * https://github.com/architshukla/Plagiarism-Checker
 */

// Import from refactored modules
import { normalizeText, tokenizeText, generateNGrams, calculateTF } from './normalize';
import { calculateCosineSimilarity, findMatchingSegments, calculateJaccardSimilarity } from './similarity';
import { analyzePlagiarism } from './analyzePlagiarism';
import { simulateWebSearch } from './externalSources';

// Re-export the analyzePlagiarism function as the main API
export { analyzePlagiarism };

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
