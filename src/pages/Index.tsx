
import { useEffect } from 'react';
import { ArrowRight, FileCheck, Users, BarChart } from 'lucide-react';
import { Link } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import Hero from '@/components/Hero';
import { useLanguage } from '@/contexts/LanguageContext';

const Index = () => {
  const { t } = useLanguage();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <MainLayout>
      <Hero />
      
      {/* How It Works Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="inline-block bg-primary/10 text-primary rounded-full px-3 py-1 text-sm font-medium mb-6">
              {t('howItWorks.badge')}
            </span>
            <h2 className="text-3xl md:text-4xl font-medium mb-6">
              {t('howItWorks.title')}
            </h2>
            <p className="text-muted-foreground text-lg">
              {t('howItWorks.description')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                step: t('howItWorks.step1.number'),
                title: t('howItWorks.step1.title'),
                description: t('howItWorks.step1.description'),
                icon: <FileCheck className="w-6 h-6" />
              },
              {
                step: t('howItWorks.step2.number'),
                title: t('howItWorks.step2.title'),
                description: t('howItWorks.step2.description'),
                icon: <BarChart className="w-6 h-6" />
              },
              {
                step: t('howItWorks.step3.number'),
                title: t('howItWorks.step3.title'),
                description: t('howItWorks.step3.description'),
                icon: <Users className="w-6 h-6" />
              }
            ].map((item, index) => (
              <div key={index} className="bg-card border border-border rounded-2xl p-8 relative">
                <div className="absolute -top-4 left-8 bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium">
                  {item.step}
                </div>
                <div className="mb-4 text-primary">
                  {item.icon}
                </div>
                <h3 className="text-xl font-medium mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link
              to="/check"
              className="inline-flex items-center bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium transition-all hover:brightness-110 active:brightness-90"
            >
              {t('howItWorks.tryItNow')}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="inline-block bg-primary/10 text-primary rounded-full px-3 py-1 text-sm font-medium mb-6">
              {t('features.badge')}
            </span>
            <h2 className="text-3xl md:text-4xl font-medium mb-6">
              {t('features.title')}
            </h2>
            <p className="text-muted-foreground text-lg">
              {t('features.description')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              {
                title: t('features.upload.title'),
                description: t('features.upload.description'),
                icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-text"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></svg>
              },
              {
                title: t('features.analysis.title'),
                description: t('features.analysis.description'),
                icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              },
              {
                title: t('features.reports.title'),
                description: t('features.reports.description'),
                icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-clipboard-list"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M12 11h4"/><path d="M12 16h4"/><path d="M8 11h.01"/><path d="M8 16h.01"/></svg>
              },
              {
                title: t('features.languages.title'),
                description: t('features.languages.description'),
                icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-globe"><circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/><path d="M2 12h20"/></svg>
              }
            ].map((feature, index) => (
              <div key={index} className="flex gap-5 p-6 rounded-xl hover:bg-secondary/50 transition-colors">
                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 text-primary">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: t('stats.accuracy'), label: t('stats.accuracyLabel') },
              { value: t('stats.documents'), label: t('stats.documentsLabel') },
              { value: t('stats.checkTime'), label: t('stats.checkTimeLabel') },
              { value: t('stats.support'), label: t('stats.supportLabel') }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2">{stat.value}</div>
                <div className="text-primary-foreground/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center bg-card border border-border rounded-3xl p-10 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-accent/5 rounded-full blur-3xl"></div>
            
            <h2 className="text-3xl md:text-4xl font-medium mb-6 relative z-10">
              {t('cta.title')}
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto relative z-10">
              {t('cta.description')}
            </p>
            <Link
              to="/check"
              className="inline-flex items-center bg-primary text-primary-foreground px-8 py-3 rounded-lg font-medium transition-all hover:brightness-110 active:brightness-90 relative z-10"
            >
              {t('cta.button')}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;
