
import { useState, useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';
import MainLayout from '@/layouts/MainLayout';
import TextInput from '@/components/TextInput';
import FileUpload from '@/components/FileUpload';
import ResultsViewer from '@/components/ResultsViewer';
import { analyzePlagiarism } from '@/lib/textProcessing';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';

const CheckPage = () => {
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
    }>;
  }>({ overallScore: 0, matches: [] });
  
  const { toast } = useToast();
  const { t } = useLanguage();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleTextChange = (newText: string) => {
    setText(newText);
    if (showResults) {
      setShowResults(false);
    }
  };

  const handleFileContent = (content: string) => {
    setText(content);
    if (showResults) {
      setShowResults(false);
    }
    toast({
      title: t('check.fileUploaded'),
      description: t('check.fileLoadedMessage'),
    });
  };

  const handleAnalyze = () => {
    if (!text.trim()) {
      toast({
        title: t('check.emptyText'),
        description: t('check.enterTextMessage'),
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate API call to analyze text
    setTimeout(() => {
      const results = analyzePlagiarism(text);
      setAnalysisResults(results);
      setShowResults(true);
      setIsAnalyzing(false);
      
      // Scroll to results after a brief delay
      setTimeout(() => {
        document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }, 2000); // Simulated delay for analysis
  };

  return (
    <MainLayout>
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-transparent dark:from-blue-950/20 dark:to-transparent -z-10"></div>
        
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block bg-primary/10 text-primary rounded-full px-3 py-1 text-sm font-medium mb-6">
                {t('check.badge')}
              </span>
              <h1 className="text-3xl md:text-5xl font-medium mb-6">
                {t('check.title')}
              </h1>
              <p className="text-lg text-muted-foreground">
                {t('check.description')}
              </p>
            </div>
            
            <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden p-6">
              {/* Input method tabs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">{t('check.pasteText')}</h3>
                  <TextInput 
                    onTextChange={handleTextChange} 
                    initialValue={text}
                    minHeight="240px"
                    placeholder={t('check.textPlaceholder')}
                  />
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-4">{t('check.uploadFile')}</h3>
                  <FileUpload onFileContent={handleFileContent} />
                </div>
              </div>
              
              {/* Disclaimer */}
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6 flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-amber-800 mb-1">{t('check.noticeTitle')}</h4>
                  <p className="text-sm text-amber-700">
                    {t('check.noticeText')}
                  </p>
                </div>
              </div>
              
              {/* Analyze button */}
              <div className="text-center">
                <button 
                  onClick={handleAnalyze}
                  disabled={isAnalyzing || !text.trim()}
                  className={`bg-primary text-primary-foreground px-8 py-3 rounded-lg font-medium transition-all ${
                    isAnalyzing || !text.trim()
                      ? 'opacity-70 cursor-not-allowed'
                      : 'hover:brightness-110 active:brightness-90'
                  }`}
                >
                  {isAnalyzing ? t('check.analyzing') : t('check.checkButton')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Results section */}
      {showResults && (
        <section id="results-section" className="py-12 bg-secondary/30">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-medium mb-6">{t('check.resultsTitle')}</h2>
              <ResultsViewer 
                originalText={text}
                overallScore={analysisResults.overallScore}
                matches={analysisResults.matches}
              />
            </div>
          </div>
        </section>
      )}
      
      {/* Features section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-medium mb-4">
              {t('check.featuresTitle')}
            </h2>
            <p className="text-muted-foreground">
              {t('check.featuresDescription')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                title: t('check.feature1.title'),
                description: t('check.feature1.description'),
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                    <circle cx="11" cy="11" r="8"/>
                    <path d="m21 21-4.3-4.3"/>
                  </svg>
                )
              },
              {
                title: t('check.feature2.title'),
                description: t('check.feature2.description'),
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                    <path d="M2 12h20"/>
                  </svg>
                )
              },
              {
                title: t('check.feature3.title'),
                description: t('check.feature3.description'),
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
                    <polyline points="14 2 14 8 20 8"/>
                    <line x1="16" x2="8" y1="13" y2="13"/>
                    <line x1="16" x2="8" y1="17" y2="17"/>
                    <line x1="10" x2="8" y1="9" y2="9"/>
                  </svg>
                )
              }
            ].map((feature, index) => (
              <div key={index} className="bg-card border border-border rounded-xl p-6">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-medium mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default CheckPage;
