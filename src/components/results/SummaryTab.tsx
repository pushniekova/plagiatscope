
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface SummaryTabProps {
  overallScore: number;
  matchesCount: number;
  textLength: number;
}

const SummaryTab: React.FC<SummaryTabProps> = ({ 
  overallScore, 
  matchesCount, 
  textLength 
}) => {
  const { t } = useLanguage();

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-muted p-4 rounded-lg text-center">
          <div className="text-2xl font-bold mb-1">{overallScore}%</div>
          <div className="text-muted-foreground text-sm">{t('results.similarityScore')}</div>
        </div>
        <div className="bg-muted p-4 rounded-lg text-center">
          <div className="text-2xl font-bold mb-1">{matchesCount}</div>
          <div className="text-muted-foreground text-sm">{t('results.sourcesFound')}</div>
        </div>
        <div className="bg-muted p-4 rounded-lg text-center">
          <div className="text-2xl font-bold mb-1">{textLength}</div>
          <div className="text-muted-foreground text-sm">{t('results.charactersAnalyzed')}</div>
        </div>
      </div>
      
      <div className="bg-white dark:bg-slate-900 border border-border rounded-lg p-4">
        <h4 className="font-medium mb-3">{t('results.analysisSummary')}</h4>
        <p className="text-muted-foreground mb-4">
          {t(`results.summary.${
            overallScore < 20 ? 'low' : overallScore < 40 ? 'medium' : 'high'
          }`)}
        </p>
        
        <h4 className="font-medium mb-2">{t('results.recommendations')}:</h4>
        <ul className="list-disc pl-5 text-muted-foreground space-y-1">
          <li>{t('results.recommendation1')}</li>
          <li>{t('results.recommendation2')}</li>
          <li>{t('results.recommendation3')}</li>
          {overallScore > 30 && (
            <li>{t('results.recommendation4')}</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default SummaryTab;
