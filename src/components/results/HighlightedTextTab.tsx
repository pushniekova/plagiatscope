
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
      
      // Calculate color intensity based on match percentage (higher = more intense highlighting)
      const intensityClass = match.matchPercentage > 80 
        ? 'bg-red-200 dark:bg-red-900/70' 
        : match.matchPercentage > 50 
          ? 'bg-yellow-200 dark:bg-yellow-900/70' 
          : 'bg-amber-100 dark:bg-amber-900/50';
      
      // Add the matched text with highlighting and source attribution
      result += `<mark 
        class="${intensityClass} px-1 rounded relative group cursor-help" 
        data-source="${match.source}" 
        data-percentage="${match.matchPercentage}%"
        id="${matchId}"
        title="${match.source} - ${match.matchPercentage}% ${t('results.match')}"
      >`;
      result += originalText.substring(match.startIndex, match.endIndex);
      
      // Add the tooltip with match info
      result += `<span class="absolute hidden group-hover:block z-10 bottom-full left-0 mb-2 w-64 bg-black/90 text-white text-xs rounded p-2 shadow-lg pointer-events-none">
        <strong>${match.source}</strong> - ${match.matchPercentage}% ${t('results.match')}
        ${match.sourceUrl ? `<br/><a href="${match.sourceUrl}" target="_blank" class="text-blue-300 hover:underline">View source</a>` : ''}
      </span>`;
      
      result += '</mark>';
      
      // Add a superscript number for reference
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
      
      {matches.length > 0 && (
        <div className="mt-4 text-sm text-muted-foreground">
          <p>{t('results.highlightedTextHelp')}</p>
        </div>
      )}
    </div>
  );
};

export default HighlightedTextTab;
