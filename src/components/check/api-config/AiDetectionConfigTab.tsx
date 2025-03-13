
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface AiDetectionTabProps {
  personalApiToken: string;
  setPersonalApiToken: (value: string) => void;
}

const AiDetectionConfigTab: React.FC<AiDetectionTabProps> = ({ 
  personalApiToken, 
  setPersonalApiToken 
}) => {
  const { t } = useLanguage();
  
  return (
    <div className="space-y-4 mt-4">
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
    </div>
  );
};

export default AiDetectionConfigTab;
