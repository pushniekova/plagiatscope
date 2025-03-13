
/**
 * Core plagiarism detection algorithm adapted from the Plagiarism-Checker algorithm
 * https://github.com/architshukla/Plagiarism-Checker
 * 
 * Also incorporates elements from Plagium
 * https://github.com/ceifa/plagium
 */

import { analyzeDatabaseSources } from './analyzers/databaseAnalyzer';
import { analyzeWebSources } from './analyzers/webAnalyzer';
import { calculateOverallScore } from './analyzers/scoreCalculator';

/**
 * Main plagiarism analysis function that coordinates the analysis process
 * by utilizing specialized analyzer modules
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
  // Skip very short texts
  if (text.length < 30) {
    return {
      overallScore: 0,
      matches: [],
      externalSources: []
    };
  }
  
  console.log("Starting plagiarism analysis for text of length:", text.length);
  
  // Step 1: Analyze against database sources
  const databaseMatches = analyzeDatabaseSources(text);
  
  // Step 2: Analyze against web sources
  const { externalSources, webMatches } = await analyzeWebSources(text);
  
  // Step 3: Combine all matches
  const allMatches = [...databaseMatches, ...webMatches];
  
  // Step 4: Calculate the overall plagiarism score
  const overallScore = await calculateOverallScore(text, allMatches, externalSources);
  
  return {
    overallScore,
    matches: allMatches,
    externalSources
  };
};
