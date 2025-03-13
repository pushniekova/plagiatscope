
import React from 'react';
import ProfileLayout from '@/layouts/ProfileLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const BillingPage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <ProfileLayout activePage="billing">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">{t('profile.billing.title')}</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>{t('profile.billing.billingInfo')}</CardTitle>
            <CardDescription>{t('profile.billing.billingInfoDesc')}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>{t('profile.billing.comingSoon')}</p>
          </CardContent>
        </Card>
      </div>
    </ProfileLayout>
  );
};

export default BillingPage;
