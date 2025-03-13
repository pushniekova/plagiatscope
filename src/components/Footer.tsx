
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Heart, Sparkles } from 'lucide-react';

const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary/10 pt-16 border-t border-secondary/10 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-1/4 w-32 h-32 bg-primary/5 rounded-full blur-2xl"></div>
      <div className="absolute bottom-0 right-1/4 w-32 h-32 bg-accent/5 rounded-full blur-2xl"></div>
      
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          <div className="md:col-span-2">
            <Link to="/" className="inline-flex items-center gap-2 mb-4 no-underline">
              <span className="button-gradient text-white p-1 rounded-md flex items-center justify-center">
                <Sparkles className="h-5 w-5" />
              </span>
              <span className="text-xl font-bold rainbow-text">ForgenHub</span>
            </Link>
            <p className="text-muted-foreground md:max-w-xs">
              {t('footer.description')}
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">{t('footer.navigation')}</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-muted-foreground hover:text-primary transition-colors">{t('nav.home')}</Link></li>
              <li><Link to="/check" className="text-muted-foreground hover:text-primary transition-colors">{t('nav.check')}</Link></li>
              <li><Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">{t('nav.about')}</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">{t('footer.legal')}</h3>
            <ul className="space-y-2">
              <li><Link to="#" className="text-muted-foreground hover:text-primary transition-colors">{t('footer.terms')}</Link></li>
              <li><Link to="#" className="text-muted-foreground hover:text-primary transition-colors">{t('footer.privacy')}</Link></li>
              <li><Link to="#" className="text-muted-foreground hover:text-primary transition-colors">{t('footer.cookies')}</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-secondary/10 py-6 flex flex-col md:flex-row items-center justify-between">
          <p className="text-muted-foreground text-sm">
            {t('footer.copyright').replace('{year}', currentYear.toString())}
          </p>
          <p className="text-muted-foreground text-sm flex items-center gap-1 mt-2 md:mt-0">
            {t('footer.tagline')}
            <Heart className="h-4 w-4 text-pink-500 animated-pulse-slow" />
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
