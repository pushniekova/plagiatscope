
import { ApiConfig } from './types';
import { useToast } from '@/hooks/use-toast';
import { getExternalApiConfig, saveExternalApiConfig } from '@/lib/textProcessing/utils';

export function validateApiConfig(
  activeTab: string, 
  groupToken: string, 
  authorEmail: string, 
  personalApiToken: string,
  googleApiKey: string,
  googleEngineId: string,
  toast: ReturnType<typeof useToast>['toast'],
  t: (key: string) => string
): boolean {
  let hasError = false;

  // Validate based on active tab
  if (activeTab === 'plagiarism') {
    if (!groupToken.trim() || !authorEmail.trim()) {
      toast({
        title: t('common.error'),
        description: t('check.externalApi.missingFields'),
        variant: "destructive",
      });
      hasError = true;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!hasError && !emailRegex.test(authorEmail)) {
      toast({
        title: t('common.error'),
        description: t('check.externalApi.invalidEmail'),
        variant: "destructive",
      });
      hasError = true;
    }
  } else if (activeTab === 'ai') {
    if (!personalApiToken.trim()) {
      toast({
        title: t('common.error'),
        description: t('check.externalApi.missingApiToken'),
        variant: "destructive",
      });
      hasError = true;
    }
  } else if (activeTab === 'websearch') {
    if (!googleApiKey.trim() || !googleEngineId.trim()) {
      toast({
        title: t('common.error'),
        description: "Необхідно вказати Google API Key та Google Engine ID",
        variant: "destructive",
      });
      hasError = true;
    }
  }

  return !hasError;
}

export function saveConfig(
  activeTab: string,
  groupToken: string,
  authorEmail: string,
  personalApiToken: string,
  googleApiKey: string,
  googleEngineId: string
): void {
  // Get existing config to preserve values from other tabs
  const existingConfig = getExternalApiConfig() || {} as ApiConfig;

  // Update with new values based on active tab
  const newConfig: ApiConfig = {
    ...existingConfig,
    groupToken: activeTab === 'plagiarism' ? groupToken : existingConfig.groupToken || '',
    authorEmail: activeTab === 'plagiarism' ? authorEmail : existingConfig.authorEmail || '',
    personalApiToken: activeTab === 'ai' ? personalApiToken : existingConfig.personalApiToken,
    googleApiKey: activeTab === 'websearch' ? googleApiKey : existingConfig.googleApiKey,
    googleEngineId: activeTab === 'websearch' ? googleEngineId : existingConfig.googleEngineId
  };

  saveExternalApiConfig(newConfig);
}
