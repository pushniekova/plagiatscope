
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { checkHistoryService } from '@/lib/services/supabaseClient';
import { checkResultsService } from '@/lib/services/checkResultsService'; 
import { useAuth } from '@clerk/clerk-react';
import { useToast } from './use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { CheckHistoryItem } from '@/components/profile/history/types';
import { PlagiarismCheck } from '@/types/database';

// Helper function to convert database model to view model
const mapToCheckHistoryItem = (item: any): CheckHistoryItem => {
  return {
    id: item.id || '',
    date: item.created_at || new Date().toISOString(),
    documentName: item.document_name || '',
    status: item.status || 'completed',
    score: item.overall_score || item.score || 0,
    position: item.position
  };
};

export function useChecksHistory() {
  const { userId } = useAuth();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { t } = useLanguage();
  
  // Fetch all checks for the current user
  const { 
    data: checksHistory, 
    isLoading, 
    error, 
    refetch 
  } = useQuery({
    queryKey: ['checksHistory', userId],
    queryFn: async () => {
      if (!userId) return [];
      
      // Try to get check results from our new service
      try {
        const results = await checkResultsService.getUserCheckResults(userId);
        if (results && results.length > 0) {
          // Transform to CheckHistoryItem format
          return results.map(mapToCheckHistoryItem);
        }
      } catch (error) {
        console.error('Error fetching from checkResultsService:', error);
      }
      
      // Fall back to the original service if the new one fails
      const checks = await checkHistoryService.getUserChecks(userId);
      return checks.map(mapToCheckHistoryItem);
    },
    enabled: !!userId,
  });

  // Get detailed information about a specific check
  const useCheckDetails = (checkId: string) => {
    return useQuery({
      queryKey: ['checkDetails', checkId],
      queryFn: async () => {
        try {
          const result = await checkResultsService.getCheckResultDetails(checkId);
          if (result) {
            return result;
          }
        } catch (error) {
          console.error('Error fetching check details from new service:', error);
        }
        
        // Fall back to the original service
        return checkHistoryService.getCheckDetails(checkId);
      },
      enabled: !!checkId,
    });
  };

  // Get results of a specific check
  const useCheckResults = (checkId: string) => {
    return useQuery({
      queryKey: ['checkResults', checkId],
      queryFn: async () => {
        try {
          const result = await checkResultsService.getCheckResultDetails(checkId);
          if (result) {
            return {
              score: result.overall_score,
              matches: result.matches,
              external_sources: result.external_sources
            };
          }
        } catch (error) {
          console.error('Error fetching check results from new service:', error);
        }
        
        // Fall back to the original service
        return checkHistoryService.getCheckResults(checkId);
      },
      enabled: !!checkId,
    });
  };

  // Create a new check
  const createCheckMutation = useMutation({
    mutationFn: async ({ 
      documentName, 
      textContent 
    }: { 
      documentName: string; 
      textContent: string 
    }) => {
      if (!userId) throw new Error('User not authenticated');
      
      // Try to use the new service first
      try {
        const result = await checkResultsService.saveCheckResult({
          user_id: userId,
          document_name: documentName,
          text_content: textContent,
          overall_score: 0, // Will be updated after analysis
          matches: [],
          external_sources: []
        });
        
        if (result) {
          return result;
        }
      } catch (error) {
        console.error('Error creating check with new service:', error);
      }
      
      // Fall back to the original service
      return checkHistoryService.createCheck(userId, documentName, textContent);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['checksHistory'] });
      toast({
        title: t('check.fileUploaded'),
        description: t('check.fileLoadedMessage'),
      });
    },
    onError: () => {
      toast({
        title: t('check.analysisError'),
        description: t('check.analysisErrorMessage'),
        variant: "destructive",
      });
    }
  });

  // Delete a check
  const deleteCheckMutation = useMutation({
    mutationFn: async (checkId: string) => {
      // Try with the new service first
      try {
        const result = await checkResultsService.deleteCheckResult(checkId);
        if (result) {
          return result;
        }
      } catch (error) {
        console.error('Error deleting check with new service:', error);
      }
      
      // Fall back to the original service
      return checkHistoryService.deleteCheck(checkId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['checksHistory'] });
      toast({
        title: t('common.success'),
        description: t('profile.history.deleteSuccess'),
      });
    },
    onError: () => {
      toast({
        title: t('common.error'),
        description: t('profile.history.deleteError'),
        variant: "destructive",
      });
    }
  });

  return {
    checksHistory: checksHistory as CheckHistoryItem[] || [],
    isLoading,
    error,
    refetch,
    useCheckDetails,
    useCheckResults,
    createCheck: createCheckMutation.mutate,
    deleteCheck: deleteCheckMutation.mutate,
    isCreating: createCheckMutation.isPending,
    isDeleting: deleteCheckMutation.isPending
  };
}
