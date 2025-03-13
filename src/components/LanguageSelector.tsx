
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
      <DropdownMenuTrigger className="flex items-center gap-1 px-2 py-1 rounded-md hover:bg-secondary transition-colors">
        <Globe size={18} />
        <span className="hidden md:inline-block ml-1">{languages.find(l => l.code === language)?.name}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setLanguage(lang.code)}
          >
            {language === lang.code && <Check className="w-4 h-4" />}
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
