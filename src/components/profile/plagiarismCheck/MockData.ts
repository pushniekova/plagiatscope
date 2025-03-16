
import { CheckMatch } from '@/types/database';

// Helper function to generate mock plagiarism matches based on the input text
export const generateMockMatches = (text: string): CheckMatch[] => {
  if (!text || text.length === 0) return [];
  
  return [
    {
      id: '1',
      text: text.substring(0, Math.min(text.length, 100)),
      start_index: 0,
      end_index: Math.min(text.length, 100),
      match_percentage: 85,
      source: 'Source 1',
      source_url: 'https://example.com/source1'
    }
  ];
};
