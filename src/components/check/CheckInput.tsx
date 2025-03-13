
import React from 'react';
import { Sparkles, AlertTriangle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import TextInput from '@/components/TextInput';
import FileUpload from '@/components/FileUpload';

interface CheckInputProps {
  text: string;
  onTextChange: (text: string) => void;
  onFileUpload?: (content: string, filename: string) => void;
  onAnalyze: () => void;
  isAnalyzing: boolean;
}

const CheckInput: React.FC<CheckInputProps> = ({
  text,
  onTextChange,
  onFileUpload,
  onAnalyze,
  isAnalyzing,
}) => {
  const { t } = useLanguage();

  const handleFileContent = (content: string, filename?: string) => {
    onTextChange(content);
    if (onFileUpload && filename) {
      onFileUpload(content, filename);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">{t('check.pasteText')}</h3>
          <TextInput
            onTextChange={onTextChange}
            initialValue={text}
            minHeight="240px"
            placeholder={t('check.textPlaceholder')}
          />
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-medium">{t('check.uploadFile')}</h3>
          <FileUpload onFileContent={handleFileContent} />
        </div>
      </div>
      
      <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 flex items-start gap-3">
        <AlertTriangle className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="font-medium text-blue-800 dark:text-blue-400 mb-1">
            {t('check.noticeTitle')}
          </h4>
          <p className="text-sm text-blue-700 dark:text-blue-500">
            {t('check.noticeText')}
          </p>
        </div>
      </div>
      
      <div className="flex justify-center">
        <Button 
          onClick={onAnalyze}
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
              {t('check.checkButton')}
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default CheckInput;
