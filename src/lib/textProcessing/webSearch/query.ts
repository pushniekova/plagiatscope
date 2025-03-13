
/**
 * Query generation for web searches
 */

import { normalizeText, tokenizeText } from '../normalize';
import { commonWords } from './utils';

/**
 * Generate a search query from the input text
 * We extract key phrases that are more likely to return meaningful results
 */
export function generateSearchQuery(text: string): string {
  // Normalize and tokenize the text
  const normalizedText = normalizeText(text);
  const tokens = tokenizeText(normalizedText);
  
  // Select meaningful words (not too short, not too common)
  const significantWords = tokens
    .filter(token => token.length > 4) // Only use words with 5+ characters
    .filter(token => !commonWords.includes(token.toLowerCase())) // Filter out common words
    .slice(0, 15); // Limit to 15 words
  
  // Create phrases by grouping 3-4 adjacent words when possible
  const phrases = [];
  for (let i = 0; i < significantWords.length; i += 3) {
    const endIdx = Math.min(i + 3, significantWords.length);
    const phrase = significantWords.slice(i, endIdx).join(' ');
    if (phrase) phrases.push(`"${phrase}"`);
    
    if (phrases.length >= 3) break; // Limit to 3 phrases for better results
  }
  
  // Construct the final query
  const finalQuery = phrases.length > 0 
    ? phrases.join(' ') 
    : significantWords.slice(0, 10).join(' '); // Fallback to individual words
    
  console.log(`Generated search query: ${finalQuery}`);
  return finalQuery;
}
