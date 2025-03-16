
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';

export function useTextCheck() {
  const [text, setText] = useState('');
  const [documentName, setDocumentName] = useState('document.txt');
  const [showResults, setShowResults] = useState(false);
  const [showQueueStatus, setShowQueueStatus] = useState(false);
  const [showScientificOffer, setShowScientificOffer] = useState(false);
  const { toast } = useToast();
  const { t } = useLanguage();

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

  return {
    text,
    setText,
    documentName,
    setDocumentName,
    showResults,
    setShowResults,
    showQueueStatus, 
    setShowQueueStatus,
    showScientificOffer,
    setShowScientificOffer,
    handleTextChange,
    handleFileUpload,
    toast,
    t
  };
}
