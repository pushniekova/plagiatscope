
import { Match, ExternalSource } from '@/components/results/types';
import { analyzePlagiarism } from '@/lib/textProcessing';
import { checkResultsService } from '@/lib/services/checkResultsService';

interface AnalysisResult {
  overallScore: number;
  matches: Match[];
  externalSources: ExternalSource[];
}

export const analysisService = {
  async performAnalysis(text: string, documentName: string, userId: string | null): Promise<AnalysisResult> {
    // Perform plagiarism analysis with our improved algorithm
    const results = await analyzePlagiarism(text);
    
    // Save the check results to the database if user is logged in
    if (userId) {
      try {
        await checkResultsService.saveCheckResult({
          user_id: userId,
          document_name: documentName,
          text_content: text,
          overall_score: results.overallScore,
          matches: results.matches,
          external_sources: results.externalSources,
          created_at: new Date().toISOString(),
          status: 'completed'
        });
        
        console.log('Successfully saved check result to database');
      } catch (saveError) {
        console.error('Error saving check result:', saveError);
        // Continue with the analysis even if saving to DB fails
      }
    }
    
    return results;
  }
};
