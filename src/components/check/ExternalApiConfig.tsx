
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Shield, Check, AlertCircle, BookOpen, Brain } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { getExternalApiConfig, saveExternalApiConfig } from '@/lib/textProcessing/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ExternalApiConfigProps {
  onConfigSaved: () => void;
}

const ExternalApiConfig: React.FC<ExternalApiConfigProps> = ({ onConfigSaved }) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [groupToken, setGroupToken] = useState('');
  const [authorEmail, setAuthorEmail] = useState('');
  const [personalApiToken, setPersonalApiToken] = useState('');
  const [isConfigured, setIsConfigured] = useState(false);
  const [activeTab, setActiveTab] = useState('plagiarism');

  // Load existing configuration on mount
  useEffect(() => {
    const config = getExternalApiConfig();
    if (config) {
      setGroupToken(config.groupToken || '');
      setAuthorEmail(config.authorEmail || '');
      setPersonalApiToken(config.personalApiToken || '');
      setIsConfigured(!!config.groupToken && !!config.authorEmail);
    }
  }, []);

  const handleSaveConfig = () => {
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
    }

    if (hasError) return;

    // Get existing config to preserve values from the other tab
    const existingConfig = getExternalApiConfig() || { 
      groupToken: '', 
      authorEmail: '',
      personalApiToken: '' 
    };

    // Update with new values
    const newConfig = {
      ...existingConfig,
      groupToken: activeTab === 'plagiarism' ? groupToken : existingConfig.groupToken,
      authorEmail: activeTab === 'plagiarism' ? authorEmail : existingConfig.authorEmail,
      personalApiToken: activeTab === 'ai' ? personalApiToken : existingConfig.personalApiToken
    };

    saveExternalApiConfig(newConfig);
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
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="plagiarism" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              {t('check.externalApi.plagiarismTab')}
            </TabsTrigger>
            <TabsTrigger value="ai" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              {t('check.externalApi.aiTab')}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="plagiarism" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="group-token">{t('check.externalApi.groupToken')}</Label>
              <Input
                id="group-token"
                type="text"
                value={groupToken}
                onChange={(e) => setGroupToken(e.target.value)}
                placeholder={t('check.externalApi.groupTokenPlaceholder')}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="author-email">{t('check.externalApi.authorEmail')}</Label>
              <Input
                id="author-email"
                type="email"
                value={authorEmail}
                onChange={(e) => setAuthorEmail(e.target.value)}
                placeholder={t('check.externalApi.authorEmailPlaceholder')}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="ai" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="personal-api-token">{t('check.externalApi.personalApiToken')}</Label>
              <Input
                id="personal-api-token"
                type="text"
                value={personalApiToken}
                onChange={(e) => setPersonalApiToken(e.target.value)}
                placeholder={t('check.externalApi.personalApiTokenPlaceholder')}
              />
            </div>
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
          {t('check.externalApi.warning')}
        </p>
        <Button onClick={handleSaveConfig}>
          {t('check.externalApi.saveButton')}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ExternalApiConfig;
