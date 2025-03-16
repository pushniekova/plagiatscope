
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { checkHistoryService } from '@/lib/services/supabaseClient';
import { useAuth } from '@clerk/clerk-react';
import { useToast } from './use-toast';
import { useLanguage } from '@/contexts/LanguageContext';

export function useChecksHistory() {
  const { userId } = useAuth();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { t } = useLanguage();
  
  // Отримання всіх перевірок користувача
  const { 
    data: checksHistory, 
    isLoading, 
    error, 
    refetch 
  } = useQuery({
    queryKey: ['checksHistory', userId],
    queryFn: () => userId ? checkHistoryService.getUserChecks(userId) : Promise.resolve([]),
    enabled: !!userId,
  });

  // Отримання деталей перевірки
  const useCheckDetails = (checkId: string) => {
    return useQuery({
      queryKey: ['checkDetails', checkId],
      queryFn: () => checkHistoryService.getCheckDetails(checkId),
      enabled: !!checkId,
    });
  };

  // Отримання результатів перевірки
  const useCheckResults = (checkId: string) => {
    return useQuery({
      queryKey: ['checkResults', checkId],
      queryFn: () => checkHistoryService.getCheckResults(checkId),
      enabled: !!checkId,
    });
  };

  // Створення нової перевірки
  const createCheckMutation = useMutation({
    mutationFn: ({ 
      documentName, 
      textContent 
    }: { 
      documentName: string; 
      textContent: string 
    }) => {
      if (!userId) throw new Error('User not authenticated');
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

  // Видалення перевірки
  const deleteCheckMutation = useMutation({
    mutationFn: (checkId: string) => checkHistoryService.deleteCheck(checkId),
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
    checksHistory: checksHistory || [],
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
