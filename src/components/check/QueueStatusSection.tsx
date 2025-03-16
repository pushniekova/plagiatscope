
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { QueueStatus } from '@/components/results/types';

interface QueueStatusSectionProps {
  documentName: string;
  queueStatus: QueueStatus | null;
  onSkipQueue: () => void;
}

const QueueStatusSection: React.FC<QueueStatusSectionProps> = ({
  documentName,
  queueStatus,
  onSkipQueue
}) => {
  const { t } = useLanguage();

  if (!queueStatus) return null;

  return (
    <section id="results-section" className="py-12 bg-secondary/10">
      <div className="container mx-auto px-6">
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader className="pb-3 border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-base font-medium">{documentName}</span>
                </div>
                <button className="text-muted-foreground hover:text-foreground rounded-full p-1 transition-colors">
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                  </svg>
                </button>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center">
                <div className="mb-2 text-center">
                  <div className="text-sm text-muted-foreground mb-2">
                    {t('results.similarityScore')}
                  </div>
                  
                  {/* Loading animation for the gauge */}
                  <div className="relative h-12 w-24">
                    <div className="absolute inset-0 bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 rounded-t-full overflow-hidden opacity-30"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="h-6 w-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  </div>
                </div>
                
                <div className="text-center mb-4">
                  <h3 className="text-lg font-medium text-muted-foreground mb-2">
                    {t('check.queueStatus.waiting')}
                  </h3>
                  <div className="text-xl font-bold mb-1">
                    {t('check.queueStatus.position', { position: queueStatus?.position || 0 })}
                  </div>
                  <div className="flex items-center justify-center gap-1 mb-4">
                    <div className="flex -space-x-2">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className={`w-6 h-6 rounded-full border-2 border-background ${i === 0 ? 'bg-primary' : 'bg-muted'}`}></div>
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {t('check.queueStatus.estimatedTime', { minutes: queueStatus?.estimatedMinutes || 15 })}
                  </p>
                </div>
                
                {queueStatus?.skipQueueAvailable && (
                  <Button 
                    className="button-gradient text-white px-6 py-2 rounded-lg font-medium transition-all gap-2 items-center flex"
                    onClick={onSkipQueue}
                  >
                    {t('check.queueStatus.skipQueue')}
                    <span className="ml-1 opacity-80">{queueStatus.skipQueuePrice}</span>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default QueueStatusSection;
