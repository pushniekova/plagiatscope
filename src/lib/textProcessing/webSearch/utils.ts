
/**
 * Utility functions for web searches
 */

import { normalizeText, tokenizeText, calculateTF } from '../normalize';
import { calculateCosineSimilarity } from '../similarity';
import { WebSearchResult } from './types';

/**
 * Process and score search results based on text similarity
 */
export function processAndScoreResults(results: any[], originalText: string): WebSearchResult[] {
  return results.map(result => {
    const title = result.title || "Unknown Title";
    const snippet = result.snippet || result.description || "";
    const link = result.link || result.url || "#";
    
    // Calculate actual similarity between original text and the snippet
    const similarity = calculateTextSimilarity(originalText, snippet);
    
    return {
      title,
      snippet,
      link,
      similarity
    };
  })
  .filter(result => result.similarity > 0.1) // Filter out very low similarity results
  .sort((a, b) => b.similarity - a.similarity); // Sort by similarity
}

/**
 * Calculate similarity between query text and a potential match
 */
export function calculateTextSimilarity(text1: string, text2: string): number {
  // Normalize and tokenize
  const normalizedText1 = normalizeText(text1);
  const normalizedText2 = normalizeText(text2);
  
  const tokens1 = tokenizeText(normalizedText1);
  const tokens2 = tokenizeText(normalizedText2);
  
  // Calculate term frequency vectors
  const tf1 = calculateTF(tokens1);
  const tf2 = calculateTF(tokens2);
  
  // Calculate cosine similarity
  return calculateCosineSimilarity(tf1, tf2);
}

// Common words to exclude from search queries for better results
export const commonWords = [
  "the", "and", "that", "have", "for", "not", "with", "you", "this", "but",
  "his", "from", "they", "she", "will", "would", "there", "their", "what",
  "about", "which", "when", "make", "like", "time", "just", "know", "take",
  "into", "year", "your", "good", "some", "could", "them", "than", "then",
  "look", "only", "come", "over", "think", "also", "back", "after", "use",
  "two", "how", "our", "work", "first", "well", "even", "want", "because",
  "any", "these", "give", "day", "most", "було", "цей", "був", "вона", "так",
  "його", "того", "який", "цього", "якщо", "може", "для", "щоб", "але",
  "коли", "при", "або", "вже", "бути", "такі", "можна", "треба"
];
