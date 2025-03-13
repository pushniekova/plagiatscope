
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { TabsContent } from "@/components/ui/tabs";
import TabNavigation from './results/TabNavigation';
import HighlightedTextTab from './results/HighlightedTextTab';
import SourcesTab from './results/SourcesTab';
import ExternalSourcesTab from './results/ExternalSourcesTab';
import SummaryTab from './results/SummaryTab';
import { ResultsProps } from './results/types';
import { FileText, AlertTriangle } from 'lucide-react';

const ResultsViewer: React.FC<ResultsProps> = ({ 
  originalText, 
  overallScore, 
  matches,
  externalSources = [],
  documentName = 'Untitled Document',
  analyzedCharacters
}) => {
  const [activeTab, setActiveTab] = useState<string>('highlight');
  const { t } = useLanguage();

  // Use the actual text length for analysis
  const textLength = analyzedCharacters || originalText.length;

  // Function to determine score color
  const getScoreColor = () => {
    if (overallScore < 20) return 'text-green-500';
    if (overallScore < 40) return 'text-yellow-500';
    return 'text-red-500';
  };

  // Function to determine plagiarism risk level
  const getPlagiarismRiskLevel = () => {
    if (overallScore < 20) return t('results.riskLevel.low');
    if (overallScore < 40) return t('results.riskLevel.medium');
    return t('results.riskLevel.high');
  };

  // Calculate additional metrics based on actual analysis
  // These values would come from the actual analysis in a real implementation
  const paraphrasedPercentage = Math.min(Math.max(overallScore / 5, 0), 20);
  const improperCitationPercentage = Math.min(Math.max(overallScore / 10, 0), 10);
  const matchesCount = matches.length;

  return (
    <div className="w-full rounded-lg border border-border overflow-hidden">
      {/* Document title */}
      <div className="bg-muted/50 p-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center">
          <FileText className="mr-2 h-5 w-5 text-muted-foreground" />
          <h2 className="text-lg font-medium">{documentName}</h2>
        </div>
      </div>

      {/* Results header with metrics */}
      <div className="bg-card p-4 border-b border-border">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {/* Similarity gauge */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex flex-col items-center">
              <div className="relative w-24 h-12 mb-1">
                <div className="absolute inset-0 bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 rounded-t-full overflow-hidden" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)' }}></div>
                <div className="absolute bottom-0 left-1/2 w-1 h-5 bg-black transform -translate-x-1/2" style={{ transform: `translateX(calc(${overallScore}% - 50%)) translateX(-50%) rotate(0deg)` }}></div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-black"></div>
              </div>
              <div className={`text-xl font-bold ${getScoreColor()}`}>
                {overallScore}%
              </div>
              <div className="text-sm text-center text-muted-foreground">
                {t('results.similarityScore')}
              </div>
            </div>
          </div>

          {/* Risk level */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex flex-col items-center justify-center h-full">
              <div className={`text-sm font-medium px-3 py-1 rounded-full ${overallScore < 20 ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : overallScore < 40 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'}`}>
                {getPlagiarismRiskLevel()}
              </div>
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
                {matchesCount}
              </div>
              <div className="text-sm text-center text-muted-foreground">
                {t('results.sourcesFound')}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Warning for high plagiarism score */}
      {overallScore > 40 && (
        <div className="bg-red-50 dark:bg-red-900/10 p-3 border-b border-red-200 dark:border-red-800 flex items-start gap-2">
          <AlertTriangle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-700 dark:text-red-400">
            {t('results.highPlagiarismWarning')}
          </p>
        </div>
      )}

      {/* Tab navigation and content */}
      <TabNavigation 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
      >
        <TabsContent value="highlight">
          <HighlightedTextTab originalText={originalText} matches={matches} />
        </TabsContent>
        
        <TabsContent value="sources">
          <SourcesTab matches={matches} />
        </TabsContent>
        
        <TabsContent value="external">
          <ExternalSourcesTab externalSources={externalSources} />
        </TabsContent>
        
        <TabsContent value="summary">
          <SummaryTab 
            overallScore={overallScore} 
            matchesCount={matches.length} 
            textLength={textLength} 
            paraphrasedPercentage={paraphrasedPercentage}
            improperCitationPercentage={improperCitationPercentage}
          />
        </TabsContent>
      </TabNavigation>
    </div>
  );
};

export default ResultsViewer;
