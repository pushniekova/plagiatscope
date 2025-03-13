
import React, { useState, useEffect } from 'react';
import { ArrowLeft, AlertTriangle, Sparkles, FileText, Upload, PenTool, Check, XCircle } from 'lucide-react';
import ProfileLayout from '@/layouts/ProfileLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import TextInput from '@/components/TextInput';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import FileUpload from '@/components/FileUpload';

const TextCheckPage: React.FC = () => {
  const [text, setText] = useState('');
  const [documentName, setDocumentName] = useState('документ.txt');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [plagiarismScore, setPlagiarismScore] = useState(0);
  const [activeTab, setActiveTab] = useState('write');
  
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    document.title = t('profile.services.serviceTitle1');
  }, [t]);

  const handleTextChange = (newText: string) => {
    setText(newText);
    if (showResults) {
      setShowResults(false);
    }
  };

  const handleFileUpload = (content: string, filename?: string) => {
    setText(content);
    if (filename) {
      setDocumentName(filename);
    }
    setActiveTab('upload');
    
    toast({
      title: t('check.fileUploaded'),
      description: t('check.fileLoadedMessage'),
    });
    
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
      // Simulate analysis delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate a random plagiarism score for demonstration
      const randomScore = Math.floor(Math.random() * 100);
      setPlagiarismScore(randomScore);
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

  // Function to determine the risk level based on the plagiarism score
  const getRiskLevel = () => {
    if (plagiarismScore < 20) return { text: 'Низький', color: 'text-green-500', icon: Check };
    if (plagiarismScore < 50) return { text: 'Середній', color: 'text-amber-500', icon: AlertTriangle };
    return { text: 'Високий', color: 'text-red-500', icon: XCircle };
  };

  const riskLevel = getRiskLevel();

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
            <Tabs defaultValue="write" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="write" className="flex items-center gap-2">
                  <PenTool className="h-4 w-4" />
                  <span>{t('check.pasteText')}</span>
                </TabsTrigger>
                <TabsTrigger value="upload" className="flex items-center gap-2">
                  <Upload className="h-4 w-4" />
                  <span>{t('check.uploadFile')}</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="write" className="space-y-4">
                <TextInput
                  onTextChange={handleTextChange}
                  initialValue={text}
                  minHeight="240px"
                  placeholder={t('profile.services.premiumTextCheck.placeholder')}
                />
              </TabsContent>
              
              <TabsContent value="upload" className="space-y-4">
                <FileUpload onFileContent={handleFileUpload} />
                {text && activeTab === 'upload' && (
                  <div className="mt-4">
                    <h3 className="text-lg font-medium mb-2">Попередній перегляд:</h3>
                    <div className="max-h-60 overflow-y-auto border rounded-md p-4 bg-muted/30">
                      <p className="whitespace-pre-wrap">{text.slice(0, 500)}{text.length > 500 ? '...' : ''}</p>
                    </div>
                    <div className="mt-2 text-xs text-muted-foreground">
                      {text.length} символів
                    </div>
                  </div>
                )}
              </TabsContent>
            </Tabs>
            
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
                          <riskLevel.icon className="h-5 w-5" />
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
                    onClick={() => setShowResults(false)}
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
        )}
      </div>
    </ProfileLayout>
  );
};

export default TextCheckPage;
