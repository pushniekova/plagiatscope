
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  return (
    <footer className="py-12 bg-secondary/50">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link to="/" className="text-xl font-medium tracking-tight flex items-center gap-2 mb-3">
              <span className="bg-primary text-primary-foreground p-1 rounded-md">PS</span>
              <span>PlagiatScope</span>
            </Link>
            <p className="text-muted-foreground max-w-md">
              {t('footer.description')}
            </p>
          </div>

          <div>
            <h4 className="text-base font-medium mb-4">{t('footer.navigation')}</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <Link to="/check" className="text-muted-foreground hover:text-primary transition-colors">
                  {t('nav.check')}
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  {t('nav.about')}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-base font-medium mb-4">{t('footer.legal')}</h4>
            <ul className="space-y-2">
              <li>
                <Link to="#" className="text-muted-foreground hover:text-primary transition-colors">
                  {t('footer.terms')}
                </Link>
              </li>
              <li>
                <Link to="#" className="text-muted-foreground hover:text-primary transition-colors">
                  {t('footer.privacy')}
                </Link>
              </li>
              <li>
                <Link to="#" className="text-muted-foreground hover:text-primary transition-colors">
                  {t('footer.cookies')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border flex flex-col md:flex-row justify-between items-center text-muted-foreground text-sm">
          <p>{t('footer.copyright').replace('{year}', currentYear.toString())}</p>
          <div className="mt-4 md:mt-0">
            {t('footer.tagline')}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
