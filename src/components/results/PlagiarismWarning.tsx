
import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface PlagiarismWarningProps {
  score: number;
  threshold?: number;
}

const PlagiarismWarning: React.FC<PlagiarismWarningProps> = ({ score, threshold = 40 }) => {
  const { t } = useLanguage();

  if (score <= threshold) {
    return null;
  }

  return (
    <div className="bg-red-50 dark:bg-red-900/10 p-3 border-b border-red-200 dark:border-red-800 flex items-start gap-2">
      <AlertTriangle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
      <p className="text-sm text-red-700 dark:text-red-400">
        {t('results.highPlagiarismWarning')}
      </p>
    </div>
  );
};

export default PlagiarismWarning;
