
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

type RiskLevelIndicatorProps = {
  score: number;
  size?: 'small' | 'medium' | 'large';
};

const RiskLevelIndicator: React.FC<RiskLevelIndicatorProps> = ({ 
  score,
  size = 'medium'
}) => {
  const { t } = useLanguage();
  
  const getRiskLevel = () => {
    if (score < 20) return { 
      label: t('results.riskLevel.low'),
      color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
    };
    if (score < 40) return { 
      label: t('results.riskLevel.medium'),
      color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
    };
    return { 
      label: t('results.riskLevel.high'),
      color: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
    };
  };
  
  const { label, color } = getRiskLevel();
  
  const getSizeClasses = () => {
    switch (size) {
      case 'small': return 'px-2 py-0.5 text-xs';
      case 'medium': return 'px-3 py-1 text-sm';
      case 'large': return 'px-4 py-1.5 text-base';
    }
  };

  return (
    <div className={`${color} ${getSizeClasses()} font-medium rounded-full`}>
      {label}
    </div>
  );
};

export default RiskLevelIndicator;
