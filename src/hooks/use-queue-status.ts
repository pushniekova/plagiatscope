
import { useState } from 'react';
import { QueueStatus } from '@/components/results/types';

export function useQueueStatus() {
  const [queueStatus, setQueueStatus] = useState<QueueStatus | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const mockQueueAnalysis = (handleSkipQueue: () => void) => {
    // Simulate entering the queue
    setQueueStatus({
      status: 'inQueue',
      position: 12,
      estimatedMinutes: 15,
      skipQueueAvailable: true,
      skipQueuePrice: '₴150',
      onSkipQueue: handleSkipQueue
    });
  };

  return {
    queueStatus,
    setQueueStatus,
    isAnalyzing,
    setIsAnalyzing,
    mockQueueAnalysis
  };
}
