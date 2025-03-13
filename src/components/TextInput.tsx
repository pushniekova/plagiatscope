
import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface TextInputProps {
  onTextChange: (text: string) => void;
  placeholder?: string;
  initialValue?: string;
  minHeight?: string;
}

const TextInput: React.FC<TextInputProps> = ({ 
  onTextChange, 
  placeholder,
  initialValue = "",
  minHeight = "200px"
}) => {
  const [text, setText] = useState(initialValue);
  const { t } = useLanguage();
  
  useEffect(() => {
    setText(initialValue);
  }, [initialValue]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setText(newText);
    onTextChange(newText);
  };

  return (
    <div className="w-full">
      <textarea
        value={text}
        onChange={handleTextChange}
        placeholder={placeholder || t('textInput.placeholder')}
        className="w-full rounded-lg border border-input bg-background p-4 text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all resize-y"
        style={{ minHeight }}
      />
      <div className="mt-2 text-xs text-muted-foreground text-right">
        {text.length} {t('textInput.characters')}
      </div>
    </div>
  );
};

export default TextInput;
