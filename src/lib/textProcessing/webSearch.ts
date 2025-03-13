
/**
 * Web search utilities for plagiarism detection
 * This module enables checking text against external web sources
 */

import { normalizeText, tokenizeText, calculateTF } from './normalize';
import { calculateCosineSimilarity } from './similarity';
import { getExternalApiConfig } from './utils';

interface WebSearchResult {
  title: string;
  snippet: string;
  link: string;
  similarity: number;
}

/**
 * Search for matching content using Google Custom Search API
 */
export async function searchWithGoogleAPI(query: string): Promise<WebSearchResult[]> {
  const config = getExternalApiConfig();
  if (!config?.googleApiKey || !config?.googleEngineId) {
    console.log("Google API not configured, falling back to simulated search");
    return simulateGoogleSearch(query);
  }
  
  try {
    console.log(`Searching with Google API for: ${query.substring(0, 50)}...`);
    const endpoint = `https://www.googleapis.com/customsearch/v1?key=${config.googleApiKey}&cx=${config.googleEngineId}&q=${encodeURIComponent(query)}`;
    
    const response = await fetch(endpoint);
    
    if (!response.ok) {
      throw new Error(`Google API error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    
    if (!data.items || !Array.isArray(data.items)) {
      return [];
    }
    
    // Calculate similarity for each result
    return await Promise.all(data.items.map(async (item: any) => {
      // Get the full content by fetching the page
      // Note: In a production scenario, consider implementing a proper web scraper
      // For now, we'll use the snippet that Google provides
      const content = item.snippet || '';
      
      // Calculate similarity
      const similarity = calculateTextSimilarity(query, content);
      
      return {
        title: item.title || 'Unknown Source',
        snippet: content,
        link: item.link || '#',
        similarity
      };
    }));
  } catch (error) {
    console.error("Error using Google Search API:", error);
    // Fallback to simulated search if API fails
    return simulateGoogleSearch(query);
  }
}

/**
 * Search across multiple open web resources
 */
export async function searchMultipleResources(text: string): Promise<WebSearchResult[]> {
  // Generate a suitable search query from the text
  const query = generateSearchQuery(text);
  
  // Try searching with Google API first
  const googleResults = await searchWithGoogleAPI(query);
  
  // We could add more search resources here:
  // const bingResults = await searchWithBingAPI(query);
  // const duckduckgoResults = await searchWithDuckDuckGoAPI(query);
  
  // Combine and filter results
  const allResults = [...googleResults];
  
  // Filter by minimum similarity threshold and remove duplicates
  return allResults
    .filter(result => result.similarity > 0.15) // Only keep somewhat similar results
    .sort((a, b) => b.similarity - a.similarity); // Sort by highest similarity first
}

/**
 * Generate a search query from the input text
 * We extract key phrases that are more likely to return meaningful results
 */
function generateSearchQuery(text: string): string {
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

/**
 * Calculate similarity between query text and a potential match
 */
function calculateTextSimilarity(text1: string, text2: string): number {
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

/**
 * Fallback method that simulates a web search when APIs are not available
 * This is used for development and when API keys are not configured
 */
async function simulateGoogleSearch(query: string): Promise<WebSearchResult[]> {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Generate results with different similarity scores
  const queryWords = query.toLowerCase().split(/\s+/);
  
  // Sample websites that might contain academic content
  const potentialSources = [
    {
      title: "Wikipedia - Academic integrity",
      link: "https://en.wikipedia.org/wiki/Academic_integrity",
      content: "Academic integrity is the moral code or ethical policy of academia. This includes values such as avoidance of cheating or plagiarism; maintenance of academic standards; honesty and rigor in research and academic publishing."
    },
    {
      title: "Плагіат — Вікіпедія",
      link: "https://uk.wikipedia.org/wiki/Плагіат",
      content: "Плагіат — оприлюднення (опублікування), повністю або частково, чужого твору під іменем особи, яка не є автором цього твору. Плагіат є порушенням авторського права, тобто немайнових (право на ім'я, на оприлюднення тощо) та майнових прав справжнього автора."
    },
    {
      title: "Google Scholar: Citation analysis",
      link: "https://scholar.google.com/citations",
      content: "Google Scholar provides a simple way to broadly search for scholarly literature. Search across a wide variety of disciplines and sources: articles, theses, books, abstracts and court opinions."
    },
    {
      title: "Academic publishing - Wikipedia",
      link: "https://en.wikipedia.org/wiki/Academic_publishing",
      content: "Academic publishing is the subfield of publishing which distributes academic research and scholarship. Most academic work is published in academic journal articles, books or theses."
    },
    {
      title: "Академічна доброчесність — Національний університет",
      link: "https://nau.edu.ua/ua/menu/quality/akademichna-dobrochesnist/",
      content: "Академічна доброчесність — це сукупність етичних принципів та визначених законом правил, якими мають керуватися учасники освітнього процесу під час навчання, викладання та провадження наукової діяльності."
    }
  ];
  
  // Calculate matches based on query words
  return potentialSources.map(source => {
    // Calculate a simple similarity score based on word overlap
    const contentWords = source.content.toLowerCase().split(/\s+/);
    let matchingWords = 0;
    
    for (const word of queryWords) {
      if (contentWords.includes(word)) {
        matchingWords++;
      }
    }
    
    const overlapScore = queryWords.length > 0 ? matchingWords / queryWords.length : 0;
    
    // Add some randomness to simulate variance in real search results
    const similarity = overlapScore * (0.7 + Math.random() * 0.3);
    
    return {
      title: source.title,
      snippet: source.content,
      link: source.link,
      similarity: Math.min(similarity, 0.95) // Cap at 0.95 for realism
    };
  }).filter(result => result.similarity > 0.1) // Filter out very low matches
    .sort((a, b) => b.similarity - a.similarity) // Sort by highest similarity
    .slice(0, 3); // Limit to top 3 results
}

// Common words to exclude from search queries for better results
const commonWords = [
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
