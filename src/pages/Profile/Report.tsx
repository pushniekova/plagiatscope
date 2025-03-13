
import React from 'react';
import { useParams } from 'react-router-dom';
import ProfileLayout from '@/layouts/ProfileLayout';
import HistoryReportDetails from '@/components/profile/history/HistoryReportDetails';

const ReportPage: React.FC = () => {
  const { reportId } = useParams<{ reportId: string }>();
  
  return (
    <ProfileLayout activePage="history">
      <HistoryReportDetails reportId={reportId || ''} />
    </ProfileLayout>
  );
};

export default ReportPage;
