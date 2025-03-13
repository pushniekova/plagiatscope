
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Match } from './types';

interface HighlightedTextTabProps {
  originalText: string;
  matches: Match[];
}

const HighlightedTextTab: React.FC<HighlightedTextTabProps> = ({ 
  originalText, 
  matches 
}) => {
  const { t } = useLanguage();

  // Function to generate HTML with highlighted matches
  const getHighlightedText = () => {
    if (!matches.length) return originalText;

    // Sort matches by startIndex to process them in order
    const sortedMatches = [...matches].sort((a, b) => a.startIndex - b.startIndex);
    
    let result = '';
    let lastIndex = 0;
    
    for (const match of sortedMatches) {
      // Add text before the match
      result += originalText.substring(lastIndex, match.startIndex);
      
      // Add the matched text with highlighting
      result += `<mark class="bg-yellow-200 dark:bg-yellow-900 px-1 rounded" data-source="${match.source}" data-percentage="${match.matchPercentage}%">`;
      result += originalText.substring(match.startIndex, match.endIndex);
      result += '</mark>';
      
      lastIndex = match.endIndex;
    }
    
    // Add any remaining text after the last match
    result += originalText.substring(lastIndex);
    
    return result;
  };

  return (
    <div className="p-4">
      <div 
        className="whitespace-pre-wrap text-foreground bg-white dark:bg-slate-900 border border-border rounded-lg p-4 max-h-[500px] overflow-y-auto"
        dangerouslySetInnerHTML={{ __html: getHighlightedText() }}
      />
      {matches.length === 0 && (
        <div className="mt-4 text-center p-4 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-lg">
          {t('results.noPlagiarism')}
        </div>
      )}
    </div>
  );
};

export default HighlightedTextTab;
