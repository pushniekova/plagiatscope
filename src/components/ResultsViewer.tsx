
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { TabsContent } from "@/components/ui/tabs";
import TabNavigation from './results/TabNavigation';
import HighlightedTextTab from './results/HighlightedTextTab';
import SourcesTab from './results/SourcesTab';
import ExternalSourcesTab from './results/ExternalSourcesTab';
import SummaryTab from './results/SummaryTab';
import { ResultsProps } from './results/types';

const ResultsViewer: React.FC<ResultsProps> = ({ 
  originalText, 
  overallScore, 
  matches,
  externalSources = []
}) => {
  const [activeTab, setActiveTab] = useState<string>('highlight');
  const { t } = useLanguage();

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
            textLength={originalText.length} 
          />
        </TabsContent>
      </TabNavigation>
    </div>
  );
};

export default ResultsViewer;
