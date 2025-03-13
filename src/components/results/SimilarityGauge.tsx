
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { LucideSmilePlus, LucideSmile, LucideMeh, LucideAngry, LucideFrown } from 'lucide-react';

type SimilarityGaugeProps = {
  score: number;
  size?: 'small' | 'medium' | 'large';
  showEmoticon?: boolean;
  showValue?: boolean;
};

const SimilarityGauge: React.FC<SimilarityGaugeProps> = ({ 
  score, 
  size = 'large', 
  showEmoticon = true,
  showValue = true 
}) => {
  const { t } = useLanguage();
  
  // Determine the color based on the score
  const getScoreColor = () => {
    if (score < 20) return 'text-green-500';
    if (score < 40) return 'text-yellow-500';
    return 'text-red-500';
  };
  
  // Determine gauge dimensions based on size
  const getDimensions = () => {
    switch (size) {
      case 'small': return { gauge: 'w-16 h-8', indicatorSize: 'w-0.5 h-3', bottomHeight: 'h-0.5' };
      case 'medium': return { gauge: 'w-24 h-12', indicatorSize: 'w-1 h-5', bottomHeight: 'h-1' };
      case 'large': return { gauge: 'w-32 h-16', indicatorSize: 'w-1.5 h-6', bottomHeight: 'h-1.5' };
    }
  };
  
  // Get gauge size classes
  const { gauge, indicatorSize, bottomHeight } = getDimensions();
  
  // Get appropriate emoticon based on score
  const getEmoticon = () => {
    const iconProps = { className: `${getScoreColor()} h-6 w-6` };
    
    if (score < 15) return <LucideSmilePlus {...iconProps} />;
    if (score < 30) return <LucideSmile {...iconProps} />;
    if (score < 50) return <LucideMeh {...iconProps} />;
    if (score < 70) return <LucideFrown {...iconProps} />;
    return <LucideAngry {...iconProps} />;
  };
  
  // Get text size based on gauge size
  const getTextSize = () => {
    switch (size) {
      case 'small': return 'text-base';
      case 'medium': return 'text-xl';
      case 'large': return 'text-2xl';
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className={`relative ${gauge} mb-1`}>
        <div 
          className="absolute inset-0 bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 rounded-t-full overflow-hidden" 
          style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)' }}
        ></div>
        
        {/* Center emoticon */}
        {showEmoticon && (
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
            {getEmoticon()}
          </div>
        )}
        
        {/* Indicator needle */}
        <div 
          className={`absolute bottom-0 left-1/2 ${indicatorSize} bg-black dark:bg-white transform -translate-x-1/2`} 
          style={{ transform: `translateX(calc(${score}% - 50%))` }}
        ></div>
        
        <div className={`absolute bottom-0 left-0 right-0 ${bottomHeight} bg-black dark:bg-white`}></div>
      </div>
      
      {showValue && (
        <div className={`${getScoreColor()} ${getTextSize()} font-bold`}>
          {score}%
        </div>
      )}
    </div>
  );
};

export default SimilarityGauge;
