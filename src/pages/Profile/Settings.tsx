
import React from 'react';
import ProfileLayout from '@/layouts/ProfileLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const SettingsPage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <ProfileLayout activePage="settings">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">{t('profile.settings.title')}</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>{t('profile.settings.accountSettings')}</CardTitle>
            <CardDescription>{t('profile.settings.accountSettingsDesc')}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>{t('profile.settings.comingSoon')}</p>
          </CardContent>
        </Card>
      </div>
    </ProfileLayout>
  );
};

export default SettingsPage;
