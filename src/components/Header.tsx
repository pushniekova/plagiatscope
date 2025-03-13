
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSelector from './LanguageSelector';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    // Close mobile menu when route changes
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'py-3 glass shadow-sm' 
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="text-xl font-medium tracking-tight flex items-center gap-2 transition-transform hover:scale-[1.01] active:scale-[0.99]"
          >
            <span className="bg-primary text-primary-foreground p-1 rounded-md">PS</span>
            <span>PlagiatScope</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive(link.path) 
                    ? 'text-primary' 
                    : 'text-muted-foreground'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/check"
              className="bg-primary text-primary-foreground px-4 py-2 rounded-lg transition-all hover:brightness-110 active:brightness-90 text-sm font-medium"
            >
              {t('nav.checkText')}
            </Link>
            
            <LanguageSelector />
          </nav>

          {/* Mobile Menu Button and Language Selector */}
          <div className="md:hidden flex items-center gap-2">
            <LanguageSelector />
            <button 
              className="text-foreground p-1"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 glass shadow-md animate-fade-in">
          <div className="container mx-auto px-6 py-4 flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(link.path) 
                    ? 'bg-secondary text-foreground' 
                    : 'text-muted-foreground hover:bg-secondary/50'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/check"
              className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-center transition-all hover:brightness-110 active:brightness-90 text-sm font-medium"
            >
              {t('nav.checkText')}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
