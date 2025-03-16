
import { useState } from 'react';
import { Match, ExternalSource } from '@/components/results/types';
import { analysisService } from '@/lib/services/analysisService';
import { useTextCheck } from '@/hooks/use-text-check';
import { useQueueStatus } from '@/hooks/use-queue-status';

interface AnalysisProcessProps {
  userId: string | null;
}

export function useAnalysisProcess({ userId }: AnalysisProcessProps) {
  const { 
    text, 
    documentName, 
    setShowResults,
    setShowQueueStatus,
    showScientificOffer,
    setShowScientificOffer,
    toast,
    t 
  } = useTextCheck();
  
  const { 
    queueStatus,
    isAnalyzing, 
    setIsAnalyzing,
    mockQueueAnalysis 
  } = useQueueStatus();
  
  const [analysisResults, setAnalysisResults] = useState<{
    overallScore: number;
    matches: Match[];
    externalSources: ExternalSource[];
  }>({ 
    overallScore: 0, 
    matches: [],
    externalSources: [] 
  });

  const performAnalysis = async () => {
    setIsAnalyzing(true);
    
    try {
      // Perform plagiarism analysis
      const results = await analysisService.performAnalysis(text, documentName, userId);
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
      mockQueueAnalysis(handleSkipQueue);
      setShowQueueStatus(true);
      
      // Scroll to queue status after a brief delay
      setTimeout(() => {
        document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      performAnalysis();
    }
  };

  const handleSkipQueue = () => {
    // Simulate skipping the queue and starting the analysis
    setShowQueueStatus(false);
    performAnalysis();
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
  
  return {
    analysisResults,
    isAnalyzing,
    queueStatus,
    handleAnalyze,
    handleSkipQueue,
    handleAddScientificCheck,
    handleSkipScientificCheck
  };
}
