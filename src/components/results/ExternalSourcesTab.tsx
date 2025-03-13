
import React from 'react';
import { ExternalLink, AlertTriangle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ExternalSource } from './types';

interface ExternalSourcesTabProps {
  externalSources: ExternalSource[];
}

const ExternalSourcesTab: React.FC<ExternalSourcesTabProps> = ({ externalSources }) => {
  const { t } = useLanguage();
  
  // Check if we have real sources or simulated ones
  const hasRealSources = externalSources.some(source => source.sourceUrl && 
    (source.sourceUrl.startsWith('http') && !source.sourceUrl.includes('example.com')));
  
  return (
    <div className="p-4">
      {!hasRealSources && externalSources.length > 0 && (
        <div className="mb-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg flex items-start gap-2">
          <AlertTriangle className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-yellow-700 dark:text-yellow-400">
              {t('results.simulatedSourcesWarning') || "These are simulated sources. To get real sources, please configure Google API key and Search Engine ID in the settings."}
            </p>
          </div>
        </div>
      )}
      
      {externalSources && externalSources.length > 0 ? (
        <div className="divide-y divide-border">
          {externalSources.map((source, index) => (
            <div key={index} className="py-4">
              <div className="flex justify-between mb-2">
                <h4 className="font-medium flex items-center">
                  {source.source}
                  {source.sourceUrl && source.sourceUrl !== "#" && (
                    <a 
                      href={source.sourceUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center ml-2 text-primary hover:text-primary/80"
                    >
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
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
