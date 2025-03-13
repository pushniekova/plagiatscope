
import React from 'react';
import ProfileLayout from '@/layouts/ProfileLayout';
import ProfilePageLayout from '@/components/profile/ProfilePageLayout';

const BillingPage: React.FC = () => {
  return (
    <ProfileLayout activePage="billing">
      <ProfilePageLayout
        titleKey="profile.billing.title"
        cardTitleKey="profile.billing.billingInfo"
        cardDescriptionKey="profile.billing.billingInfoDesc"
      />
    </ProfileLayout>
  );
};

export default BillingPage;
