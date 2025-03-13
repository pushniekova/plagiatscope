
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
  // Avoid counting overlapping regions twice
  const matchRanges = matches.map(match => ({
    startIndex: match.startIndex, 
    endIndex: match.endIndex
  }));
  const nonOverlappingLength = calculateNonOverlappingLength(text, matchRanges);
  const percentageMatched = (nonOverlappingLength / text.length) * 100;
  
  console.log(`Non-overlapping matched content: ${nonOverlappingLength} characters (${percentageMatched.toFixed(2)}%)`);
  
  // Add weight from external sources
  const externalSourceWeight = externalSources.reduce((sum, source) => sum + source.similarity, 0);
  
  // Also get score from Plagium-inspired method
  const plagiumScore = await getPlagiarismScore({ text });
  const plagiumScoreWeighted = Math.round(plagiumScore * 100);
  
  console.log(`Plagium-inspired score: ${plagiumScoreWeighted}%`);
  
  // Calculate overall score with a weighted formula
  // Give more weight to the original method but boost with Plagium-inspired score
  let overallScore = Math.round(percentageMatched * 0.5); // 50% from direct match analysis
  
  // Add external source weight (up to 20% of the score)
  overallScore += Math.min(20, Math.round(externalSourceWeight * 10));
  
  // Add web search component (up to 10% of the score)
  const webSearchBoost = externalSources.length > 0 ? 
    Math.min(10, Math.round(externalSources[0].similarity * 20)) : 0;
  overallScore += webSearchBoost;
  
  // Add Plagium-inspired score component (up to 20% of the score)
  overallScore += Math.min(20, plagiumScoreWeighted);
  
  // Ensure score is between 0 and 100
  overallScore = Math.min(100, Math.max(0, overallScore));
  
  console.log(`Final plagiarism score: ${overallScore}%`);
  
  return overallScore;
};
