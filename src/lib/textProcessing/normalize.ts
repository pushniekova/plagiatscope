
/**
 * Text normalization utilities for plagiarism detection
 */

/**
 * Normalizes text (lowercase, punctuation removal)
 */
export const normalizeText = (text: string): string => {
  return text.toLowerCase().replace(/[^\w\s]/g, '');
};

/**
 * Tokenizes text (splitting text into words)
 */
export const tokenizeText = (text: string): string[] => {
  return text.split(/\s+/).filter(word => word.length > 0);
};

/**
 * Generates n-grams (sequences of n consecutive words)
 */
export const generateNGrams = (tokens: string[], n: number): string[] => {
  const ngrams: string[] = [];
  for (let i = 0; i <= tokens.length - n; i++) {
    ngrams.push(tokens.slice(i, i + n).join(' '));
  }
  return ngrams;
};

/**
 * Calculates term frequency (TF) for each term in a document
 */
export const calculateTF = (tokens: string[]): Record<string, number> => {
  const tf: Record<string, number> = {};
  tokens.forEach(token => {
    tf[token] = (tf[token] || 0) + 1;
  });
  return tf;
};
