
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Shield, Check, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { getExternalApiConfig, saveExternalApiConfig } from '@/lib/textProcessing/utils';

interface ExternalApiConfigProps {
  onConfigSaved: () => void;
}

const ExternalApiConfig: React.FC<ExternalApiConfigProps> = ({ onConfigSaved }) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [groupToken, setGroupToken] = useState('');
  const [authorEmail, setAuthorEmail] = useState('');
  const [isConfigured, setIsConfigured] = useState(false);

  // Load existing configuration on mount
  useEffect(() => {
    const config = getExternalApiConfig();
    if (config) {
      setGroupToken(config.groupToken);
      setAuthorEmail(config.authorEmail);
      setIsConfigured(true);
    }
  }, []);

  const handleSaveConfig = () => {
    if (!groupToken.trim() || !authorEmail.trim()) {
      toast({
        title: t('common.error'),
        description: t('check.externalApi.missingFields'),
        variant: "destructive",
      });
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(authorEmail)) {
      toast({
        title: t('common.error'),
        description: t('check.externalApi.invalidEmail'),
        variant: "destructive",
      });
      return;
    }

    saveExternalApiConfig({ groupToken, authorEmail });
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
