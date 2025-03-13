
/**
 * Similarity calculation utilities for plagiarism detection
 */

/**
 * Calculates cosine similarity between two vectors
 */
export const calculateCosineSimilarity = (
  vec1: Record<string, number>,
  vec2: Record<string, number>
): number => {
  let dotProduct = 0;
  let magnitude1 = 0;
  let magnitude2 = 0;

  // Calculate dot product
  for (const key in vec1) {
    if (vec2[key]) {
      dotProduct += vec1[key] * vec2[key];
    }
    magnitude1 += vec1[key] * vec1[key];
  }

  // Calculate magnitude of vec2
  for (const key in vec2) {
    magnitude2 += vec2[key] * vec2[key];
  }

  // Calculate magnitudes
  magnitude1 = Math.sqrt(magnitude1);
  magnitude2 = Math.sqrt(magnitude2);

  // Prevent division by zero
  if (magnitude1 === 0 || magnitude2 === 0) {
    return 0;
  }

  // Return cosine similarity
  return dotProduct / (magnitude1 * magnitude2);
};

/**
 * Calculates Jaccard similarity between two sets of fingerprints
 * Jaccard similarity is the size of the intersection divided by the size of the union
 */
export const calculateJaccardSimilarity = (
  set1: Set<string>,
  set2: Set<string>
): number => {
  if (set1.size === 0 && set2.size === 0) return 1.0; // Both empty sets are 100% similar
  if (set1.size === 0 || set2.size === 0) return 0.0; // One empty set means 0% similarity
  
  // Calculate intersection size
  const intersection = new Set([...set1].filter(x => set2.has(x)));
  
  // Calculate union size: sum of individual sizes minus the intersection size
  const unionSize = set1.size + set2.size - intersection.size;
  
  // Return Jaccard coefficient
  return intersection.size / unionSize;
};

/**
 * Find matching segments between two texts
 */
export const findMatchingSegments = (text1: string, text2: string, minLength = 10): Array<{
  text: string;
  startIndex: number;
  endIndex: number;
  matchPercentage: number;
}> => {
  const matches: Array<{
    text: string;
    startIndex: number;
    endIndex: number;
    matchPercentage: number;
  }> = [];
  
  // Normalize texts for comparison
  const normalizedText1 = text1.toLowerCase();
  const normalizedText2 = text2.toLowerCase();
  
  // Generate n-grams for the second text (used as comparison base)
  const words2 = normalizedText2.split(/\s+/);
  const ngrams: Record<string, number> = {};
  
  // We'll use different n-gram sizes to catch different length matches
  for (let ngramSize = 3; ngramSize <= 8; ngramSize++) {
    for (let i = 0; i <= words2.length - ngramSize; i++) {
      const ngram = words2.slice(i, i + ngramSize).join(' ');
      if (ngram.length >= minLength) {
        ngrams[ngram] = i;
      }
    }
  }
  
  // Find matches in the first text
  const words1 = normalizedText1.split(/\s+/);
  
  for (let ngramSize = 8; ngramSize >= 3; ngramSize--) {
    for (let i = 0; i <= words1.length - ngramSize; i++) {
      const ngram = words1.slice(i, i + ngramSize).join(' ');
      
      if (ngrams[ngram] !== undefined && ngram.length >= minLength) {
        // Found a match
        const startIndex = text1.indexOf(ngram);
        if (startIndex !== -1) {
          const endIndex = startIndex + ngram.length;
          
          // Calculate a match percentage (arbitrary formula for demonstration)
          const matchPercentage = Math.min(100, Math.floor((ngram.length / 20) * 100));
          
          // Check for overlap with existing matches
          const isOverlapping = matches.some(match => 
            (startIndex >= match.startIndex && startIndex < match.endIndex) ||
            (endIndex > match.startIndex && endIndex <= match.endIndex)
          );
          
          if (!isOverlapping) {
            matches.push({
              text: ngram,
              startIndex,
              endIndex,
              matchPercentage
            });
          }
        }
      }
    }
  }
  
  return matches;
};
