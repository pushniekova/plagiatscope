
import React from 'react';
import ProfileLayout from '@/layouts/ProfileLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const PaymentsPage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <ProfileLayout activePage="payments">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">{t('profile.payments.title')}</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>{t('profile.payments.paymentHistory')}</CardTitle>
            <CardDescription>{t('profile.payments.paymentHistoryDesc')}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>{t('profile.payments.comingSoon')}</p>
          </CardContent>
        </Card>
      </div>
    </ProfileLayout>
  );
};

export default PaymentsPage;
