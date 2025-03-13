
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

interface NavLinksProps {
  isMobile?: boolean;
}

const NavLinks = ({ isMobile = false }: NavLinksProps) => {
  const location = useLocation();
  const { t } = useLanguage();

  const navLinks = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.check'), path: '/check' },
    { name: t('nav.about'), path: '/about' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  if (isMobile) {
    return (
      <>
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors no-underline ${
              isActive(link.path) 
                ? 'bg-primary/10 text-primary' 
                : 'text-muted-foreground hover:bg-secondary/10'
            }`}
          >
            {link.name}
          </Link>
        ))}
      </>
    );
  }

  return (
    <>
      {navLinks.map((link) => (
        <Link
          key={link.path}
          to={link.path}
          className={`text-sm font-medium transition-colors hover:text-primary ${
            isActive(link.path) 
              ? 'text-primary' 
              : 'text-muted-foreground'
          } relative no-underline`}
        >
          {link.name}
          {isActive(link.path) && (
            <span className="absolute left-0 right-0 -bottom-1 h-0.5 button-gradient rounded-full"></span>
          )}
        </Link>
      ))}
    </>
  );
};

export default NavLinks;
