
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { TabsContent } from "@/components/ui/tabs";
import TabNavigation from './results/TabNavigation';
import HighlightedTextTab from './results/HighlightedTextTab';
import SourcesTab from './results/SourcesTab';
import ExternalSourcesTab from './results/ExternalSourcesTab';
import SummaryTab from './results/SummaryTab';
import { ResultsProps } from './results/types';
import DocumentTitleBar from './results/DocumentTitleBar';
import ResultsHeader from './results/ResultsHeader';
import PlagiarismWarning from './results/PlagiarismWarning';
import QueueStatusDisplay from './results/QueueStatusDisplay';

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

  // Calculate additional metrics based on actual analysis
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

  // Function to determine plagiarism risk level
  const getPlagiarismRiskLevel = () => {
    if (overallScore < 20) return t('results.riskLevel.low');
    if (overallScore < 40) return t('results.riskLevel.medium');
    return t('results.riskLevel.high');
  };

  // If the document is in queue, show queue status
  if (queueStatus && queueStatus.status === 'inQueue') {
    return <QueueStatusDisplay documentName={documentName} queueStatus={queueStatus} />;
  }

  return (
    <div className="w-full rounded-lg border border-border overflow-hidden">
      {/* Document title */}
      <DocumentTitleBar documentName={documentName} onDownloadReport={handleDownloadReport} />

      {/* Results header with metrics */}
      <ResultsHeader 
        overallScore={overallScore}
        matches={matchesCount}
        paraphrasedPercentage={paraphrasedPercentage}
        improperCitationPercentage={improperCitationPercentage}
      />

      {/* Warning for high plagiarism score */}
      <PlagiarismWarning score={overallScore} />

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
