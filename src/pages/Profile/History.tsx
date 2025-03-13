
import React from 'react';
import ProfileLayout from '@/layouts/ProfileLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const HistoryPage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <ProfileLayout activePage="history">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">{t('profile.history.title')}</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>{t('profile.history.checkHistory')}</CardTitle>
            <CardDescription>{t('profile.history.checkHistoryDesc')}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>{t('profile.history.comingSoon')}</p>
          </CardContent>
        </Card>
      </div>
    </ProfileLayout>
  );
};

export default HistoryPage;
