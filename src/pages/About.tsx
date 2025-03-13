
import { useEffect } from 'react';
import { CheckCircle, Shield, Code } from 'lucide-react';
import MainLayout from '@/layouts/MainLayout';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

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
        
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block bg-primary/10 text-primary rounded-full px-3 py-1 text-sm font-medium mb-6 animate-fade-in">
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
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div>
                <span className="text-primary font-medium">{t('about.mission.label')}</span>
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
                  className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium transition-all hover:brightness-110 active:brightness-90 inline-block"
                >
                  {t('about.mission.button')}
                </Link>
              </div>
              
              <div className="bg-card border border-border p-8 rounded-2xl shadow-sm">
                <h3 className="text-xl font-medium mb-4">{t('about.values.title')}</h3>
                <ul className="space-y-4">
                  {[
                    {
                      title: t('about.values.integrity.title'),
                      description: t('about.values.integrity.description'),
                      icon: <Shield className="h-5 w-5" />
                    },
                    {
                      title: t('about.values.accuracy.title'),
                      description: t('about.values.accuracy.description'),
                      icon: <CheckCircle className="h-5 w-5" />
                    },
                    {
                      title: t('about.values.innovation.title'),
                      description: t('about.values.innovation.description'),
                      icon: <Code className="h-5 w-5" />
                    }
                  ].map((value, index) => (
                    <li key={index} className="flex gap-3">
                      <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-primary/10 text-primary">
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
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-primary font-medium">{t('about.technology.label')}</span>
              <h2 className="text-3xl md:text-4xl font-medium mt-2 mb-6">
                {t('about.technology.title')}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {t('about.technology.description')}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="bg-card border border-border rounded-xl p-6 relative overflow-hidden">
                <div className="relative z-10">
                  <h3 className="text-xl font-medium mb-4">{t('about.textProcessing.title')}</h3>
                  <ol className="space-y-3">
                    {[
                      t('about.textProcessing.step1'),
                      t('about.textProcessing.step2'),
                      t('about.textProcessing.step3'),
                      t('about.textProcessing.step4')
                    ].map((step, index) => (
                      <li key={index} className="flex gap-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-medium">
                          {index + 1}
                        </span>
                        <span className="text-muted-foreground">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl -z-10"></div>
              </div>
              
              <div className="bg-card border border-border rounded-xl p-6 relative overflow-hidden">
                <div className="relative z-10">
                  <h3 className="text-xl font-medium mb-4">{t('about.comparison.title')}</h3>
                  <ol className="space-y-3">
                    {[
                      t('about.comparison.step1'),
                      t('about.comparison.step2'),
                      t('about.comparison.step3'),
                      t('about.comparison.step4')
                    ].map((step, index) => (
                      <li key={index} className="flex gap-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-medium">
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
            
            <div className="mt-12 bg-primary/5 border border-primary/10 rounded-xl p-8 text-center">
              <h3 className="text-xl font-medium mb-3">{t('about.languages.title')}</h3>
              <p className="text-muted-foreground mb-6">
                {t('about.languages.description')}
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {["Ukrainian", "English", "Russian", "Polish", "German", "French"].map((language) => (
                  <span key={language} className="px-3 py-1 bg-card border border-border rounded-full text-sm">
                    {language}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-b from-secondary to-secondary/10">
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
              className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-medium transition-all hover:brightness-110 active:brightness-90 inline-block"
            >
              {t('about.cta.button')}
            </Link>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default AboutPage;
