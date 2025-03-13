
// This is a simplified version for the frontend demo
// In a real implementation, these functions would be more sophisticated
// and would interact with a backend service

/**
 * Simulates text normalization (lowercase, punctuation removal)
 */
export const normalizeText = (text: string): string => {
  return text.toLowerCase().replace(/[^\w\s]/g, '');
};

/**
 * Simulates tokenization (splitting text into words)
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
 * Simulates a simple hash function for demo purposes
 */
export const simpleHash = (text: string): string => {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    const char = text.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash.toString(16);
};

/**
 * For demo purposes: Simulates analyzing text and returning potentially plagiarized sections
 */
export const analyzePlagiarism = (text: string): {
  overallScore: number;
  matches: Array<{
    text: string;
    startIndex: number;
    endIndex: number;
    matchPercentage: number;
    source: string;
  }>;
} => {
  // This is a mock implementation
  // In a real application, this would send the text to a backend service
  
  const textLength = text.length;
  
  // For demo: if text is very short, return no plagiarism
  if (textLength < 30) {
    return {
      overallScore: 0,
      matches: []
    };
  }
  
  // Create some random "matches" for demo purposes
  const matches = [];
  const numberOfMatches = Math.min(3, Math.floor(textLength / 100));
  
  for (let i = 0; i < numberOfMatches; i++) {
    const startIndex = Math.floor(Math.random() * (textLength - 30));
    const length = Math.min(Math.floor(Math.random() * 50) + 20, textLength - startIndex);
    const endIndex = startIndex + length;
    
    matches.push({
      text: text.substring(startIndex, endIndex),
      startIndex,
      endIndex,
      matchPercentage: Math.floor(Math.random() * 40) + 60, // 60-100%
      source: `Source ${i + 1} (simulated)`
    });
  }
  
  // Calculate overall score based on matched text percentage
  const totalMatchedChars = matches.reduce((sum, match) => sum + (match.endIndex - match.startIndex), 0);
  const overallScore = Math.min(100, Math.round((totalMatchedChars / textLength) * 100));
  
  return {
    overallScore,
    matches
  };
};
