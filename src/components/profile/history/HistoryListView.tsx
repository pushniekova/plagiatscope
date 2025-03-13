
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Eye, Trash2, Download } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { CheckHistoryItem } from './types';
import { getStatusText, getStatusVariant } from './utils';

interface HistoryListViewProps {
  checkHistory: CheckHistoryItem[];
}

const HistoryListView: React.FC<HistoryListViewProps> = ({ checkHistory }) => {
  const { t } = useLanguage();

  if (checkHistory.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        {t('profile.history.noHistory')}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {checkHistory.map((item) => (
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
                    {getStatusText(t, item.status, item.status === 'inQueue' ? item.position : undefined)}
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
      ))}
    </div>
  );
};

export default HistoryListView;
