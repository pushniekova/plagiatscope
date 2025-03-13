
import React from 'react';
import ProfileLayout from '@/layouts/ProfileLayout';
import ProfilePageLayout from '@/components/profile/ProfilePageLayout';

const PaymentsPage: React.FC = () => {
  return (
    <ProfileLayout activePage="payments">
      <ProfilePageLayout
        titleKey="profile.payments.title"
        cardTitleKey="profile.payments.paymentHistory"
        cardDescriptionKey="profile.payments.paymentHistoryDesc"
      />
    </ProfileLayout>
  );
};

export default PaymentsPage;
