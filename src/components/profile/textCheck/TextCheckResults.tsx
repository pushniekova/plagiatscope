
import React from 'react';
import { FileText, ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface TextCheckResultsProps {
  plagiarismScore: number;
  documentName: string;
  text: string;
  onGoBack: () => void;
}

const TextCheckResults: React.FC<TextCheckResultsProps> = ({ 
  plagiarismScore, 
  documentName, 
  text,
  onGoBack
}) => {
  const { t } = useLanguage();

  // Function to determine the risk level based on the plagiarism score
  const getRiskLevel = () => {
    if (plagiarismScore < 20) return { text: 'Низький', color: 'text-green-500', icon: 'check' };
    if (plagiarismScore < 50) return { text: 'Середній', color: 'text-amber-500', icon: 'alert-triangle' };
    return { text: 'Високий', color: 'text-red-500', icon: 'x-circle' };
  };

  const riskLevel = getRiskLevel();

  return (
    <div id="results-section">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            {t('results.title')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1 space-y-4">
              <div className="text-center">
                <h3 className="text-lg font-medium mb-2">{documentName}</h3>
                <div className="text-sm text-muted-foreground">
                  {text.length} {t('results.charactersAnalyzed')}
                </div>
              </div>
              
              <div className="bg-secondary/20 rounded-lg p-6">
                <div className="text-center mb-6">
                  <h4 className="text-sm uppercase font-semibold text-muted-foreground mb-1">
                    {t('results.similarityScore')}
                  </h4>
                  <div className="relative mx-auto w-48 h-48">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-5xl font-bold">{plagiarismScore}%</div>
                    </div>
                    <svg viewBox="0 0 100 100" className="transform -rotate-90 w-full h-full">
                      <circle 
                        cx="50" cy="50" r="45" 
                        fill="transparent" 
                        stroke="currentColor" 
                        strokeWidth="10" 
                        className="text-muted/20" 
                      />
                      <circle 
                        cx="50" cy="50" r="45" 
                        fill="transparent" 
                        stroke="currentColor" 
                        strokeWidth="10" 
                        strokeDasharray={`${2 * Math.PI * 45}`}
                        strokeDashoffset={`${2 * Math.PI * 45 * (1 - plagiarismScore / 100)}`}
                        className={`
                          ${plagiarismScore < 20 ? 'text-green-500' : ''}
                          ${plagiarismScore >= 20 && plagiarismScore < 50 ? 'text-amber-500' : ''}
                          ${plagiarismScore >= 50 ? 'text-red-500' : ''}
                        `}
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                </div>
                
                <div className="flex items-center justify-center gap-2">
                  <div className={`flex items-center gap-2 text-lg font-semibold ${riskLevel.color}`}>
                    {riskLevel.icon === 'check' && <span className="h-5 w-5">✓</span>}
                    {riskLevel.icon === 'alert-triangle' && <span className="h-5 w-5">⚠️</span>}
                    {riskLevel.icon === 'x-circle' && <span className="h-5 w-5">✕</span>}
                    <span>{t('results.match')}: {riskLevel.text}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex-1 space-y-4">
              <h3 className="text-xl font-medium">{t('results.analysisSummary')}</h3>
              
              <div className="space-y-2 mb-6">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">
                    {t('results.similarityScore')}
                  </span>
                  <span className="text-sm font-medium">
                    {plagiarismScore}%
                  </span>
                </div>
                <Progress value={plagiarismScore} className={`
                  h-2.5 w-full
                  ${plagiarismScore < 20 ? 'bg-muted text-green-500' : ''}
                  ${plagiarismScore >= 20 && plagiarismScore < 50 ? 'bg-muted text-amber-500' : ''}
                  ${plagiarismScore >= 50 ? 'bg-muted text-red-500' : ''}
                `} />
              </div>
              
              <div className="space-y-4">
                <p className="text-base">
                  {plagiarismScore < 20 && t('results.summary.low')}
                  {plagiarismScore >= 20 && plagiarismScore < 50 && t('results.summary.medium')}
                  {plagiarismScore >= 50 && t('results.summary.high')}
                </p>
                
                <h4 className="font-medium">{t('results.recommendations')}</h4>
                <ul className="space-y-2 list-disc pl-5">
                  <li>{t('results.recommendation1')}</li>
                  <li>{t('results.recommendation2')}</li>
                  {plagiarismScore >= 20 && (
                    <>
                      <li>{t('results.recommendation3')}</li>
                      {plagiarismScore >= 50 && (
                        <li>{t('results.recommendation4')}</li>
                      )}
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center mt-8">
            <Button 
              onClick={onGoBack}
              variant="outline"
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              {t('profile.back')}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TextCheckResults;
