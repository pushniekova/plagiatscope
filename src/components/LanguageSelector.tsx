
import { useLanguage, Language } from '@/contexts/LanguageContext';
import { Check, Globe } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

interface LanguageSelectorProps {
  variant?: 'default' | 'sidebar';
  showIcon?: boolean;
}

const LanguageSelector = ({ variant = 'default', showIcon = true }: LanguageSelectorProps) => {
  const { language, setLanguage, t } = useLanguage();
  
  const languages: { code: Language; name: string }[] = [
    { code: 'uk', name: t('language.uk') },
    { code: 'cs', name: t('language.cs') },
    { code: 'en', name: t('language.en') }
  ];

  // If in sidebar mode, display only the language name without container
  if (variant === 'sidebar') {
    return (
      <span className="truncate">
        {languages.find(l => l.code === language)?.name}
      </span>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 gap-1 px-2">
          {showIcon && <Globe size={16} className="flex-shrink-0" />}
          <span className="hidden md:inline-block truncate">
            {languages.find(l => l.code === language)?.name}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-[180px] bg-popover border border-border shadow-md z-50"
        sideOffset={5}
      >
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            className="flex items-center gap-2 cursor-pointer px-3 py-2"
            onClick={() => setLanguage(lang.code)}
          >
            <div className="w-4 flex-shrink-0 flex items-center justify-center">
              {language === lang.code && <Check className="h-4 w-4" />}
            </div>
            <span className={language === lang.code ? "font-medium" : ""}>
              {lang.name}
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;
