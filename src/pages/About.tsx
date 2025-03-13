
import { useEffect } from 'react';
import { CheckCircle, Shield, Code, Sparkles, Star, Zap } from 'lucide-react';
import MainLayout from '@/layouts/MainLayout';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import ColorfulMascot from '@/components/ColorfulMascot';

const AboutPage = () => {
  const { t } = useLanguage();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <MainLayout>
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-transparent dark:from-blue-950/20 dark:to-transparent -z-10"></div>
        
        <div className="container mx-auto px-6 relative">
          {/* Colorful mascot */}
          <div className="absolute -top-20 -right-10 hidden lg:block z-10">
            <ColorfulMascot size="lg" />
          </div>
          
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block button-gradient text-white rounded-full px-3 py-1 text-sm font-medium mb-6 animate-fade-in">
              {t('about.badge')}
            </span>
            <h1 className="text-4xl md:text-5xl font-medium mb-6 animate-slide-in-up">
              {t('about.title')}
            </h1>
            <p className="text-xl text-muted-foreground mb-12 animate-slide-in-up animation-delay-200">
              {t('about.description')}
            </p>
          </div>
        </div>
      </section>
      
      {/* Mission Section */}
      <section className="py-16 bg-secondary/10 relative overflow-hidden">
        {/* Background blob decorations */}
        <div className="absolute -left-36 -top-36 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute -right-36 -bottom-36 w-72 h-72 bg-secondary/5 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div>
                <span className="text-primary font-medium inline-flex items-center gap-1">
                  <Star className="h-4 w-4 animated-sparkle" />
                  {t('about.mission.label')}
                </span>
                <h2 className="text-3xl md:text-4xl font-medium mt-2 mb-6">
                  {t('about.mission.title')}
                </h2>
                <p className="text-muted-foreground mb-4">
                  {t('about.mission.description1')}
                </p>
                <p className="text-muted-foreground mb-6">
                  {t('about.mission.description2')}
                </p>
                <Link
                  to="/check"
                  className="button-gradient text-white px-6 py-3 rounded-lg font-medium transition-all hover:shadow-lg hover:shadow-primary/30 active:scale-95 inline-flex items-center gap-2 no-underline"
                >
                  <Sparkles className="h-4 w-4" />
                  {t('about.mission.button')}
                </Link>
              </div>
              
              <div className="card-gradient rounded-2xl p-8 shadow-lg relative group">
                <div className="absolute inset-0 rainbow-border opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-500"></div>
                
                <h3 className="text-xl font-medium mb-4">{t('about.values.title')}</h3>
                <ul className="space-y-4">
                  {[
                    {
                      title: t('about.values.integrity.title'),
                      description: t('about.values.integrity.description'),
                      icon: <Shield className="h-5 w-5" />,
                      color: 'text-primary bg-primary/10'
                    },
                    {
                      title: t('about.values.accuracy.title'),
                      description: t('about.values.accuracy.description'),
                      icon: <CheckCircle className="h-5 w-5" />,
                      color: 'text-secondary bg-secondary/10'
                    },
                    {
                      title: t('about.values.innovation.title'),
                      description: t('about.values.innovation.description'),
                      icon: <Code className="h-5 w-5" />,
                      color: 'text-accent bg-accent/10'
                    }
                  ].map((value, index) => (
                    <li key={index} className="flex gap-3 group">
                      <div className={`flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full ${value.color} group-hover:animated-bounce transition-transform duration-300`}>
                        {value.icon}
                      </div>
                      <div>
                        <h4 className="font-medium">{value.title}</h4>
                        <p className="text-muted-foreground text-sm mt-1">{value.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Technology Section */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 transform translate-x-1/2 translate-y-1/2 w-64 h-64 bg-accent/5 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-6 relative">
          <div className="absolute -bottom-24 -left-20 hidden lg:block">
            <ColorfulMascot size="lg" position="left" style={{ transform: 'scaleX(-1)' }} />
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-flex items-center gap-1 text-primary font-medium">
                <Zap className="h-4 w-4 animated-sparkle" />
                {t('about.technology.label')}
              </span>
              <h2 className="text-3xl md:text-4xl font-medium mt-2 mb-6">
                {t('about.technology.title')}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {t('about.technology.description')}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="card-gradient rounded-xl p-6 relative overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative z-10">
                  <h3 className="text-xl font-medium mb-4">{t('about.textProcessing.title')}</h3>
                  <ol className="space-y-3">
                    {[
                      t('about.textProcessing.step1'),
                      t('about.textProcessing.step2'),
                      t('about.textProcessing.step3'),
                      t('about.textProcessing.step4')
                    ].map((step, index) => (
                      <li key={index} className="flex gap-3 group">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full button-gradient text-white flex items-center justify-center text-sm font-medium group-hover:animated-wiggle">
                          {index + 1}
                        </span>
                        <span className="text-muted-foreground">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl -z-10"></div>
              </div>
              
              <div className="card-gradient rounded-xl p-6 relative overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative z-10">
                  <h3 className="text-xl font-medium mb-4">{t('about.comparison.title')}</h3>
                  <ol className="space-y-3">
                    {[
                      t('about.comparison.step1'),
                      t('about.comparison.step2'),
                      t('about.comparison.step3'),
                      t('about.comparison.step4')
                    ].map((step, index) => (
                      <li key={index} className="flex gap-3 group">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full button-gradient text-white flex items-center justify-center text-sm font-medium group-hover:animated-wiggle">
                          {index + 1}
                        </span>
                        <span className="text-muted-foreground">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
                <div className="absolute top-0 left-0 w-32 h-32 bg-accent/5 rounded-full blur-2xl -z-10"></div>
              </div>
            </div>
            
            <div className="mt-12 bg-primary/5 border border-primary/10 rounded-xl p-8 text-center relative group hover:shadow-lg transition-shadow">
              <div className="absolute inset-0 rainbow-border opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-500"></div>
              
              <h3 className="text-xl font-medium mb-3">{t('about.languages.title')}</h3>
              <p className="text-muted-foreground mb-6">
                {t('about.languages.description')}
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {["Ukrainian", "English", "Russian", "Polish", "German", "French"].map((language, index) => (
                  <span 
                    key={language} 
                    className="px-3 py-1 card-gradient border border-white/10 rounded-full text-sm hover:shadow-md transition-all hover:-translate-y-1"
                    style={{ 
                      animationDelay: `${index * 100}ms`,
                      animation: "float 4s ease-in-out infinite"
                    }}
                  >
                    {language}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-b from-secondary/10 to-transparent">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-medium mb-6">
              {t('about.cta.title')}
            </h2>
            <p className="text-muted-foreground mb-8 text-lg">
              {t('about.cta.description')}
            </p>
            <Link
              to="/check"
              className="button-gradient text-white px-8 py-3 rounded-lg font-medium transition-all hover:shadow-lg hover:shadow-primary/30 active:scale-95 inline-flex items-center gap-2 no-underline"
            >
              <Sparkles className="h-4 w-4" />
              {t('about.cta.button')}
            </Link>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default AboutPage;
