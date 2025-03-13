
import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import ProfileLayout from '@/layouts/ProfileLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import TextCheckAnalysisForm from '@/components/profile/textCheck/TextCheckAnalysisForm';
import TextCheckResults from '@/components/profile/textCheck/TextCheckResults';
import { useToast } from '@/hooks/use-toast';

const TextCheckPage: React.FC = () => {
  const [text, setText] = useState('');
  const [documentName, setDocumentName] = useState('документ.txt');
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
    
    toast({
      title: t('check.fileUploaded'),
      description: t('check.fileLoadedMessage'),
    });
    
    if (showResults) {
      setShowResults(false);
    }
  };

  const handleAnalyzeComplete = (score: number) => {
    setPlagiarismScore(score);
    setShowResults(true);
    
    // Scroll to results after a brief delay
    setTimeout(() => {
      document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleGoBack = () => {
    navigate('/profile/services');
  };

  const handleResetResults = () => {
    setShowResults(false);
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
          <CardContent>
            <TextCheckAnalysisForm 
              onAnalyzeComplete={handleAnalyzeComplete}
              text={text}
              onTextChange={handleTextChange}
              onFileUpload={handleFileUpload}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </CardContent>
        </Card>
        
        {/* Results section */}
        {showResults && (
          <TextCheckResults 
            plagiarismScore={plagiarismScore}
            documentName={documentName}
            text={text}
            onGoBack={handleResetResults}
          />
        )}
      </div>
    </ProfileLayout>
  );
};

export default TextCheckPage;
