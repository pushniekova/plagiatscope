
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import SimilarityGauge from './SimilarityGauge';
import RiskLevelIndicator from './RiskLevelIndicator';

interface ResultsHeaderProps {
  overallScore: number;
  matches: number;
  paraphrasedPercentage: number;
  improperCitationPercentage: number;
}

const ResultsHeader: React.FC<ResultsHeaderProps> = ({
  overallScore,
  matches,
  paraphrasedPercentage,
  improperCitationPercentage
}) => {
  const { t } = useLanguage();

  return (
    <div className="bg-card p-4 border-b border-border">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {/* Similarity gauge */}
        <div className="col-span-1 md:col-span-1">
          <div className="flex flex-col items-center">
            <SimilarityGauge score={overallScore} />
            <div className="text-sm text-center text-muted-foreground">
              {t('results.similarityScore')}
            </div>
          </div>
        </div>

        {/* Risk level */}
        <div className="col-span-1 md:col-span-1">
          <div className="flex flex-col items-center justify-center h-full">
            <RiskLevelIndicator score={overallScore} />
            <div className="text-sm mt-1 text-center text-muted-foreground">
              {t('results.riskLevel.title')}
            </div>
          </div>
        </div>

        {/* Paraphrasing */}
        <div className="col-span-1 md:col-span-1">
          <div className="flex flex-col items-center justify-center h-full">
            <div className="text-xl font-medium">
              {paraphrasedPercentage.toFixed(0)}%
            </div>
            <div className="text-sm text-center text-muted-foreground">
              {t('results.paraphrasing')}
            </div>
          </div>
        </div>

        {/* Improper citation */}
        <div className="col-span-1 md:col-span-1">
          <div className="flex flex-col items-center justify-center h-full">
            <div className="text-xl font-medium">
              {improperCitationPercentage.toFixed(0)}%
            </div>
            <div className="text-sm text-center text-muted-foreground">
              {t('results.improperCitation')}
            </div>
          </div>
        </div>

        {/* Matching sources */}
        <div className="col-span-1 md:col-span-1">
          <div className="flex flex-col items-center justify-center h-full">
            <div className="text-xl font-medium">
              {matches}
            </div>
            <div className="text-sm text-center text-muted-foreground">
              {t('results.sourcesFound')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsHeader;
