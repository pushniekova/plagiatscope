
import { useState, useEffect } from 'react';
import MainLayout from '@/layouts/MainLayout';
import { analyzePlagiarism } from '@/lib/textProcessing';
import { useToast } from '@/hooks/use-toast';
import { Match, ExternalSource, QueueStatus } from '@/components/results/types';
import { useLanguage } from '@/contexts/LanguageContext';

// Import refactored components
import CheckHeader from '@/components/check/CheckHeader';
import CheckInput from '@/components/check/CheckInput';
import CheckResults from '@/components/check/CheckResults';
import CheckFeatures from '@/components/check/CheckFeatures';
import SimilarityGauge from '@/components/results/SimilarityGauge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const CheckPage = () => {
  const [text, setText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [documentName, setDocumentName] = useState('document.txt');
  const [showQueueStatus, setShowQueueStatus] = useState(false);
  const [showScientificOffer, setShowScientificOffer] = useState(false);
  const [queueStatus, setQueueStatus] = useState<QueueStatus | null>(null);
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
  const { t } = useLanguage();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleTextChange = (newText: string) => {
    setText(newText);
    if (showResults) {
      setShowResults(false);
    }
    if (showQueueStatus) {
      setShowQueueStatus(false);
    }
    if (showScientificOffer) {
      setShowScientificOffer(false);
    }
  };

  const handleFileUpload = (content: string, filename: string) => {
    setText(content);
    setDocumentName(filename || 'document.txt');
    if (showResults) {
      setShowResults(false);
    }
    if (showQueueStatus) {
      setShowQueueStatus(false);
    }
    if (showScientificOffer) {
      setShowScientificOffer(false);
    }
  };

  const mockQueueAnalysis = () => {
    // Simulate entering the queue
    setShowQueueStatus(true);
    setQueueStatus({
      status: 'inQueue',
      position: 12,
      estimatedMinutes: 15,
      skipQueueAvailable: true,
      skipQueuePrice: '₴150',
      onSkipQueue: handleSkipQueue
    });
    
    // Scroll to queue status after a brief delay
    setTimeout(() => {
      document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleSkipQueue = () => {
    // Simulate skipping the queue and starting the analysis
    setShowQueueStatus(false);
    performAnalysis();
  };

  const performAnalysis = async () => {
    setIsAnalyzing(true);
    
    try {
      // Perform plagiarism analysis with our improved algorithm
      const results = await analyzePlagiarism(text);
      setAnalysisResults(results);
      
      // For demo purposes, sometimes show the scientific offer
      if (Math.random() > 0.5) {
        setShowScientificOffer(true);
      } else {
        setShowResults(true);
      }
      
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

  const handleAnalyze = async () => {
    if (!text.trim()) {
      toast({
        title: t('check.emptyText'),
        description: t('check.enterTextMessage'),
        variant: "destructive",
      });
      return;
    }

    // Simulate entering the queue (as a demonstration)
    // In a real system, this would depend on server load
    if (Math.random() > 0.5) {
      mockQueueAnalysis();
    } else {
      performAnalysis();
    }
  };

  const handleAddScientificCheck = () => {
    setShowScientificOffer(false);
    setShowResults(true);
    
    // In a real application, this would add the scientific check to the analysis
    toast({
      title: t('check.fileUploaded'),
      description: "Added scientific paper check to your analysis",
    });
    
    // Scroll to results after a brief delay
    setTimeout(() => {
      document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleSkipScientificCheck = () => {
    setShowScientificOffer(false);
    setShowResults(true);
    
    // Scroll to results after a brief delay
    setTimeout(() => {
      document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
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
              onFileUpload={handleFileUpload}
              isAnalyzing={isAnalyzing}
            />
          </div>
        </div>
      </section>
      
      {/* Queue Status */}
      {showQueueStatus && (
        <section id="results-section" className="py-12 bg-secondary/10">
          <div className="container mx-auto px-6">
            <div className="max-w-md mx-auto">
              <Card>
                <CardHeader className="pb-3 border-b">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-base font-medium">{documentName}</span>
                    </div>
                    <button className="text-muted-foreground hover:text-foreground rounded-full p-1 transition-colors">
                      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                      </svg>
                    </button>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center">
                    <div className="mb-2 text-center">
                      <div className="text-sm text-muted-foreground mb-2">
                        {t('results.similarityScore')}
                      </div>
                      
                      {/* Loading animation for the gauge */}
                      <div className="relative h-12 w-24">
                        <div className="absolute inset-0 bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 rounded-t-full overflow-hidden opacity-30"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="h-6 w-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-center mb-4">
                      <h3 className="text-lg font-medium text-muted-foreground mb-2">
                        {t('check.queueStatus.waiting')}
                      </h3>
                      <div className="text-xl font-bold mb-1">
                        {t('check.queueStatus.position', { position: queueStatus?.position || 0 })}
                      </div>
                      <div className="flex items-center justify-center gap-1 mb-4">
                        <div className="flex -space-x-2">
                          {[...Array(3)].map((_, i) => (
                            <div key={i} className={`w-6 h-6 rounded-full border-2 border-background ${i === 0 ? 'bg-primary' : 'bg-muted'}`}></div>
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {t('check.queueStatus.estimatedTime', { minutes: queueStatus?.estimatedMinutes || 15 })}
                      </p>
                    </div>
                    
                    {queueStatus?.skipQueueAvailable && (
                      <Button 
                        className="button-gradient text-white px-6 py-2 rounded-lg font-medium transition-all gap-2 items-center flex"
                        onClick={handleSkipQueue}
                      >
                        {t('check.queueStatus.skipQueue')}
                        <span className="ml-1 opacity-80">{queueStatus.skipQueuePrice}</span>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      )}
      
      {/* Scientific Papers Offer */}
      {showScientificOffer && (
        <section id="results-section" className="py-12 bg-secondary/10">
          <div className="container mx-auto px-6">
            <div className="max-w-lg mx-auto">
              <Card className="overflow-hidden border-2 border-primary/20">
                <div className="bg-primary/10 p-6 text-center">
                  <h2 className="text-xl font-bold text-center uppercase">
                    {t('results.scientificCheck.title')}
                  </h2>
                </div>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center">
                    <div className="w-24 h-24 bg-amber-400 rounded-full flex items-center justify-center mb-6">
                      <span className="text-4xl font-black text-black">doi</span>
                    </div>
                    
                    <p className="text-center mb-6">
                      {t('results.scientificCheck.description')}
                    </p>
                    
                    <div className="flex items-center gap-2 mb-8">
                      <span>{t('results.scientificCheck.price')}:</span>
                      <span className="flex items-center gap-1 font-medium">
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
                          <path d="M7.49991 0.876892C3.84222 0.876892 0.877075 3.84204 0.877075 7.49972C0.877075 11.1574 3.84222 14.1226 7.49991 14.1226C11.1576 14.1226 14.1227 11.1574 14.1227 7.49972C14.1227 3.84204 11.1576 0.876892 7.49991 0.876892ZM1.82707 7.49972C1.82707 4.36671 4.36689 1.82689 7.49991 1.82689C10.6329 1.82689 13.1727 4.36671 13.1727 7.49972C13.1727 10.6327 10.6329 13.1726 7.49991 13.1726C4.36689 13.1726 1.82707 10.6327 1.82707 7.49972ZM7.50003 4C7.77617 4 8.00003 4.22386 8.00003 4.5V7H10.0001C10.2762 7 10.5001 7.22386 10.5001 7.5C10.5001 7.77614 10.2762 8 10.0001 8H7.50003C7.22389 8 7.00003 7.77614 7.00003 7.5V4.5C7.00003 4.22386 7.22389 4 7.50003 4Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                        </svg>
                        150
                      </span>
                    </div>
                    
                    <div className="flex flex-col w-full gap-3">
                      <Button 
                        size="lg"
                        className="bg-green-500 hover:bg-green-600 w-full uppercase font-bold"
                        onClick={handleAddScientificCheck}
                      >
                        {t('results.scientificCheck.button')}
                      </Button>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-muted-foreground hover:text-foreground"
                        onClick={handleSkipScientificCheck}
                      >
                        {t('results.scientificCheck.skipButton')}
                        <ArrowRight className="ml-1 h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      )}
      
      {/* Results section */}
      {showResults && (
        <CheckResults 
          text={text}
          analysisResults={analysisResults}
          documentName={documentName}
        />
      )}
      
      {/* Features section */}
      <CheckFeatures />
    </MainLayout>
  );
};

export default CheckPage;
