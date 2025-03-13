
import React from 'react';
import ProfileLayout from '@/layouts/ProfileLayout';
import ProfilePageLayout from '@/components/profile/ProfilePageLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

const PaymentsPage: React.FC = () => {
  const { t } = useLanguage();

  // Sample payment history data
  const paymentHistory = [
    { id: 'INV-001', date: '2024-03-01', amount: '$19.00', status: 'completed' },
    { id: 'INV-002', date: '2024-02-01', amount: '$19.00', status: 'completed' },
    { id: 'INV-003', date: '2024-01-01', amount: '$19.00', status: 'completed' },
  ];

  return (
    <ProfileLayout activePage="payments">
      <ProfilePageLayout
        titleKey="profile.payments.title"
        cardTitleKey="profile.payments.paymentHistory"
        cardDescriptionKey="profile.payments.paymentHistoryDesc"
        showEmptyState={false}
      >
        <div className="space-y-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('profile.payments.invoiceId')}</TableHead>
                <TableHead>{t('profile.payments.date')}</TableHead>
                <TableHead>{t('profile.payments.amount')}</TableHead>
                <TableHead>{t('profile.payments.status')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paymentHistory.length > 0 ? (
                paymentHistory.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell className="font-medium">{payment.id}</TableCell>
                    <TableCell>{new Date(payment.date).toLocaleDateString()}</TableCell>
                    <TableCell>{payment.amount}</TableCell>
                    <TableCell>
                      <Badge variant={payment.status === 'completed' ? 'default' : 'outline'}>
                        {t(`profile.payments.status.${payment.status}`)}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-6 text-muted-foreground">
                    {t('profile.payments.noHistory')}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </ProfilePageLayout>
    </ProfileLayout>
  );
};

export default PaymentsPage;
