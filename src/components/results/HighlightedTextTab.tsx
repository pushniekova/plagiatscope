
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
      
      // Generate a unique match ID
      const matchId = `match-${match.startIndex}-${match.endIndex}`;
      
      // Add the matched text with highlighting
      result += `<mark 
        class="bg-yellow-200 dark:bg-yellow-900/70 px-1 rounded relative group" 
        data-source="${match.source}" 
        data-percentage="${match.matchPercentage}%"
        id="${matchId}"
      >`;
      result += originalText.substring(match.startIndex, match.endIndex);
      
      // Add the tooltip with match info
      result += `<span class="absolute hidden group-hover:block z-10 bottom-full left-0 mb-2 w-60 bg-black text-white text-xs rounded p-2 shadow-lg pointer-events-none">
        <strong>${match.source}</strong> - ${match.matchPercentage}% ${t('results.match')}
      </span>`;
      
      result += '</mark>';
      
      // Add a superscript number
      const matchNumber = sortedMatches.indexOf(match) + 1;
      result += `<sup class="text-xs font-bold text-primary">${matchNumber}</sup>`;
      
      lastIndex = match.endIndex;
    }
    
    // Add any remaining text after the last match
    result += originalText.substring(lastIndex);
    
    return result;
  };

  return (
    <div className="p-4">
      <div 
        className="whitespace-pre-wrap text-foreground bg-white dark:bg-slate-900 border border-border rounded-lg p-4 max-h-[500px] overflow-y-auto leading-relaxed"
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
