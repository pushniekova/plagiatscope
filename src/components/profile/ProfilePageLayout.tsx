
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export interface ProfilePageProps {
  titleKey: string;
  cardTitleKey: string;
  cardDescriptionKey: string;
  children?: React.ReactNode;
  showEmptyState?: boolean;
}

const ProfilePageLayout: React.FC<ProfilePageProps> = ({
  titleKey,
  cardTitleKey,
  cardDescriptionKey,
  children,
  showEmptyState = true
}) => {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">{t(titleKey)}</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>{t(cardTitleKey)}</CardTitle>
          <CardDescription>{t(cardDescriptionKey)}</CardDescription>
        </CardHeader>
        <CardContent>
          {children || (showEmptyState && <p className="text-muted-foreground">{t('profile.comingSoon')}</p>)}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePageLayout;
