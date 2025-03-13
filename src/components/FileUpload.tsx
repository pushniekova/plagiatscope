
import { useState, useRef } from 'react';
import { Upload, X, FileText } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface FileUploadProps {
  onFileContent: (content: string, filename?: string) => void;
  accept?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({ 
  onFileContent, 
  accept = ".txt,.doc,.docx,.pdf" 
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { t } = useLanguage();

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const processFile = (file: File) => {
    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("Файл занадто великий (максимум 5MB)");
      return;
    }

    // Check file type
    const fileType = file.type;
    if (!fileType.match(/(text\/plain|application\/pdf|application\/msword|application\/vnd.openxmlformats-officedocument.wordprocessingml.document)/)) {
      setError("Непідтримуваний формат файлу");
      return;
    }

    setFile(file);
    setError(null);

    // For this demo, we'll only read text files
    // In a real application, you'd need to handle DOC, DOCX, and PDF conversion
    if (fileType === 'text/plain') {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        onFileContent(content, file.name);
      };
      reader.readAsText(file);
    } else {
      // For demo purposes, we'll just extract the file name as content
      onFileContent(`[Вміст з файлу ${file.name}] Симульований вміст файлу для демонстрації.`, file.name);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="w-full">
      <input
        type="file"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileInputChange}
        accept={accept}
      />
      
      {!file ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleBrowseClick}
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${
            isDragging 
              ? 'border-primary bg-primary/5' 
              : 'border-border hover:border-primary/50 hover:bg-secondary/50'
          }`}
        >
          <Upload className="mx-auto h-10 w-10 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">Завантажити файл</h3>
          <p className="text-muted-foreground mb-2">
            Перетягніть файл сюди або натисніть для вибору
          </p>
          <p className="text-xs text-muted-foreground">
            Підтримувані формати: TXT, DOC, DOCX, PDF
          </p>
        </div>
      ) : (
        <div className="border rounded-lg p-4">
          <div className="flex items-center">
            <div className="bg-primary/10 rounded-lg p-2 mr-3">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1 truncate">
              <p className="font-medium truncate">{file.name}</p>
              <p className="text-xs text-muted-foreground">
                {(file.size / 1024).toFixed(2)} KB
              </p>
            </div>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                handleRemoveFile();
              }}
              className="p-1 hover:bg-secondary rounded-full"
              aria-label="Видалити файл"
            >
              <X className="h-5 w-5 text-muted-foreground" />
            </button>
          </div>
        </div>
      )}
      
      {error && (
        <p className="mt-2 text-sm text-destructive">{error}</p>
      )}
    </div>
  );
};

export default FileUpload;
