
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import NavLinks from './NavLinks';
import AuthButtons from './AuthButtons';

interface MobileMenuProps {
  isOpen: boolean;
}

const MobileMenu = ({ isOpen }: MobileMenuProps) => {
  const { t } = useLanguage();

  if (!isOpen) return null;

  return (
    <div className="md:hidden absolute top-full left-0 right-0 glass shadow-md animate-fade-in">
      <div className="container mx-auto px-6 py-4 flex flex-col space-y-4">
        <NavLinks isMobile />
        <AuthButtons isMobile />
        
        <Link
          to="/check"
          className="button-gradient text-white px-4 py-2 rounded-lg text-center transition-all hover:brightness-110 active:brightness-90 text-sm font-medium no-underline"
        >
          {t('nav.checkText')}
        </Link>
      </div>
    </div>
  );
};

export default MobileMenu;
