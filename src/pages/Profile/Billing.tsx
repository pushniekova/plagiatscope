
import React from 'react';
import ProfileLayout from '@/layouts/ProfileLayout';
import ProfilePageLayout from '@/components/profile/ProfilePageLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CreditCard, Check } from 'lucide-react';

const BillingPage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <ProfileLayout activePage="billing">
      <ProfilePageLayout
        titleKey="profile.billing.title"
        cardTitleKey="profile.billing.billingInfo"
        cardDescriptionKey="profile.billing.billingInfoDesc"
        showEmptyState={false}
      >
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-primary/10 p-2 text-primary">
              <CreditCard className="h-6 w-6" />
            </div>
            <div>
              <p className="font-medium">{t('profile.billing.noCard')}</p>
              <p className="text-sm text-muted-foreground">{t('profile.billing.addCardDesc')}</p>
            </div>
            <Button className="ml-auto" variant="outline">
              {t('profile.billing.addCard')}
            </Button>
          </div>
          
          <div className="pt-4">
            <h3 className="font-medium mb-3">{t('profile.billing.plans')}</h3>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {/* Free Plan */}
              <Card className="border-primary">
                <CardHeader>
                  <CardTitle>{t('profile.billing.freePlan')}</CardTitle>
                  <CardDescription>{t('profile.billing.freePlanDesc')}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-3xl font-bold">$0 <span className="text-sm font-normal text-muted-foreground">/ {t('profile.billing.month')}</span></div>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span className="text-sm">{t('profile.billing.freePlanFeature1')}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span className="text-sm">{t('profile.billing.freePlanFeature2')}</span>
                    </li>
                  </ul>
                  <Button className="w-full" variant="secondary">
                    <Check className="mr-2 h-4 w-4" />
                    {t('profile.billing.currentPlan')}
                  </Button>
                </CardContent>
              </Card>
              
              {/* Premium Plan */}
              <Card>
                <CardHeader>
                  <CardTitle>{t('profile.billing.premiumPlan')}</CardTitle>
                  <CardDescription>{t('profile.billing.premiumPlanDesc')}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-3xl font-bold">$19 <span className="text-sm font-normal text-muted-foreground">/ {t('profile.billing.month')}</span></div>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span className="text-sm">{t('profile.billing.premiumPlanFeature1')}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span className="text-sm">{t('profile.billing.premiumPlanFeature2')}</span>
                    </li>
                  </ul>
                  <Button className="w-full">
                    {t('profile.billing.upgradePlan')}
                  </Button>
                </CardContent>
              </Card>
              
              {/* Pro Plan */}
              <Card>
                <CardHeader>
                  <CardTitle>{t('profile.billing.proPlan')}</CardTitle>
                  <CardDescription>{t('profile.billing.proPlanDesc')}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-3xl font-bold">$49 <span className="text-sm font-normal text-muted-foreground">/ {t('profile.billing.month')}</span></div>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span className="text-sm">{t('profile.billing.proPlanFeature1')}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span className="text-sm">{t('profile.billing.proPlanFeature2')}</span>
                    </li>
                  </ul>
                  <Button className="w-full" variant="outline">
                    {t('profile.billing.upgradePlan')}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </ProfilePageLayout>
    </ProfileLayout>
  );
};

export default BillingPage;
