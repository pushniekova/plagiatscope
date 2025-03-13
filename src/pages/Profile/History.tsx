
import React from 'react';
import ProfileLayout from '@/layouts/ProfileLayout';
import ProfilePageLayout from '@/components/profile/ProfilePageLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Search, Filter, RefreshCw, FileText } from 'lucide-react';
import { Input } from '@/components/ui/input';

const HistoryPage: React.FC = () => {
  const { t } = useLanguage();
  
  // Sample history data
  const checkHistory = [
    {
      id: 'check-001',
      date: '2024-03-15T14:30:00',
      service: 'TextCheck',
      status: 'completed',
      score: 92
    },
    {
      id: 'check-002',
      date: '2024-03-10T11:15:00',
      service: 'TextCheck',
      status: 'completed',
      score: 78
    },
    {
      id: 'check-003',
      date: '2024-03-05T16:45:00',
      service: 'ImageCheck',
      status: 'completed',
      score: 85
    },
    {
      id: 'check-004',
      date: '2024-02-28T09:20:00',
      service: 'TextCheck',
      status: 'failed',
      score: 0
    }
  ];

  return (
    <ProfileLayout activePage="history">
      <ProfilePageLayout
        titleKey="profile.history.title"
        cardTitleKey="profile.history.checkHistory"
        cardDescriptionKey="profile.history.checkHistoryDesc"
        showEmptyState={false}
      >
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-3 justify-between">
            <div className="relative w-full sm:w-auto flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                type="search" 
                placeholder={t('profile.history.search')} 
                className="pl-8"
              />
            </div>
            <div className="flex gap-3">
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="space-y-4">
            {checkHistory.length > 0 ? (
              checkHistory.map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4">
                      <div className="rounded-full bg-primary/10 p-2 text-primary">
                        <FileText className="h-5 w-5" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">
                            {t(`profile.history.serviceType.${item.service.toLowerCase()}`)}
                          </h4>
                          <Badge variant={item.status === 'completed' ? 'default' : 'destructive'} className="ml-auto sm:ml-0">
                            {t(`profile.history.status.${item.status}`)}
                          </Badge>
                        </div>
                        <div className="flex flex-wrap gap-x-4 text-sm text-muted-foreground">
                          <span>{new Date(item.date).toLocaleString()}</span>
                          {item.status === 'completed' && (
                            <span>{t('profile.history.score')}: {item.score}%</span>
                          )}
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="sm:ml-auto">
                        {t('profile.history.viewDetails')}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                {t('profile.history.noHistory')}
              </div>
            )}
          </div>
        </div>
      </ProfilePageLayout>
    </ProfileLayout>
  );
};

export default HistoryPage;
