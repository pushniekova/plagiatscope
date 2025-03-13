
import React from 'react';
import ProfileLayout from '@/layouts/ProfileLayout';
import ProfilePageLayout from '@/components/profile/ProfilePageLayout';

const ServicesPage: React.FC = () => {
  return (
    <ProfileLayout activePage="services">
      <ProfilePageLayout
        titleKey="profile.services.title"
        cardTitleKey="profile.services.availableServices"
        cardDescriptionKey="profile.services.availableServicesDesc"
      />
    </ProfileLayout>
  );
};

export default ServicesPage;
