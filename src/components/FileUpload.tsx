
import { useState, useRef } from 'react';
import { Upload, X, FileText } from 'lucide-react';

interface FileUploadProps {
  onFileContent: (content: string) => void;
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
      setError("File is too large. Maximum size is 5MB.");
      return;
    }

    // Check file type
    const fileType = file.type;
    if (!fileType.match(/(text\/plain|application\/pdf|application\/msword|application\/vnd.openxmlformats-officedocument.wordprocessingml.document)/)) {
      setError("Unsupported file type. Please upload a TXT, DOC, DOCX, or PDF file.");
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
        onFileContent(content);
      };
      reader.readAsText(file);
    } else {
      // For demo purposes, we'll just extract the file name as content
      // In a real app, you'd send this to a backend service for proper conversion
      onFileContent(`[Content extracted from ${file.name}] This is simulated content for demo purposes.`);
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
          <h3 className="text-lg font-medium mb-2">Upload a file</h3>
          <p className="text-muted-foreground mb-2">
            Drag and drop a file here or click to browse
          </p>
          <p className="text-xs text-muted-foreground">
            Supported formats: TXT, DOC, DOCX, PDF (Max 5MB)
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
              aria-label="Remove file"
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
