
import React from 'react';
import ProfileLayout from '@/layouts/ProfileLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { useUser } from '@clerk/clerk-react';
import { Skeleton } from '@/components/ui/skeleton';
import ProfilePageLayout from '@/components/profile/ProfilePageLayout';

const ProfilePage: React.FC = () => {
  const { t } = useLanguage();
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <ProfileLayout>
        <div className="space-y-6">
          <Skeleton className="h-12 w-[250px]" />
          <Skeleton className="h-[200px] w-full rounded-lg" />
        </div>
      </ProfileLayout>
    );
  }

  return (
    <ProfileLayout activePage="profile">
      <ProfilePageLayout
        titleKey="profile.title"
        cardTitleKey="profile.personalInfo"
        cardDescriptionKey="profile.personalInfoDesc"
      >
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
      </ProfilePageLayout>
    </ProfileLayout>
  );
};

export default ProfilePage;
