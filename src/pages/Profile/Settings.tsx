
import React from 'react';
import ProfileLayout from '@/layouts/ProfileLayout';
import ProfilePageLayout from '@/components/profile/ProfilePageLayout';

const SettingsPage: React.FC = () => {
  return (
    <ProfileLayout activePage="settings">
      <ProfilePageLayout
        titleKey="profile.settings.title"
        cardTitleKey="profile.settings.accountSettings"
        cardDescriptionKey="profile.settings.accountSettingsDesc"
      />
    </ProfileLayout>
  );
};

export default SettingsPage;
