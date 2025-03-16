
import React, { useState } from 'react';
import ProfileLayout from '@/layouts/ProfileLayout';
import ProfilePageLayout from '@/components/profile/ProfilePageLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import HistoryCardView from '@/components/profile/history/HistoryCardView';
import HistoryListView from '@/components/profile/history/HistoryListView';
import HistoryToolbar from '@/components/profile/history/HistoryToolbar';
import { useChecksHistory } from '@/hooks/use-checks-history';

const HistoryPage: React.FC = () => {
  const { t } = useLanguage();
  const [selectedView, setSelectedView] = useState<'card' | 'list'>('card');
  const { checksHistory, isLoading, refetch } = useChecksHistory();
  
  return (
    <ProfileLayout activePage="history">
      <ProfilePageLayout
        titleKey="profile.history.title"
        cardTitleKey="profile.history.checkHistory"
        cardDescriptionKey="profile.history.checkHistoryDesc"
        showEmptyState={checksHistory.length === 0 && !isLoading}
      >
        <div className="space-y-6">
          <HistoryToolbar 
            selectedView={selectedView} 
            setSelectedView={setSelectedView} 
          />
          
          {selectedView === 'list' ? (
            <HistoryListView checkHistory={checksHistory} />
          ) : (
            <HistoryCardView checkHistory={checksHistory} />
          )}
        </div>
      </ProfilePageLayout>
    </ProfileLayout>
  );
};

export default HistoryPage;
