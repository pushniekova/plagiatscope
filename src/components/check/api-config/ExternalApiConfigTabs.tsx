
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Check, AlertCircle, BookOpen, Brain, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { getExternalApiConfig } from '@/lib/textProcessing/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ExternalApiConfigProps } from './types';
import PlagiarismConfigTab from './PlagiarismConfigTab';
import AiDetectionConfigTab from './AiDetectionConfigTab';
import WebSearchConfigTab from './WebSearchConfigTab';
import { validateApiConfig, saveConfig } from './configUtils';

const ExternalApiConfigTabs: React.FC<ExternalApiConfigProps> = ({ onConfigSaved }) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [groupToken, setGroupToken] = useState('');
  const [authorEmail, setAuthorEmail] = useState('');
  const [personalApiToken, setPersonalApiToken] = useState('');
  const [googleApiKey, setGoogleApiKey] = useState('');
  const [googleEngineId, setGoogleEngineId] = useState('');
  const [isConfigured, setIsConfigured] = useState(false);
  const [activeTab, setActiveTab] = useState('plagiarism');

  // Load existing configuration on mount
  useEffect(() => {
    const config = getExternalApiConfig();
    if (config) {
      setGroupToken(config.groupToken || '');
      setAuthorEmail(config.authorEmail || '');
      setPersonalApiToken(config.personalApiToken || '');
      setGoogleApiKey(config.googleApiKey || '');
      setGoogleEngineId(config.googleEngineId || '');
      setIsConfigured(!!config.groupToken && !!config.authorEmail);
    }
  }, []);

  const handleSaveConfig = () => {
    const isValid = validateApiConfig(
      activeTab,
      groupToken,
      authorEmail,
      personalApiToken,
      googleApiKey,
      googleEngineId,
      toast,
      t
    );

    if (!isValid) return;

    saveConfig(
      activeTab,
      groupToken,
      authorEmail,
      personalApiToken,
      googleApiKey,
      googleEngineId
    );
    
    setIsConfigured(true);
    onConfigSaved();

    toast({
      title: t('check.externalApi.configSaved'),
      description: t('check.externalApi.configSavedDesc'),
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          {t('check.externalApi.title')}
        </CardTitle>
        <CardDescription>{t('check.externalApi.description')}</CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="plagiarism" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              {t('check.externalApi.plagiarismTab')}
            </TabsTrigger>
            <TabsTrigger value="ai" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              {t('check.externalApi.aiTab')}
            </TabsTrigger>
            <TabsTrigger value="websearch" className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              {t('check.externalApi.websearchTab') || "Пошук в Інтернеті"}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="plagiarism">
            <PlagiarismConfigTab
              groupToken={groupToken}
              setGroupToken={setGroupToken}
              authorEmail={authorEmail}
              setAuthorEmail={setAuthorEmail}
            />
          </TabsContent>
          
          <TabsContent value="ai">
            <AiDetectionConfigTab
              personalApiToken={personalApiToken}
              setPersonalApiToken={setPersonalApiToken}
            />
          </TabsContent>
          
          <TabsContent value="websearch">
            <WebSearchConfigTab
              googleApiKey={googleApiKey}
              setGoogleApiKey={setGoogleApiKey}
              googleEngineId={googleEngineId}
              setGoogleEngineId={setGoogleEngineId}
            />
          </TabsContent>
        </Tabs>
        
        {isConfigured && (
          <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
            <Check className="h-4 w-4" />
            {t('check.externalApi.configured')}
          </div>
        )}
      </CardContent>
      
      <CardFooter className="justify-between">
        <p className="text-sm text-muted-foreground">
          <AlertCircle className="h-4 w-4 inline mr-1" />
          {activeTab === 'websearch' 
            ? "API ключі будуть збережені лише у вашому локальному сховищі браузера"
            : t('check.externalApi.warning')}
        </p>
        <Button onClick={handleSaveConfig}>
          {t('check.externalApi.saveButton')}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ExternalApiConfigTabs;
