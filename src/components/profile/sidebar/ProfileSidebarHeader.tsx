
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { SidebarHeader } from '@/components/ui/sidebar';

const ProfileSidebarHeader: React.FC = () => {
  const { t } = useLanguage();

  return (
    <SidebarHeader className="border-b border-border">
      <div className="px-3 py-2">
        <h2 className="text-lg font-semibold">{t('profile.dashboard')}</h2>
        <p className="text-sm text-muted-foreground">{t('profile.welcomeMessage')}</p>
      </div>
    </SidebarHeader>
  );
};

export default ProfileSidebarHeader;
