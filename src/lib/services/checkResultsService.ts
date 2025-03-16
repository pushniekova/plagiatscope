
import { supabase } from './supabaseClient';
import { Match, ExternalSource } from '@/components/results/types';

export interface CheckResultData {
  id?: string;
  user_id: string;
  document_name: string;
  text_content: string;
  overall_score: number;
  matches: Match[];
  external_sources: ExternalSource[];
  created_at?: string;
}

export const checkResultsService = {
  // Save a new check result to the database
  async saveCheckResult(resultData: CheckResultData): Promise<{ id: string } | null> {
    try {
      // Prepare the data for the check_results table
      const { data, error } = await supabase
        .from('check_results')
        .insert([{
          user_id: resultData.user_id,
          document_name: resultData.document_name,
          text_content: resultData.text_content,
          overall_score: resultData.overall_score,
          created_at: new Date().toISOString()
        }])
        .select('id')
        .single();

      if (error) {
        console.error('Error saving check result:', error);
        return null;
      }

      if (!data || !data.id) {
        console.error('Failed to get ID from inserted check result');
        return null;
      }

      // Save matches if there are any
      if (resultData.matches && resultData.matches.length > 0) {
        const matchesData = resultData.matches.map(match => ({
          check_id: data.id,
          text: match.text,
          start_index: match.startIndex,
          end_index: match.endIndex,
          match_percentage: match.matchPercentage,
          source: match.source,
          source_url: match.sourceUrl || null
        }));

        const { error: matchesError } = await supabase
          .from('check_matches')
          .insert(matchesData);

        if (matchesError) {
          console.error('Error saving matches:', matchesError);
        }
      }

      // Save external sources if there are any
      if (resultData.external_sources && resultData.external_sources.length > 0) {
        const sourcesData = resultData.external_sources.map(source => ({
          check_id: data.id,
          source: source.source,
          similarity: source.similarity,
          matched_text: source.matchedText,
          source_url: source.sourceUrl
        }));

        const { error: sourcesError } = await supabase
          .from('external_sources')
          .insert(sourcesData);

        if (sourcesError) {
          console.error('Error saving external sources:', sourcesError);
        }
      }

      return { id: data.id };
    } catch (error) {
      console.error('Exception saving check result:', error);
      return null;
    }
  },

  // Get all check results for a user
  async getUserCheckResults(userId: string): Promise<CheckResultData[]> {
    try {
      const { data, error } = await supabase
        .from('check_results')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching user check results:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Exception fetching user check results:', error);
      return [];
    }
  },

  // Get a specific check result with all related data
  async getCheckResultDetails(checkId: string): Promise<CheckResultData | null> {
    try {
      // Get the base check result
      const { data: checkData, error: checkError } = await supabase
        .from('check_results')
        .select('*')
        .eq('id', checkId)
        .single();

      if (checkError || !checkData) {
        console.error('Error fetching check result:', checkError);
        return null;
      }

      // Get all matches for this check
      const { data: matchesData, error: matchesError } = await supabase
        .from('check_matches')
        .select('*')
        .eq('check_id', checkId);

      if (matchesError) {
        console.error('Error fetching matches:', matchesError);
      }

      // Get all external sources for this check
      const { data: sourcesData, error: sourcesError } = await supabase
        .from('external_sources')
        .select('*')
        .eq('check_id', checkId);

      if (sourcesError) {
        console.error('Error fetching external sources:', sourcesError);
      }

      // Transform the data to match our application models
      const matches: Match[] = (matchesData || []).map(match => ({
        startIndex: match.start_index,
        endIndex: match.end_index,
        text: match.text,
        matchPercentage: match.match_percentage,
        source: match.source,
        sourceUrl: match.source_url
      }));

      const externalSources: ExternalSource[] = (sourcesData || []).map(source => ({
        source: source.source,
        similarity: source.similarity,
        matchedText: source.matched_text,
        sourceUrl: source.source_url
      }));

      return {
        id: checkData.id,
        user_id: checkData.user_id,
        document_name: checkData.document_name,
        text_content: checkData.text_content,
        overall_score: checkData.overall_score,
        created_at: checkData.created_at,
        matches,
        external_sources: externalSources
      };
    } catch (error) {
      console.error('Exception fetching check result details:', error);
      return null;
    }
  },

  // Delete a check result and all related data
  async deleteCheckResult(checkId: string): Promise<boolean> {
    try {
      // Delete matches
      await supabase
        .from('check_matches')
        .delete()
        .eq('check_id', checkId);

      // Delete external sources
      await supabase
        .from('external_sources')
        .delete()
        .eq('check_id', checkId);

      // Delete the check result
      const { error } = await supabase
        .from('check_results')
        .delete()
        .eq('id', checkId);

      if (error) {
        console.error('Error deleting check result:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Exception deleting check result:', error);
      return false;
    }
  }
};
