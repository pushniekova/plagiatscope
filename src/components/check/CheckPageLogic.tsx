
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Match, ExternalSource, QueueStatus } from '@/components/results/types';
import { useLanguage } from '@/contexts/LanguageContext';
import { analyzePlagiarism } from '@/lib/textProcessing';

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
    queueStatus: QueueStatus | null;
    analysisResults: {
      overallScore: number;
      matches: Match[];
      externalSources: ExternalSource[];
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
  const [text, setText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [documentName, setDocumentName] = useState('document.txt');
  const [showQueueStatus, setShowQueueStatus] = useState(false);
  const [showScientificOffer, setShowScientificOffer] = useState(false);
  const [queueStatus, setQueueStatus] = useState<QueueStatus | null>(null);
  const [analysisResults, setAnalysisResults] = useState<{
    overallScore: number;
    matches: Match[];
    externalSources: ExternalSource[];
  }>({ 
    overallScore: 0, 
    matches: [],
    externalSources: [] 
  });
  
  const { toast } = useToast();
  const { t } = useLanguage();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleTextChange = (newText: string) => {
    setText(newText);
    if (showResults) {
      setShowResults(false);
    }
    if (showQueueStatus) {
      setShowQueueStatus(false);
    }
    if (showScientificOffer) {
      setShowScientificOffer(false);
    }
  };

  const handleFileUpload = (content: string, filename: string) => {
    setText(content);
    setDocumentName(filename || 'document.txt');
    if (showResults) {
      setShowResults(false);
    }
    if (showQueueStatus) {
      setShowQueueStatus(false);
    }
    if (showScientificOffer) {
      setShowScientificOffer(false);
    }
  };

  const mockQueueAnalysis = () => {
    // Simulate entering the queue
    setShowQueueStatus(true);
    setQueueStatus({
      status: 'inQueue',
      position: 12,
      estimatedMinutes: 15,
      skipQueueAvailable: true,
      skipQueuePrice: '₴150',
      onSkipQueue: handleSkipQueue
    });
    
    // Scroll to queue status after a brief delay
    setTimeout(() => {
      document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleSkipQueue = () => {
    // Simulate skipping the queue and starting the analysis
    setShowQueueStatus(false);
    performAnalysis();
  };

  const performAnalysis = async () => {
    setIsAnalyzing(true);
    
    try {
      // Perform plagiarism analysis with our improved algorithm
      const results = await analyzePlagiarism(text);
      setAnalysisResults(results);
      
      // For demo purposes, sometimes show the scientific offer
      if (Math.random() > 0.5) {
        setShowScientificOffer(true);
      } else {
        setShowResults(true);
      }
      
      // Scroll to results after a brief delay
      setTimeout(() => {
        document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (error) {
      console.error("Error analyzing text:", error);
      toast({
        title: t('check.analysisError'),
        description: t('check.analysisErrorMessage'),
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleAnalyze = async () => {
    if (!text.trim()) {
      toast({
        title: t('check.emptyText'),
        description: t('check.enterTextMessage'),
        variant: "destructive",
      });
      return;
    }

    // Simulate entering the queue (as a demonstration)
    // In a real system, this would depend on server load
    if (Math.random() > 0.5) {
      mockQueueAnalysis();
    } else {
      performAnalysis();
    }
  };

  const handleAddScientificCheck = () => {
    setShowScientificOffer(false);
    setShowResults(true);
    
    // In a real application, this would add the scientific check to the analysis
    toast({
      title: t('check.fileUploaded'),
      description: "Added scientific paper check to your analysis",
    });
    
    // Scroll to results after a brief delay
    setTimeout(() => {
      document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleSkipScientificCheck = () => {
    setShowScientificOffer(false);
    setShowResults(true);
    
    // Scroll to results after a brief delay
    setTimeout(() => {
      document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

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
