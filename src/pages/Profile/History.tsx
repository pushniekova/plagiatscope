
import React from 'react';
import ProfileLayout from '@/layouts/ProfileLayout';
import ProfilePageLayout from '@/components/profile/ProfilePageLayout';

const HistoryPage: React.FC = () => {
  return (
    <ProfileLayout activePage="history">
      <ProfilePageLayout
        titleKey="profile.history.title"
        cardTitleKey="profile.history.checkHistory"
        cardDescriptionKey="profile.history.checkHistoryDesc"
      />
    </ProfileLayout>
  );
};

export default HistoryPage;
