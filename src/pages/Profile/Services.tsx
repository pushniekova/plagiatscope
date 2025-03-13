
import React from 'react';
import ProfileLayout from '@/layouts/ProfileLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const ServicesPage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <ProfileLayout activePage="services">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">{t('profile.services.title')}</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>{t('profile.services.availableServices')}</CardTitle>
            <CardDescription>{t('profile.services.availableServicesDesc')}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>{t('profile.services.comingSoon')}</p>
          </CardContent>
        </Card>
      </div>
    </ProfileLayout>
  );
};

export default ServicesPage;
