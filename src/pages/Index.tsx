
import { useEffect } from 'react';
import { ArrowRight, FileCheck, Users, BarChart, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import Hero from '@/components/Hero';
import { useLanguage } from '@/contexts/LanguageContext';
import ColorfulMascot from '@/components/ColorfulMascot';

const Index = () => {
  const { t } = useLanguage();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <MainLayout>
      <Hero />
      
      {/* How It Works Section */}
      <section className="py-20 bg-secondary/10 relative overflow-hidden">
        <div className="absolute -left-36 -top-36 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute -right-36 -bottom-36 w-72 h-72 bg-secondary/5 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-6 relative">
          {/* Colorful mascot */}
          <div className="absolute top-0 left-10 hidden lg:block">
            <ColorfulMascot size="md" position="left" style={{ transform: 'scaleX(-1)' }} />
          </div>
          
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="inline-block button-gradient text-white rounded-full px-3 py-1 text-sm font-medium mb-6">
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
                icon: <FileCheck className="w-6 h-6" />,
                delay: ""
              },
              {
                step: t('howItWorks.step2.number'),
                title: t('howItWorks.step2.title'),
                description: t('howItWorks.step2.description'),
                icon: <BarChart className="w-6 h-6" />,
                delay: "animation-delay-200"
              },
              {
                step: t('howItWorks.step3.number'),
                title: t('howItWorks.step3.title'),
                description: t('howItWorks.step3.description'),
                icon: <Users className="w-6 h-6" />,
                delay: "animation-delay-400"
              }
            ].map((item, index) => (
              <div 
                key={index} 
                className={`card-gradient rounded-2xl p-8 relative group hover:shadow-xl transition-all hover:-translate-y-1 animated-float ${item.delay}`}
              >
                <div className="absolute -top-4 left-8 button-gradient text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium">
                  {item.step}
                </div>
                <div className="mb-4 text-primary group-hover:animated-bounce">
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
              className="inline-flex items-center button-gradient text-white px-6 py-3 rounded-lg font-medium transition-all hover:shadow-lg hover:shadow-primary/30 active:scale-95 no-underline"
            >
              <Sparkles className="mr-2 h-4 w-4" />
              {t('howItWorks.tryItNow')}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-accent/5 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10"></div>
        
        <div className="container mx-auto px-6 relative">
          <div className="absolute bottom-0 right-10 hidden lg:block">
            <ColorfulMascot size="md" />
          </div>
          
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="inline-block button-gradient text-white rounded-full px-3 py-1 text-sm font-medium mb-6">
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
                icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-text"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></svg>,
                color: "bg-primary/10 text-primary"
              },
              {
                title: t('features.analysis.title'),
                description: t('features.analysis.description'),
                icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>,
                color: "bg-secondary/10 text-secondary"
              },
              {
                title: t('features.reports.title'),
                description: t('features.reports.description'),
                icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-clipboard-list"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M12 11h4"/><path d="M12 16h4"/><path d="M8 11h.01"/><path d="M8 16h.01"/></svg>,
                color: "bg-accent/10 text-accent"
              },
              {
                title: t('features.languages.title'),
                description: t('features.languages.description'),
                icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-globe"><circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/><path d="M2 12h20"/></svg>,
                color: "bg-pink-100 text-pink-500 dark:bg-pink-900/30 dark:text-pink-400"
              }
            ].map((feature, index) => (
              <div key={index} className="flex gap-5 p-6 rounded-xl hover:bg-secondary/10 transition-colors group">
                <div className={`flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full ${feature.color} group-hover:animated-bounce`}>
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
      <section className="py-16 bg-gradient-to-r from-primary to-secondary text-white relative overflow-hidden">
        {/* Background blob decorations */}
        <div className="absolute left-1/4 -top-20 w-40 h-40 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute right-1/4 -bottom-20 w-40 h-40 bg-white/10 rounded-full blur-xl"></div>
        
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                value: t('stats.accuracy'), 
                label: t('stats.accuracyLabel'),
                className: "animated-float"
              },
              { 
                value: t('stats.documents'), 
                label: t('stats.documentsLabel'),
                className: "animated-float animation-delay-200"
              },
              { 
                value: t('stats.checkTime'), 
                label: t('stats.checkTimeLabel'),
                className: "animated-float animation-delay-400"
              },
              { 
                value: t('stats.support'), 
                label: t('stats.supportLabel'),
                className: "animated-float animation-delay-600"
              }
            ].map((stat, index) => (
              <div key={index} className={`text-center ${stat.className}`}>
                <div className="text-4xl md:text-5xl font-bold mb-2">{stat.value}</div>
                <div className="text-white/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center card-gradient rounded-3xl p-10 relative overflow-hidden shadow-xl group hover:shadow-2xl transition-shadow">
            {/* Background decoration */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-colors"></div>
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-accent/10 rounded-full blur-3xl group-hover:bg-accent/20 transition-colors"></div>
            
            {/* Colorful mascots on both sides */}
            <div className="absolute -left-16 bottom-0 hidden lg:block">
              <ColorfulMascot size="sm" position="left" style={{ transform: 'scaleX(-1)' }} />
            </div>
            <div className="absolute -right-16 bottom-0 hidden lg:block">
              <ColorfulMascot size="sm" />
            </div>
            
            <h2 className="text-3xl md:text-4xl font-medium mb-6 relative z-10">
              {t('cta.title')}
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto relative z-10">
              {t('cta.description')}
            </p>
            <Link
              to="/check"
              className="inline-flex items-center button-gradient text-white px-8 py-3 rounded-lg font-medium transition-all hover:shadow-lg hover:shadow-primary/30 active:scale-95 relative z-10 no-underline"
            >
              <Sparkles className="mr-2 h-4 w-4" />
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
