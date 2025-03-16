
import { useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { useTextCheck } from '@/hooks/use-text-check';
import { useAnalysisProcess } from '@/hooks/use-analysis-process';

interface CheckPageLogicProps {
  children: (props: {
    text: string;
    setText: (text: string) => void;
    documentName: string;
    setDocumentName: (name: string) => void;
    isAnalyzing: boolean;
    showResults: boolean;
    showQueueStatus: boolean;
    showScientificOffer: boolean;
    queueStatus: import('@/components/results/types').QueueStatus | null;
    analysisResults: {
      overallScore: number;
      matches: import('@/components/results/types').Match[];
      externalSources: import('@/components/results/types').ExternalSource[];
    };
    handleTextChange: (newText: string) => void;
    handleFileUpload: (content: string, filename: string) => void;
    handleAnalyze: () => void;
    handleSkipQueue: () => void;
    handleAddScientificCheck: () => void;
    handleSkipScientificCheck: () => void;
  }) => React.ReactNode;
}

const CheckPageLogic: React.FC<CheckPageLogicProps> = ({ children }) => {
  const {
    text,
    setText,
    documentName,
    setDocumentName,
    showResults,
    showQueueStatus,
    showScientificOffer,
    handleTextChange,
    handleFileUpload
  } = useTextCheck();
  
  const { userId } = useAuth();
  
  const {
    analysisResults,
    isAnalyzing,
    queueStatus,
    handleAnalyze,
    handleSkipQueue,
    handleAddScientificCheck,
    handleSkipScientificCheck
  } = useAnalysisProcess({ userId });
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return children({
    text,
    setText,
    documentName,
    setDocumentName,
    isAnalyzing,
    showResults,
    showQueueStatus,
    showScientificOffer,
    queueStatus,
    analysisResults,
    handleTextChange,
    handleFileUpload,
    handleAnalyze,
    handleSkipQueue,
    handleAddScientificCheck,
    handleSkipScientificCheck
  });
};

export default CheckPageLogic;
