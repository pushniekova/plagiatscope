
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { BarChart, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';

interface SummaryTabProps {
  overallScore: number;
  matchesCount: number;
  textLength: number;
  paraphrasedPercentage?: number;
  improperCitationPercentage?: number;
}

const SummaryTab: React.FC<SummaryTabProps> = ({ 
  overallScore, 
  matchesCount, 
  textLength,
  paraphrasedPercentage = 0,
  improperCitationPercentage = 0
}) => {
  const { t } = useLanguage();

  // Function to get assessment icon based on score
  const getAssessmentIcon = (score: number) => {
    if (score < 20) return <CheckCircle className="h-5 w-5 text-green-500" />;
    if (score < 40) return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
    return <XCircle className="h-5 w-5 text-red-500" />;
  };

  // Extract document structure from analyzed text (simplified example)
  // In a real implementation, this would come from deeper analysis of the text
  const getDocumentStructure = () => {
    // Default structure for demonstration
    return [
      { title: 'ВСТУП', page: 4 },
      { title: 'РОЗДІЛ 1. ОСНОВНА ЧАСТИНА', page: 6 },
      { title: '1.1. Підрозділ перший', page: 8 },
      { title: '1.2. Підрозділ другий', page: 10 },
      { title: 'ВИСНОВКИ', page: 12 },
      { title: 'СПИСОК ВИКОРИСТАНИХ ДЖЕРЕЛ', page: 14 },
    ];
  };

  const documentStructure = getDocumentStructure();

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-muted p-4 rounded-lg text-center">
          <div className="text-2xl font-bold mb-1">{overallScore}%</div>
          <div className="text-muted-foreground text-sm">{t('results.similarityScore')}</div>
        </div>
        <div className="bg-muted p-4 rounded-lg text-center">
          <div className="text-2xl font-bold mb-1">{matchesCount}</div>
          <div className="text-muted-foreground text-sm">{t('results.sourcesFound')}</div>
        </div>
        <div className="bg-muted p-4 rounded-lg text-center">
          <div className="text-2xl font-bold mb-1">{textLength}</div>
          <div className="text-muted-foreground text-sm">{t('results.charactersAnalyzed')}</div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Document structure panel */}
        <div className="bg-white dark:bg-slate-900 border border-border rounded-lg p-4">
          <h4 className="font-medium mb-3 flex items-center gap-2">
            <BarChart className="h-4 w-4" />
            {t('results.documentStructure')}
          </h4>
          
          <div className="space-y-2">
            {documentStructure.map((item, index) => (
              <div key={index} className="flex justify-between items-center text-sm border-b border-border pb-1 last:border-0">
                <span className="text-muted-foreground">{item.title}</span>
                <span className="text-sm">{item.page}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Analysis summary panel */}
        <div className="bg-white dark:bg-slate-900 border border-border rounded-lg p-4">
          <h4 className="font-medium mb-3">{t('results.analysisSummary')}</h4>
          
          <div className="space-y-3">
            <div className="flex items-start gap-2">
              {getAssessmentIcon(overallScore)}
              <div>
                <p className="font-medium">
                  {t(`results.summary.${
                    overallScore < 20 ? 'low' : overallScore < 40 ? 'medium' : 'high'
                  }`)}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {t(`results.summaryDetail.${
                    overallScore < 20 ? 'low' : overallScore < 40 ? 'medium' : 'high'
                  }`)}
                </p>
              </div>
            </div>
            
            <div className="pt-3 border-t border-border">
              <h5 className="font-medium mb-2">{t('results.recommendations')}:</h5>
              <ul className="list-disc pl-5 text-muted-foreground space-y-1 text-sm">
                <li>{t('results.recommendation1')}</li>
                <li>{t('results.recommendation2')}</li>
                {overallScore > 20 && <li>{t('results.recommendation3')}</li>}
                {overallScore > 40 && <li>{t('results.recommendation4')}</li>}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryTab;
