
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { TabsContent } from "@/components/ui/tabs";
import TabNavigation from './results/TabNavigation';
import HighlightedTextTab from './results/HighlightedTextTab';
import SourcesTab from './results/SourcesTab';
import ExternalSourcesTab from './results/ExternalSourcesTab';
import SummaryTab from './results/SummaryTab';
import { ResultsProps } from './results/types';
import { FileText, AlertTriangle, Download } from 'lucide-react';
import { Button } from "@/components/ui/button";
import SimilarityGauge from './results/SimilarityGauge';
import RiskLevelIndicator from './results/RiskLevelIndicator';

const ResultsViewer: React.FC<ResultsProps> = ({ 
  originalText, 
  overallScore, 
  matches,
  externalSources = [],
  documentName = 'Untitled Document',
  analyzedCharacters,
  queueStatus
}) => {
  const [activeTab, setActiveTab] = useState<string>('highlight');
  const { t } = useLanguage();

  // Use the actual text length for analysis
  const textLength = analyzedCharacters || originalText.length;

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

  const handleDownloadReport = () => {
    // This would be implemented to generate and download a PDF/DOCX report
    console.log('Downloading report for', documentName);
    
    // For demo purposes, we'll just create a simple text file
    const reportText = `
Plagiarism Report for: ${documentName}
Overall Similarity Score: ${overallScore}%
Risk Level: ${getPlagiarismRiskLevel()}
Matches Found: ${matchesCount}
Text Length: ${textLength} characters
      
Summary:
${overallScore < 20 
  ? t('results.summaryDetail.low') 
  : overallScore < 40 
    ? t('results.summaryDetail.medium') 
    : t('results.summaryDetail.high')}
`;
    
    // Create blob and download
    const blob = new Blob([reportText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${documentName.split('.')[0]}-report.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // If the document is in queue, show queue status
  if (queueStatus && queueStatus.status === 'inQueue') {
    return (
      <div className="w-full rounded-lg border border-border overflow-hidden">
        <div className="bg-muted/50 p-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center">
            <FileText className="mr-2 h-5 w-5 text-muted-foreground" />
            <h2 className="text-lg font-medium">{documentName}</h2>
          </div>
        </div>
        
        <div className="p-8 flex flex-col items-center justify-center">
          <div className="w-20 h-20 relative mb-4">
            <div className="absolute inset-0 rounded-full border-4 border-muted-foreground/20 border-dashed animate-spin"></div>
            <div className="absolute inset-3 bg-background flex items-center justify-center">
              <span className="text-xl font-semibold">{queueStatus.position}</span>
            </div>
          </div>
          
          <h3 className="text-lg font-medium mb-2">{t('check.queueStatus.waiting')}</h3>
          <p className="text-center text-muted-foreground max-w-md mb-4">
            {t('check.queueStatus.position', { position: queueStatus.position })}
          </p>
          <p className="text-sm text-muted-foreground">
            {t('check.queueStatus.estimatedTime', { minutes: queueStatus.estimatedMinutes || 15 })}
          </p>
          
          {queueStatus.skipQueueAvailable && (
            <Button 
              className="mt-6 button-gradient text-white gap-2 items-center flex"
              onClick={() => queueStatus.onSkipQueue && queueStatus.onSkipQueue()}
            >
              {t('check.queueStatus.skipQueue')}
              <span className="text-xs opacity-80 ml-1">
                {queueStatus.skipQueuePrice}
              </span>
            </Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full rounded-lg border border-border overflow-hidden">
      {/* Document title */}
      <div className="bg-muted/50 p-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center">
          <FileText className="mr-2 h-5 w-5 text-muted-foreground" />
          <h2 className="text-lg font-medium">{documentName}</h2>
        </div>
        <Button 
          variant="outline" 
          size="sm"
          className="gap-1.5"
          onClick={handleDownloadReport}
        >
          <Download className="h-4 w-4" />
          {t('results.downloadReport')}
        </Button>
      </div>

      {/* Results header with metrics */}
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
            originalText={originalText}
          />
        </TabsContent>
      </TabNavigation>
    </div>
  );
};

export default ResultsViewer;
