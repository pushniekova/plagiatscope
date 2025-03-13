
import React, { useState } from 'react';
import ProfileLayout from '@/layouts/ProfileLayout';
import ProfilePageLayout from '@/components/profile/ProfilePageLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Search, Filter, RefreshCw, FileText, Trash2, Eye, AlertTriangle, Download } from 'lucide-react';
import { Input } from '@/components/ui/input';
import SimilarityGauge from '@/components/results/SimilarityGauge';
import RiskLevelIndicator from '@/components/results/RiskLevelIndicator';
import { Link } from 'react-router-dom';

const HistoryPage: React.FC = () => {
  const { t } = useLanguage();
  const [selectedView, setSelectedView] = useState<'card' | 'list'>('card');
  
  // Sample history data - this would come from a database in a real implementation
  const checkHistory = [
    {
      id: 'check-001',
      date: '2024-03-15T14:30:00',
      documentName: 'родина Розові.docx',
      status: 'completed',
      score: 78
    },
    {
      id: 'check-002',
      date: '2024-03-10T11:15:00',
      documentName: 'Гендерні відмінності професій.docx',
      status: 'completed',
      score: 8
    },
    {
      id: 'check-003',
      date: '2024-02-28T09:20:00',
      documentName: 'Аналіза особливих банкроту.docx',
      status: 'inQueue',
      position: 12,
      score: 0
    },
    {
      id: 'check-004',
      date: '2024-02-20T16:45:00',
      documentName: 'Документ без назви (1).docx',
      status: 'unavailable',
      score: 0
    },
    {
      id: 'check-005',
      date: '2024-02-15T08:15:00',
      documentName: 'Документ без назви (2).docx',
      status: 'unavailable',
      score: 0
    }
  ];

  const getRiskLevel = (score: number) => {
    if (score < 20) return 'low';
    if (score < 40) return 'medium';
    return 'high';
  };

  const getStatusText = (status: string, position?: number) => {
    switch (status) {
      case 'completed':
        return t('profile.history.status.completed');
      case 'inQueue':
        return position 
          ? t('profile.history.status.inQueue', { position }) 
          : t('profile.history.status.inQueue', { position: '-' });
      case 'unavailable':
        return t('profile.history.status.unavailable');
      default:
        return status;
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'completed': return 'default';
      case 'inQueue': return 'outline';
      case 'unavailable': return 'destructive';
      default: return 'secondary';
    }
  };

  return (
    <ProfileLayout activePage="history">
      <ProfilePageLayout
        titleKey="profile.history.title"
        cardTitleKey="profile.history.checkHistory"
        cardDescriptionKey="profile.history.checkHistoryDesc"
        showEmptyState={checkHistory.length === 0}
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
              <Button variant="outline" size="icon" title={t('profile.history.viewMode.card')}
                className={selectedView === 'card' ? 'bg-primary/10' : ''}
                onClick={() => setSelectedView('card')}>
                <div className="grid grid-cols-2 gap-0.5">
                  <div className="w-1.5 h-1.5 bg-current rounded-sm"></div>
                  <div className="w-1.5 h-1.5 bg-current rounded-sm"></div>
                  <div className="w-1.5 h-1.5 bg-current rounded-sm"></div>
                  <div className="w-1.5 h-1.5 bg-current rounded-sm"></div>
                </div>
              </Button>
              <Button variant="outline" size="icon" title={t('profile.history.viewMode.list')}
                className={selectedView === 'list' ? 'bg-primary/10' : ''}
                onClick={() => setSelectedView('list')}>
                <div className="flex flex-col gap-0.5 items-stretch">
                  <div className="w-4 h-1 bg-current rounded-sm"></div>
                  <div className="w-4 h-1 bg-current rounded-sm"></div>
                  <div className="w-4 h-1 bg-current rounded-sm"></div>
                </div>
              </Button>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {selectedView === 'list' ? (
            <div className="space-y-3">
              {checkHistory.length > 0 ? (
                checkHistory.map((item) => (
                  <Card key={item.id} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="flex items-center gap-3 p-4">
                        <div className="rounded-full bg-primary/10 p-2 text-primary">
                          <FileText className="h-5 w-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium truncate">{item.documentName}</h4>
                            <Badge variant={getStatusVariant(item.status)}>
                              {getStatusText(item.status, item.status === 'inQueue' ? item.position : undefined)}
                            </Badge>
                          </div>
                          <div className="flex gap-x-4 text-sm text-muted-foreground">
                            <span>{new Date(item.date).toLocaleString()}</span>
                            {item.status === 'completed' && (
                              <span>{t('profile.history.score')}: {item.score}%</span>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          {item.status === 'completed' && (
                            <>
                              <Button variant="outline" size="sm" asChild>
                                <Link to={`/profile/reports/${item.id}`}>
                                  <Eye className="h-4 w-4 mr-1" />
                                  {t('profile.history.viewReport')}
                                </Link>
                              </Button>
                              <Button variant="outline" size="icon" className="text-primary">
                                <Download className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                          <Button variant="outline" size="icon" className="text-destructive">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
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
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {checkHistory.length > 0 ? (
                checkHistory.map((item) => (
                  <Card key={item.id} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="p-4 border-b border-border flex items-center justify-between">
                        <div className="flex items-center gap-2 min-w-0">
                          <FileText className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                          <h4 className="font-medium truncate">{item.documentName}</h4>
                        </div>
                        <Button variant="ghost" size="icon" className="h-7 w-7">
                          <Trash2 className="h-4 w-4 text-muted-foreground" />
                        </Button>
                      </div>
                      
                      <div className="px-6 pt-6 pb-4 flex flex-col items-center">
                        {item.status === 'completed' ? (
                          <>
                            <div className="text-center mb-2">
                              <div className="text-sm text-muted-foreground mb-2">
                                {t('results.similarityScore')}
                              </div>
                              <SimilarityGauge score={item.score} size="medium" />
                            </div>
                            <RiskLevelIndicator score={item.score} />
                          </>
                        ) : item.status === 'inQueue' ? (
                          <div className="text-center mb-4">
                            <div className="w-16 h-16 mx-auto relative mb-2">
                              <div className="absolute inset-0 rounded-full border-4 border-border border-dashed animate-spin"></div>
                              <div className="absolute inset-3 bg-background flex items-center justify-center">
                                <span className="text-lg font-semibold">{item.position}</span>
                              </div>
                            </div>
                            <Badge variant="outline" className="mb-2">
                              {t('profile.history.status.inQueue', { position: item.position })}
                            </Badge>
                            <p className="text-sm text-muted-foreground">
                              {t('profile.history.queueEstimate')}
                            </p>
                          </div>
                        ) : (
                          <div className="text-center mb-4">
                            <div className="w-16 h-16 mx-auto relative mb-2 text-amber-500">
                              <AlertTriangle className="w-full h-full" />
                            </div>
                            <Badge variant="destructive" className="mb-2">
                              {t('profile.history.status.unavailable')}
                            </Badge>
                            <p className="text-sm text-muted-foreground max-w-xs">
                              {t('profile.history.unavailableMessage')}
                            </p>
                          </div>
                        )}
                      </div>
                      
                      <div className="px-4 pb-4 pt-2 flex gap-2 justify-center">
                        {item.status === 'completed' && (
                          <>
                            <Button className="w-full" asChild>
                              <Link to={`/profile/reports/${item.id}`}>
                                <Eye className="h-4 w-4 mr-1" />
                                {t('profile.history.viewReport')}
                              </Link>
                            </Button>
                            <Button variant="outline" size="icon" className="flex-shrink-0">
                              <Download className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                      </div>
                      
                      <div className="px-4 py-2 bg-muted/50 text-xs text-muted-foreground">
                        {new Date(item.date).toLocaleString()}
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground col-span-full">
                  {t('profile.history.noHistory')}
                </div>
              )}
            </div>
          )}
        </div>
      </ProfilePageLayout>
    </ProfileLayout>
  );
};

export default HistoryPage;
