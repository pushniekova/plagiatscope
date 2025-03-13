
/**
 * Score calculator module for plagiarism detection
 * Calculates the final plagiarism score based on various metrics
 */

import { calculateNonOverlappingLength } from '../utils';
import { getPlagiarismScore } from '../plagium';

interface Match {
  startIndex: number;
  endIndex: number;
  text?: string;
  matchPercentage?: number;
  source?: string;
  sourceUrl?: string;
}

interface ExternalSource {
  source: string;
  similarity: number;
  matchedText?: string;
  sourceUrl?: string;
}

/**
 * Calculate overall plagiarism score based on matches and external sources
 */
export const calculateOverallScore = async (
  text: string,
  matches: Match[],
  externalSources: ExternalSource[]
): Promise<number> => {
  // Skip very short texts
  if (text.length < 30) return 0;
  
  // Avoid counting overlapping regions twice
  const matchRanges = matches.map(match => ({
    startIndex: match.startIndex, 
    endIndex: match.endIndex
  }));
  const nonOverlappingLength = calculateNonOverlappingLength(text, matchRanges);
  
  // Calculate the percentage of text that matches sources
  const matchedLength = Math.min(nonOverlappingLength, text.length);
  const percentageMatched = (matchedLength / text.length) * 100;
  
  console.log(`Non-overlapping matched content: ${matchedLength} characters (${percentageMatched.toFixed(2)}%)`);
  
  // External sources weight - real external sources have higher weight
  let externalSourceWeight = 0;
  const hasGoogleResults = externalSources.some(source => 
    source.sourceUrl && !source.sourceUrl.includes('console.cloud.google.com')
  );
  
  // Calculate weighted external sources score
  if (externalSources.length > 0) {
    // If using real Google results, give them more weight
    const weightMultiplier = hasGoogleResults ? 1.5 : 0.7;
    
    externalSourceWeight = externalSources.reduce((sum, source) => {
      // Higher weight for high similarity sources
      const sourceWeight = source.similarity * weightMultiplier;
      return sum + sourceWeight;
    }, 0);
    
    // Cap the external source weight 
    externalSourceWeight = Math.min(50, externalSourceWeight * 100);
    console.log(`External sources weight: ${externalSourceWeight.toFixed(2)}`);
  }
  
  // Also get score from Plagium-inspired method
  const plagiumScore = await getPlagiarismScore({ text });
  const plagiumScoreWeighted = Math.round(plagiumScore * 100);
  
  console.log(`Plagium-inspired score: ${plagiumScoreWeighted}%`);
  
  // Calculate overall score with a weighted formula
  let overallScore = 0;
  
  // 50% from direct match analysis
  overallScore += Math.round(percentageMatched * 0.5); 
  
  // Up to 30% from external sources
  overallScore += Math.min(30, Math.round(externalSourceWeight * 0.6));
  
  // Up to 20% from Plagium-inspired score
  overallScore += Math.min(20, plagiumScoreWeighted);
  
  // Ensure score is between 0 and 100
  overallScore = Math.min(100, Math.max(0, overallScore));
  
  console.log(`Final plagiarism score: ${overallScore}%`);
  
  return overallScore;
};
