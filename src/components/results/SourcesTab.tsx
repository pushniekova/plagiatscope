
import React from 'react';
import { ExternalLink } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Match } from './types';

interface SourcesTabProps {
  matches: Match[];
}

const SourcesTab: React.FC<SourcesTabProps> = ({ matches }) => {
  const { t } = useLanguage();

  return (
    <div className="p-4">
      {matches.length > 0 ? (
        <div className="divide-y divide-border">
          {matches.map((match, index) => (
            <div key={index} className="py-4">
              <div className="flex justify-between mb-2">
                <h4 className="font-medium flex items-center">
                  {match.source}
                  {match.sourceUrl && (
                    <a 
                      href={match.sourceUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center ml-2 text-primary hover:text-primary/80"
                    >
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </h4>
                <span className="text-sm px-2 py-1 bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-300 rounded-full">
                  {match.matchPercentage}% {t('results.match')}
                </span>
              </div>
              <p className="text-muted-foreground text-sm mb-2">
                {t('results.matchedText')} ({t('results.characters')} {match.startIndex}-{match.endIndex}):
              </p>
              <div className="bg-muted p-3 rounded text-sm">
                {match.text}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-lg">
          {t('results.noSources')}
        </div>
      )}
    </div>
  );
};

export default SourcesTab;
