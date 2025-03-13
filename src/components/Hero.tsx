
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import ColorfulMascot from './ColorfulMascot';

const Hero = () => {
  const { t } = useLanguage();

  return (
    <section className="pt-32 pb-16 md:pt-40 md:pb-24 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-transparent dark:from-blue-950/20 dark:to-transparent -z-10"></div>
      
      {/* Background circle decorations */}
      <div className="absolute left-1/4 top-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-slow -z-10"></div>
      <div className="absolute right-1/4 bottom-1/4 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-pulse-slow animation-delay-400 -z-10"></div>
      
      <div className="container mx-auto px-6 relative">
        {/* Colorful Mascot */}
        <div className="absolute top-0 right-10 hidden lg:block">
          <ColorfulMascot size="lg" />
        </div>
        
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block animate-slide-in-down">
            <span className="inline-block button-gradient text-white rounded-full px-3 py-1 text-sm font-medium mb-6">
              {t('hero.badge')}
            </span>
          </div>
          
          <h1 
            className="text-4xl md:text-6xl font-medium leading-tight md:leading-tight mb-6 animate-slide-in-up"
            dangerouslySetInnerHTML={{ __html: t('hero.title').replace('<span>', '<span class="rainbow-text">').replace('</span>', '</span>') }}
          />
          
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto animate-slide-in-up animation-delay-200">
            {t('hero.description')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-slide-in-up animation-delay-400">
            <Link
              to="/check"
              className="button-gradient text-white px-8 py-3 rounded-lg font-medium transition-all hover:shadow-lg hover:shadow-primary/30 active:scale-95 flex items-center justify-center"
            >
              {t('hero.checkButton')}
              <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              to="/about"
              className="bg-white/80 backdrop-blur-sm text-foreground border border-secondary/30 px-8 py-3 rounded-lg font-medium transition-all hover:bg-secondary/10 flex items-center justify-center"
            >
              {t('hero.learnMore')}
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto animate-fade-in animation-delay-600">
            <div className="card-gradient rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/20 text-primary mx-auto mb-4 animated-float animation-delay-200">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search">
                  <circle cx="11" cy="11" r="8"/>
                  <path d="m21 21-4.3-4.3"/>
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2">{t('feature.analysis.title')}</h3>
              <p className="text-muted-foreground text-sm">{t('feature.analysis.description')}</p>
            </div>
            
            <div className="card-gradient rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-secondary/20 text-secondary mx-auto mb-4 animated-float animation-delay-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-zap">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2">{t('feature.fast.title')}</h3>
              <p className="text-muted-foreground text-sm">{t('feature.fast.description')}</p>
            </div>
            
            <div className="card-gradient rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-accent/20 text-accent mx-auto mb-4 animated-float animation-delay-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-text">
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
                  <polyline points="14 2 14 8 20 8"/>
                  <line x1="16" x2="8" y1="13" y2="13"/>
                  <line x1="16" x2="8" y1="17" y2="17"/>
                  <line x1="10" x2="8" y1="9" y2="9"/>
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2">{t('feature.reports.title')}</h3>
              <p className="text-muted-foreground text-sm">{t('feature.reports.description')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
