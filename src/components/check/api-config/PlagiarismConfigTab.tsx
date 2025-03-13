
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface PlagiarismTabProps {
  groupToken: string;
  setGroupToken: (value: string) => void;
  authorEmail: string;
  setAuthorEmail: (value: string) => void;
}

const PlagiarismConfigTab: React.FC<PlagiarismTabProps> = ({ 
  groupToken, 
  setGroupToken, 
  authorEmail, 
  setAuthorEmail 
}) => {
  const { t } = useLanguage();
  
  return (
    <div className="space-y-4 mt-4">
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
    </div>
  );
};

export default PlagiarismConfigTab;
