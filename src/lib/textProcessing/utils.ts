
/**
 * Common utilities for text processing 
 * Used across different plagiarism detection approaches
 */

// Utility function to simulate hashing text (like in Plagiarism-Checker)
export function hashText(text: string): string {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    const char = text.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash.toString(16);
}

// Calculate total length of non-overlapping matched text segments (from Plagiarism-Checker)
export function calculateNonOverlappingLength(ranges: {start: number, end: number}[], textLength: number): number {
  if (ranges.length === 0) return 0;
  
  // Sort ranges by start index - Fixed property name from startIndex to start
  ranges.sort((a, b) => a.start - b.start);
  
  let totalLength = 0;
  let currentEnd = ranges[0].start;
  
  for (const range of ranges) {
    if (range.start > currentEnd) {
      // Non-overlapping range
      totalLength += range.end - range.start;
      currentEnd = range.end;
    } else if (range.end > currentEnd) {
      // Partially overlapping range
      totalLength += range.end - currentEnd;
      currentEnd = range.end;
    }
    // Completely overlapping ranges are ignored
  }
  
  return Math.min(totalLength, textLength);
}

// Check if the external API is configured via browser storage
export function isExternalApiConfigured(): boolean {
  try {
    const apiConfig = localStorage.getItem('plagiarismCheckConfig');
    if (!apiConfig) return false;
    
    const config = JSON.parse(apiConfig);
    return !!config.groupToken && !!config.authorEmail;
  } catch (error) {
    console.error('Error checking external API configuration:', error);
    return false;
  }
}

// Check if the personal API token is configured
export function isPersonalApiConfigured(): boolean {
  try {
    const apiConfig = localStorage.getItem('plagiarismCheckConfig');
    if (!apiConfig) return false;
    
    const config = JSON.parse(apiConfig);
    return !!config.personalApiToken;
  } catch (error) {
    console.error('Error checking personal API configuration:', error);
    return false;
  }
}

// Get the external API configuration from browser storage
export function getExternalApiConfig(): { 
  groupToken: string; 
  authorEmail: string;
  personalApiToken?: string; 
} | null {
  try {
    const apiConfig = localStorage.getItem('plagiarismCheckConfig');
    if (!apiConfig) return null;
    
    return JSON.parse(apiConfig);
  } catch (error) {
    console.error('Error getting external API configuration:', error);
    return null;
  }
}

// Save external API configuration to browser storage
export function saveExternalApiConfig(config: { 
  groupToken: string; 
  authorEmail: string;
  personalApiToken?: string;
}): void {
  try {
    localStorage.setItem('plagiarismCheckConfig', JSON.stringify(config));
  } catch (error) {
    console.error('Error saving external API configuration:', error);
  }
}
