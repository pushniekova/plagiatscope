import { useState, useEffect } from 'react';
import { AlertTriangle, Sparkles, Search, Globe, FileText } from 'lucide-react';
import MainLayout from '@/layouts/MainLayout';
import TextInput from '@/components/TextInput';
import FileUpload from '@/components/FileUpload';
import ResultsViewer from '@/components/ResultsViewer';
import { analyzePlagiarism } from '@/lib/textProcessing';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import ColorfulMascot from '@/components/ColorfulMascot';

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
          {/* Colorful mascot */}
          <div className="absolute -top-20 right-0 hidden lg:block z-10">
            <ColorfulMascot size="lg" />
          </div>
          
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block button-gradient text-white rounded-full px-3 py-1 text-sm font-medium mb-6">
                {t('check.badge')}
              </span>
              <h1 className="text-3xl md:text-5xl font-medium mb-6">
                {t('check.title')}
              </h1>
              <p className="text-lg text-muted-foreground">
                {t('check.description')}
              </p>
            </div>
            
            <div className="card-gradient rounded-xl shadow-lg overflow-hidden p-6 hover:shadow-xl transition-shadow">
              {/* Input method tabs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    {t('check.pasteText')}
                  </h3>
                  <TextInput 
                    onTextChange={handleTextChange} 
                    initialValue={text}
                    minHeight="240px"
                    placeholder={t('check.textPlaceholder')}
                  />
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                    <FileText className="h-5 w-5 text-secondary" />
                    {t('check.uploadFile')}
                  </h3>
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
                  className={`button-gradient text-white px-8 py-3 rounded-lg font-medium transition-all flex items-center gap-2 mx-auto ${
                    isAnalyzing || !text.trim()
                      ? 'opacity-70 cursor-not-allowed'
                      : 'hover:shadow-lg hover:shadow-primary/30 active:scale-95'
                  }`}
                >
                  {isAnalyzing ? (
                    <>
                      <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                      {t('check.analyzing')}
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-5 w-5" />
                      {t('check.checkButton')}
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Results section */}
      {showResults && (
        <section id="results-section" className="py-12 bg-secondary/10">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-medium mb-6 flex items-center gap-2">
                <Sparkles className="h-6 w-6 text-primary animated-sparkle" />
                {t('check.resultsTitle')}
              </h2>
              <ResultsViewer 
                originalText={text}
                overallScore={analysisResults.overallScore}
                matches={analysisResults.matches}
                externalSources={analysisResults.externalSources}
              />
            </div>
          </div>
        </section>
      )}
      
      {/* Features section */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-accent/5 rounded-full blur-3xl -z-10"></div>
        
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
                icon: <Search className="w-5 h-5" />,
                color: "text-primary"
              },
              {
                title: t('check.feature2.title'),
                description: t('check.feature2.description'),
                icon: <Globe className="w-5 h-5" />,
                color: "text-secondary"
              },
              {
                title: t('check.feature3.title'),
                description: t('check.feature3.description'),
                icon: <FileText className="w-5 h-5" />,
                color: "text-accent"
              }
            ].map((feature, index) => (
              <div key={index} className="card-gradient border border-white/10 rounded-xl p-6 group hover:shadow-lg transition-all hover:-translate-y-1">
                <div className={`w-10 h-10 flex items-center justify-center rounded-full bg-primary/10 ${feature.color} mb-4 group-hover:animated-bounce`}>
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
