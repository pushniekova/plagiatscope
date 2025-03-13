
import React, { useState, useEffect } from 'react';
import { AlertTriangle, Sparkles } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import TextInput from '@/components/TextInput';
import FileUpload from '@/components/FileUpload';

interface CheckInputProps {
  onAnalyze: () => void;
  text: string;
  onTextChange: (text: string) => void;
  isAnalyzing: boolean;
}

const CheckInput: React.FC<CheckInputProps> = ({ 
  onAnalyze, 
  text, 
  onTextChange, 
  isAnalyzing 
}) => {
  const { t } = useLanguage();
  const { toast } = useToast();

  const handleTextChange = (newText: string) => {
    onTextChange(newText);
  };

  const handleFileContent = (content: string) => {
    onTextChange(content);
    toast({
      title: t('check.fileUploaded'),
      description: t('check.fileLoadedMessage'),
    });
  };

  return (
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
          onClick={onAnalyze}
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
  );
};

// Need to import FileText which was missing
import { FileText } from 'lucide-react';

export default CheckInput;
