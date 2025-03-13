
import { useState } from 'react';
import { File, List, BarChart, Globe, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface Match {
  text: string;
  startIndex: number;
  endIndex: number;
  matchPercentage: number;
  source: string;
  sourceUrl?: string;
}

interface ExternalSource {
  source: string;
  similarity: number;
  matchedText: string;
  sourceUrl: string;
}

interface ResultsViewerProps {
  originalText: string;
  overallScore: number;
  matches: Match[];
  externalSources?: ExternalSource[];
}

const ResultsViewer: React.FC<ResultsViewerProps> = ({ 
  originalText, 
  overallScore, 
  matches,
  externalSources = []
}) => {
  const [activeTab, setActiveTab] = useState<'highlight' | 'sources' | 'summary' | 'external'>('highlight');
  const { t } = useLanguage();

  // Function to generate HTML with highlighted matches
  const getHighlightedText = () => {
    if (!matches.length) return originalText;

    // Sort matches by startIndex to process them in order
    const sortedMatches = [...matches].sort((a, b) => a.startIndex - b.startIndex);
    
    let result = '';
    let lastIndex = 0;
    
    for (const match of sortedMatches) {
      // Add text before the match
      result += originalText.substring(lastIndex, match.startIndex);
      
      // Add the matched text with highlighting
      result += `<mark class="bg-yellow-200 dark:bg-yellow-900 px-1 rounded" data-source="${match.source}" data-percentage="${match.matchPercentage}%">`;
      result += originalText.substring(match.startIndex, match.endIndex);
      result += '</mark>';
      
      lastIndex = match.endIndex;
    }
    
    // Add any remaining text after the last match
    result += originalText.substring(lastIndex);
    
    return result;
  };

  // Function to determine score color
  const getScoreColor = () => {
    if (overallScore < 20) return 'text-green-500';
    if (overallScore < 40) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="w-full rounded-lg border border-border overflow-hidden">
      {/* Results header with score */}
      <div className="bg-card p-4 border-b border-border flex justify-between items-center">
        <h3 className="text-lg font-medium">{t('results.title')}</h3>
        <div className="flex items-center">
          <span className="mr-2">{t('results.similarityScore')}:</span>
          <span className={`text-xl font-bold ${getScoreColor()}`}>
            {overallScore}%
          </span>
        </div>
      </div>

      {/* Tab navigation */}
      <div className="bg-muted border-b border-border flex flex-wrap">
        <button
          className={`px-4 py-3 text-sm font-medium flex items-center ${
            activeTab === 'highlight' 
              ? 'bg-card text-foreground border-b-2 border-primary' 
              : 'text-muted-foreground hover:text-foreground'
          }`}
          onClick={() => setActiveTab('highlight')}
        >
          <File className="h-4 w-4 mr-2" />
          {t('results.tabs.highlighted')}
        </button>
        <button
          className={`px-4 py-3 text-sm font-medium flex items-center ${
            activeTab === 'sources' 
              ? 'bg-card text-foreground border-b-2 border-primary' 
              : 'text-muted-foreground hover:text-foreground'
          }`}
          onClick={() => setActiveTab('sources')}
        >
          <List className="h-4 w-4 mr-2" />
          {t('results.tabs.sources')}
        </button>
        <button
          className={`px-4 py-3 text-sm font-medium flex items-center ${
            activeTab === 'external' 
              ? 'bg-card text-foreground border-b-2 border-primary' 
              : 'text-muted-foreground hover:text-foreground'
          }`}
          onClick={() => setActiveTab('external')}
        >
          <Globe className="h-4 w-4 mr-2" />
          {t('results.tabs.external')}
        </button>
        <button
          className={`px-4 py-3 text-sm font-medium flex items-center ${
            activeTab === 'summary' 
              ? 'bg-card text-foreground border-b-2 border-primary' 
              : 'text-muted-foreground hover:text-foreground'
          }`}
          onClick={() => setActiveTab('summary')}
        >
          <BarChart className="h-4 w-4 mr-2" />
          {t('results.tabs.summary')}
        </button>
      </div>

      {/* Tab content */}
      <div className="bg-card">
        {activeTab === 'highlight' && (
          <div className="p-4">
            <div 
              className="whitespace-pre-wrap text-foreground bg-white dark:bg-slate-900 border border-border rounded-lg p-4 max-h-[500px] overflow-y-auto"
              dangerouslySetInnerHTML={{ __html: getHighlightedText() }}
            />
            {matches.length === 0 && (
              <div className="mt-4 text-center p-4 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-lg">
                {t('results.noPlagiarism')}
              </div>
            )}
          </div>
        )}

        {activeTab === 'sources' && (
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
        )}

        {activeTab === 'external' && (
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
        )}

        {activeTab === 'summary' && (
          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-muted p-4 rounded-lg text-center">
                <div className="text-2xl font-bold mb-1">{overallScore}%</div>
                <div className="text-muted-foreground text-sm">{t('results.similarityScore')}</div>
              </div>
              <div className="bg-muted p-4 rounded-lg text-center">
                <div className="text-2xl font-bold mb-1">{matches.length}</div>
                <div className="text-muted-foreground text-sm">{t('results.sourcesFound')}</div>
              </div>
              <div className="bg-muted p-4 rounded-lg text-center">
                <div className="text-2xl font-bold mb-1">{originalText.length}</div>
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
        )}
      </div>
    </div>
  );
};

export default ResultsViewer;
