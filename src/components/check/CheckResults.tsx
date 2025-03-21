
import React from 'react';
import { Sparkles, FileText } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import ResultsViewer from '@/components/ResultsViewer';
import { Match, ExternalSource } from '@/components/results/types';

interface CheckResultsProps {
  text: string;
  analysisResults: {
    overallScore: number;
    matches: Match[];
    externalSources: ExternalSource[];
  };
  documentName?: string;
}

const CheckResults: React.FC<CheckResultsProps> = ({ 
  text, 
  analysisResults,
  documentName = 'document.txt'
}) => {
  const { t } = useLanguage();
  
  // Make sure we're using the exact analyzed text for displaying results
  const textToDisplay = text.trim();

  return (
    <section id="results-section" className="py-12 bg-secondary/10">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-medium mb-6 flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary animated-sparkle" />
            {t('check.resultsTitle')}
          </h2>
          <ResultsViewer 
            originalText={textToDisplay}
            overallScore={analysisResults.overallScore}
            matches={analysisResults.matches}
            externalSources={analysisResults.externalSources}
            documentName={documentName}
          />
        </div>
      </div>
    </section>
  );
};

export default CheckResults;
