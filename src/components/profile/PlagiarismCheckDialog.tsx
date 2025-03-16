
import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { useChecksHistory } from '@/hooks/use-checks-history';
import { useAuth } from '@clerk/clerk-react';
import ResultsViewer from '@/components/ResultsViewer';
import TextAnalysisForm from './plagiarismCheck/TextAnalysisForm';
import { generateMockMatches } from './plagiarismCheck/MockData';
import { analyzePlagiarismText } from './plagiarismCheck/PlagiarismAnalyzer';
import { checkResultsService } from '@/lib/services/checkResultsService';

interface PlagiarismCheckDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PlagiarismCheckDialog: React.FC<PlagiarismCheckDialogProps> = ({ 
  open, 
  onOpenChange 
}) => {
  const [text, setText] = useState('');
  const [documentName, setDocumentName] = useState('document.txt');
  const [activeTab, setActiveTab] = useState('write');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [plagiarismScore, setPlagiarismScore] = useState(0);
  
  const { t } = useLanguage();
  const { toast } = useToast();
  const { userId } = useAuth();
  const { createCheck, isCreating } = useChecksHistory();

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
      // Create a record in the database via the checks history service
      createCheck({
        documentName,
        textContent: text
      });
      
      // Analyze the text
      const results = await analyzePlagiarismText(text);
      setPlagiarismScore(results.overallScore);
      
      // Generate mock matches for display
      const mockMatches = generateMockMatches(text);
      
      // Save to the database if user is logged in
      if (userId) {
        try {
          await checkResultsService.saveCheckResult({
            user_id: userId,
            document_name: documentName,
            text_content: text,
            overall_score: results.overallScore,
            matches: mockMatches,
            external_sources: []
          });
          console.log('Successfully saved detailed check result to database');
        } catch (error) {
          console.error('Error saving detailed check result:', error);
        }
      }
      
      setShowResults(true);
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

  // Generate mock matches for the results viewer
  const mockMatches = generateMockMatches(text);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>{t('profile.services.premiumTextCheck.title')}</DialogTitle>
          <DialogDescription>
            {t('profile.services.premiumTextCheck.description')}
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="flex-1 pr-4">
          {!showResults ? (
            <TextAnalysisForm
              text={text}
              onTextChange={handleTextChange}
              onFileUpload={handleFileUpload}
              onAnalyze={handleAnalyze}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              isAnalyzing={isAnalyzing}
            />
          ) : (
            <ResultsViewer 
              originalText={text}
              overallScore={plagiarismScore}
              matches={mockMatches}
              documentName={documentName}
              analyzedCharacters={text.length}
              externalSources={[]}
            />
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default PlagiarismCheckDialog;
