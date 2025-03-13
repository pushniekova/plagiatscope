
import React from 'react';
import { FileText, Download } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useLanguage } from '@/contexts/LanguageContext';

interface DocumentTitleBarProps {
  documentName: string;
  onDownloadReport: () => void;
}

const DocumentTitleBar: React.FC<DocumentTitleBarProps> = ({ documentName, onDownloadReport }) => {
  const { t } = useLanguage();

  return (
    <div className="bg-muted/50 p-4 border-b border-border flex items-center justify-between">
      <div className="flex items-center">
        <FileText className="mr-2 h-5 w-5 text-muted-foreground" />
        <h2 className="text-lg font-medium">{documentName}</h2>
      </div>
      <Button 
        variant="outline" 
        size="sm"
        className="gap-1.5"
        onClick={onDownloadReport}
      >
        <Download className="h-4 w-4" />
        {t('results.downloadReport')}
      </Button>
    </div>
  );
};

export default DocumentTitleBar;
