
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Eye, Download, AlertTriangle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import SimilarityGauge from '@/components/results/SimilarityGauge';
import RiskLevelIndicator from '@/components/results/RiskLevelIndicator';
import { CheckHistoryItem } from './types';

interface HistoryCardViewProps {
  checkHistory: CheckHistoryItem[];
}

const HistoryCardView: React.FC<HistoryCardViewProps> = ({ checkHistory }) => {
  const { t } = useLanguage();

  if (checkHistory.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground col-span-full">
        {t('profile.history.noHistory')}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {checkHistory.map((item) => (
        <Card key={item.id} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-2 min-w-0">
                <FileText className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <h4 className="font-medium truncate">{item.documentName}</h4>
              </div>
              <Button variant="ghost" size="icon" className="h-7 w-7">
                <FileText className="h-4 w-4 text-muted-foreground" />
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
      ))}
    </div>
  );
};

export default HistoryCardView;
