
import { useLanguage, Language } from '@/contexts/LanguageContext';
import { Check, Globe } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

const LanguageSelector = () => {
  const { language, setLanguage, t } = useLanguage();
  
  const languages: { code: Language; name: string }[] = [
    { code: 'uk', name: t('language.uk') },
    { code: 'cs', name: t('language.cs') },
    { code: 'en', name: t('language.en') }
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center justify-center min-w-[40px] h-10 gap-1 px-3 py-1 rounded-md hover:bg-secondary transition-colors">
        <Globe size={18} />
        <span className="hidden md:inline-block ml-1">
          {languages.find(l => l.code === language)?.name}
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[160px] bg-popover border border-border shadow-md">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            className="flex items-center gap-2 cursor-pointer px-3 py-2"
            onClick={() => setLanguage(lang.code)}
          >
            <div className="w-4 flex-shrink-0">
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
