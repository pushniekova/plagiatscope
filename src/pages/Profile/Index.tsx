
import React from 'react';
import ProfileLayout from '@/layouts/ProfileLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { useUser } from '@clerk/clerk-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const ProfilePage: React.FC = () => {
  const { t } = useLanguage();
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <ProfileLayout>
        <div className="space-y-6">
          <Skeleton className="h-12 w-[250px]" />
          <Card>
            <CardHeader>
              <Skeleton className="h-8 w-[200px]" />
              <Skeleton className="h-4 w-[300px]" />
            </CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </CardContent>
          </Card>
        </div>
      </ProfileLayout>
    );
  }

  return (
    <ProfileLayout activePage="profile">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">{t('profile.title')}</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>{t('profile.personalInfo')}</CardTitle>
            <CardDescription>{t('profile.personalInfoDesc')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">{t('profile.fullName')}</h3>
                <p className="text-sm font-medium">{user?.fullName || '-'}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">{t('profile.email')}</h3>
                <p className="text-sm font-medium">{user?.primaryEmailAddress?.emailAddress || '-'}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">{t('profile.username')}</h3>
                <p className="text-sm font-medium">{user?.username || '-'}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">{t('profile.createdAt')}</h3>
                <p className="text-sm font-medium">
                  {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : '-'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ProfileLayout>
  );
};

export default ProfilePage;
