
import React from 'react';
import { ExternalLink } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ExternalSource } from './types';

interface ExternalSourcesTabProps {
  externalSources: ExternalSource[];
}

const ExternalSourcesTab: React.FC<ExternalSourcesTabProps> = ({ externalSources }) => {
  const { t } = useLanguage();

  return (
    <div className="p-4">
      {externalSources && externalSources.length > 0 ? (
        <div className="divide-y divide-border">
          {externalSources.map((source, index) => (
            <div key={index} className="py-4">
              <div className="flex justify-between mb-2">
                <h4 className="font-medium flex items-center">
                  {source.source}
                  <a 
                    href={source.sourceUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center ml-2 text-primary hover:text-primary/80"
                  >
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </h4>
                <span className="text-sm px-2 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 rounded-full">
                  {(source.similarity * 100).toFixed(0)}% {t('results.cosineSimilarity')}
                </span>
              </div>
              <p className="text-muted-foreground text-sm mb-2">
                {t('results.matchedText')}:
              </p>
              <div className="bg-muted p-3 rounded text-sm">
                {source.matchedText}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-lg">
          {t('results.noExternalSources')}
        </div>
      )}
    </div>
  );
};

export default ExternalSourcesTab;
