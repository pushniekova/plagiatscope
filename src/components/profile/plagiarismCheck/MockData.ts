
import { Match } from '@/components/results/types';

// Generate mock matches for demo purposes
export const generateMockMatches = (text: string): Match[] => {
  if (!text || text.length < 100) {
    return [];
  }
  
  // Create a few random matches
  const matches: Match[] = [];
  
  // First match at the beginning
  const firstMatchLength = Math.min(50, Math.floor(text.length * 0.2));
  matches.push({
    startIndex: 0,
    endIndex: firstMatchLength,
    text: text.substring(0, firstMatchLength),
    matchPercentage: 90,
    source: 'Academia Educational Resources',
    sourceUrl: 'https://example.com/source1'
  });
  
  // Middle match
  if (text.length > 200) {
    const middleStart = Math.floor(text.length * 0.4);
    const middleLength = Math.min(70, Math.floor(text.length * 0.15));
    matches.push({
      startIndex: middleStart,
      endIndex: middleStart + middleLength,
      text: text.substring(middleStart, middleStart + middleLength),
      matchPercentage: 85,
      source: 'Research Journal',
      sourceUrl: 'https://example.com/source2'
    });
  }
  
  // End match
  if (text.length > 300) {
    const endStart = Math.max(text.length - 100, Math.floor(text.length * 0.7));
    const endLength = Math.min(60, Math.floor(text.length * 0.1));
    matches.push({
      startIndex: endStart,
      endIndex: endStart + endLength,
      text: text.substring(endStart, endStart + endLength),
      matchPercentage: 75,
      source: 'Online Encyclopedia',
      sourceUrl: 'https://example.com/source3'
    });
  }
  
  return matches;
};
