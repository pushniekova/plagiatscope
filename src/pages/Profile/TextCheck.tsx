
import React, { useState, useEffect } from 'react';
import { ArrowLeft, AlertTriangle, Sparkles } from 'lucide-react';
import ProfileLayout from '@/layouts/ProfileLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import TextInput from '@/components/TextInput';
import ResultsViewer from '@/components/ResultsViewer';
import { analyzePlagiarism } from '@/lib/textProcessing';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';

const TextCheckPage: React.FC = () => {
  const [text, setText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<{
    overallScore: number;
    matches: Array<{
      text: string;
      startIndex: number;
      endIndex: number;
      matchPercentage: number;
      source: string;
      sourceUrl?: string;
    }>;
    externalSources: Array<{
      source: string;
      similarity: number;
      matchedText: string;
      sourceUrl: string;
    }>;
  }>({ 
    overallScore: 0, 
    matches: [],
    externalSources: [] 
  });
  
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleTextChange = (newText: string) => {
    setText(newText);
    if (showResults) {
      setShowResults(false);
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

    setIsAnalyzing(true);
    
    try {
      // Perform plagiarism analysis
      const results = await analyzePlagiarism(text);
      setAnalysisResults(results);
      setShowResults(true);
      
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

  const handleGoBack = () => {
    navigate('/profile/services');
  };

  return (
    <ProfileLayout activePage="services">
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={handleGoBack}
            className="h-8 w-8"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">{t('profile.services.serviceTitle1')}</h1>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>{t('profile.services.premiumTextCheck.title')}</CardTitle>
            <CardDescription>{t('profile.services.premiumTextCheck.description')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">{t('profile.services.premiumTextCheck.enterText')}</h3>
              <Textarea
                value={text}
                onChange={(e) => handleTextChange(e.target.value)}
                placeholder={t('profile.services.premiumTextCheck.placeholder')}
                className="min-h-[300px] resize-y"
              />
              <div className="text-xs text-muted-foreground text-right">
                {text.length} {t('textInput.characters')}
              </div>
            </div>
            
            <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-amber-800 dark:text-amber-400 mb-1">
                  {t('profile.services.premiumTextCheck.notice')}
                </h4>
                <p className="text-sm text-amber-700 dark:text-amber-500">
                  {t('profile.services.premiumTextCheck.noticeText')}
                </p>
              </div>
            </div>
            
            <div className="flex justify-center">
              <Button 
                onClick={handleAnalyze}
                disabled={isAnalyzing || !text.trim()}
                className="button-gradient text-white px-6 py-2 rounded-lg font-medium transition-all gap-2 items-center flex"
              >
                {isAnalyzing ? (
                  <>
                    <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                    {t('check.analyzing')}
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    {t('profile.services.premiumTextCheck.checkButton')}
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Results section */}
        {showResults && (
          <div id="results-section">
            <Card>
              <CardHeader>
                <CardTitle>{t('results.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <ResultsViewer 
                  originalText={text}
                  overallScore={analysisResults.overallScore}
                  matches={analysisResults.matches}
                  externalSources={analysisResults.externalSources}
                />
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </ProfileLayout>
  );
};

export default TextCheckPage;
