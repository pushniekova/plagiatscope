
import { useState, useEffect } from 'react';
import MainLayout from '@/layouts/MainLayout';
import { analyzePlagiarism } from '@/lib/textProcessing';
import { useToast } from '@/hooks/use-toast';
import { Match, ExternalSource } from '@/components/results/types';

// Import refactored components
import CheckHeader from '@/components/check/CheckHeader';
import CheckInput from '@/components/check/CheckInput';
import CheckResults from '@/components/check/CheckResults';
import CheckFeatures from '@/components/check/CheckFeatures';

const CheckPage = () => {
  const [text, setText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<{
    overallScore: number;
    matches: Match[];
    externalSources: ExternalSource[];
  }>({ 
    overallScore: 0, 
    matches: [],
    externalSources: [] 
  });
  
  const { toast } = useToast();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  return (
    <MainLayout>
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-transparent dark:from-blue-950/20 dark:to-transparent -z-10"></div>
        
        <div className="container mx-auto px-6 relative">
          {/* Header component */}
          <CheckHeader />
          
          {/* Input component */}
          <div className="max-w-3xl mx-auto">
            <CheckInput
              onAnalyze={handleAnalyze}
              text={text}
              onTextChange={handleTextChange}
              isAnalyzing={isAnalyzing}
            />
          </div>
        </div>
      </section>
      
      {/* Results section */}
      {showResults && (
        <CheckResults 
          text={text}
          analysisResults={analysisResults}
        />
      )}
      
      {/* Features section */}
      <CheckFeatures />
    </MainLayout>
  );
};

// Need to import the useLanguage hook for t() function
import { useLanguage } from '@/contexts/LanguageContext';
const { t } = useLanguage();

export default CheckPage;
