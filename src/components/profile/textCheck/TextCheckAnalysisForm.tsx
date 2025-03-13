
import React, { useState } from 'react';
import { AlertTriangle, Sparkles, PenTool, Upload } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TextInput from '@/components/TextInput';
import FileUpload from '@/components/FileUpload';
import { useToast } from '@/hooks/use-toast';

interface TextCheckAnalysisFormProps {
  onAnalyzeComplete: (score: number) => void;
  text: string;
  onTextChange: (text: string) => void;
  onFileUpload: (content: string, filename?: string) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TextCheckAnalysisForm: React.FC<TextCheckAnalysisFormProps> = ({ 
  onAnalyzeComplete,
  text,
  onTextChange,
  onFileUpload,
  activeTab,
  setActiveTab
}) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { t } = useLanguage();
  const { toast } = useToast();

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
      onAnalyzeComplete(randomScore);
      
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
    <div className="space-y-6">
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
            onTextChange={onTextChange}
            initialValue={text}
            minHeight="240px"
            placeholder={t('profile.services.premiumTextCheck.placeholder')}
          />
        </TabsContent>
        
        <TabsContent value="upload" className="space-y-4">
          <FileUpload onFileContent={onFileUpload} />
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
    </div>
  );
};

export default TextCheckAnalysisForm;
