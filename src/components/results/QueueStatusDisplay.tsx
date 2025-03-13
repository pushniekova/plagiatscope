
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from "@/components/ui/button";
import { FileText } from 'lucide-react';
import { QueueStatus } from './types';

interface QueueStatusDisplayProps {
  documentName: string;
  queueStatus: QueueStatus;
}

const QueueStatusDisplay: React.FC<QueueStatusDisplayProps> = ({ documentName, queueStatus }) => {
  const { t } = useLanguage();

  return (
    <div className="w-full rounded-lg border border-border overflow-hidden">
      <div className="bg-muted/50 p-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center">
          <FileText className="mr-2 h-5 w-5 text-muted-foreground" />
          <h2 className="text-lg font-medium">{documentName}</h2>
        </div>
      </div>
      
      <div className="p-8 flex flex-col items-center justify-center">
        <div className="w-20 h-20 relative mb-4">
          <div className="absolute inset-0 rounded-full border-4 border-muted-foreground/20 border-dashed animate-spin"></div>
          <div className="absolute inset-3 bg-background flex items-center justify-center">
            <span className="text-xl font-semibold">{queueStatus.position}</span>
          </div>
        </div>
        
        <h3 className="text-lg font-medium mb-2">{t('check.queueStatus.waiting')}</h3>
        <p className="text-center text-muted-foreground max-w-md mb-4">
          {t('check.queueStatus.position', { position: queueStatus.position })}
        </p>
        <p className="text-sm text-muted-foreground">
          {t('check.queueStatus.estimatedTime', { minutes: queueStatus.estimatedMinutes || 15 })}
        </p>
        
        {queueStatus.skipQueueAvailable && (
          <Button 
            className="mt-6 button-gradient text-white gap-2 items-center flex"
            onClick={() => queueStatus.onSkipQueue && queueStatus.onSkipQueue()}
          >
            {t('check.queueStatus.skipQueue')}
            <span className="text-xs opacity-80 ml-1">
              {queueStatus.skipQueuePrice}
            </span>
          </Button>
        )}
      </div>
    </div>
  );
};

export default QueueStatusDisplay;
