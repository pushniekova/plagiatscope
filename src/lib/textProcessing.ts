
// This module provides text processing utilities for plagiarism detection

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
 * Simulates checking text against external sources
 * In a real implementation, this would call external APIs or search engines
 */
export const checkExternalSources = async (text: string): Promise<Array<{
  source: string;
  similarity: number;
  matchedText: string;
  sourceUrl: string;
}>> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // For demo purposes: simulate finding matches in external sources
  const normalizedText = normalizeText(text);
  const textLength = normalizedText.length;
  
  // Skip very short text
  if (textLength < 30) {
    return [];
  }
  
  // Simulate different external sources with varying degrees of similarity
  const simulatedSources = [
    {
      name: 'Wikipedia',
      baseUrl: 'https://uk.wikipedia.org/wiki/',
      paths: ['Плагіат', 'Авторське_право', 'Інтелектуальна_власність'],
      maxSimilarity: 0.85
    },
    {
      name: 'Наукова база',
      baseUrl: 'https://science-database.ua/article/',
      paths: ['plagiarism-detection', 'text-analysis', 'academic-integrity'],
      maxSimilarity: 0.75
    },
    {
      name: 'Освітній портал',
      baseUrl: 'https://education-portal.ua/resources/',
      paths: ['student-guide', 'academic-writing', 'research-ethics'],
      maxSimilarity: 0.65
    }
  ];
  
  // Generate random matches based on text length
  const results = [];
  const numberOfMatches = Math.min(
    simulatedSources.length, 
    Math.max(1, Math.floor(textLength / 200))
  );
  
  for (let i = 0; i < numberOfMatches; i++) {
    const source = simulatedSources[i];
    const pathIndex = Math.floor(Math.random() * source.paths.length);
    const path = source.paths[pathIndex];
    
    // Simulate extracting a portion of the user's text as a "match"
    const startIndex = Math.floor(Math.random() * (textLength - 50));
    const excerptLength = Math.min(Math.floor(Math.random() * 100) + 50, textLength - startIndex);
    const matchedText = text.substring(startIndex, startIndex + excerptLength);
    
    // Simulate a similarity score
    const baseSimilarity = source.maxSimilarity;
    const randomVariation = Math.random() * 0.3;
    const similarity = Math.max(0.4, Math.min(0.95, baseSimilarity - randomVariation));
    
    results.push({
      source: `${source.name} - ${path.replace(/_/g, ' ')}`,
      similarity: parseFloat(similarity.toFixed(2)),
      matchedText,
      sourceUrl: `${source.baseUrl}${path}`
    });
  }
  
  // Sort by similarity (highest first)
  return results.sort((a, b) => b.similarity - a.similarity);
};

/**
 * For demo purposes: Analyze text and return plagiarism detection results
 * In a real application, this would integrate with proper plagiarism detection services
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
  // This is a more advanced mock implementation that simulates real plagiarism checking
  const textLength = text.length;
  
  // For demo: if text is very short, return no plagiarism
  if (textLength < 30) {
    return {
      overallScore: 0,
      matches: [],
      externalSources: []
    };
  }
  
  // Check external sources (this would be a real API call in a production app)
  const externalSources = await checkExternalSources(text);
  
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
      source: `Джерело ${i + 1} (симульоване)`,
      sourceUrl: i % 2 === 0 ? `https://example${i}.com/article-${i}` : undefined
    });
  }
  
  // Add matches from external sources to our general matches array
  externalSources.forEach((source, index) => {
    // Find the start index of the matched text in the original text
    const startIndex = text.indexOf(source.matchedText);
    if (startIndex !== -1) {
      const endIndex = startIndex + source.matchedText.length;
      matches.push({
        text: source.matchedText,
        startIndex,
        endIndex,
        matchPercentage: Math.round(source.similarity * 100),
        source: source.source,
        sourceUrl: source.sourceUrl
      });
    }
  });
  
  // Calculate overall score based on matched text percentage and external source similarities
  let totalMatchedChars = matches.reduce((sum, match) => sum + (match.endIndex - match.startIndex), 0);
  // Avoid counting overlapping regions twice
  totalMatchedChars = Math.min(totalMatchedChars, textLength);
  
  // Add weight from external sources
  const externalSourceWeight = externalSources.reduce((sum, source) => sum + source.similarity, 0);
  
  // Calculate overall score
  let overallScore = Math.round((totalMatchedChars / textLength) * 70);
  // Add external source weight (up to 30% of the score)
  overallScore += Math.min(30, Math.round(externalSourceWeight * 10));
  // Ensure score is between 0 and 100
  overallScore = Math.min(100, Math.max(0, overallScore));
  
  return {
    overallScore,
    matches,
    externalSources
  };
};
