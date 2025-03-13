
import React from 'react';
import { Search, Globe, FileText } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const CheckFeatures = () => {
  const { t } = useLanguage();

  const features = [
    {
      title: t('check.feature1.title'),
      description: t('check.feature1.description'),
      icon: <Search className="w-5 h-5" />,
      color: "text-primary"
    },
    {
      title: t('check.feature2.title'),
      description: t('check.feature2.description'),
      icon: <Globe className="w-5 h-5" />,
      color: "text-secondary"
    },
    {
      title: t('check.feature3.title'),
      description: t('check.feature3.description'),
      icon: <FileText className="w-5 h-5" />,
      color: "text-accent"
    }
  ];

  return (
    <section className="py-16 relative overflow-hidden">
      <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-accent/5 rounded-full blur-3xl -z-10"></div>
      
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-medium mb-4">
            {t('check.featuresTitle')}
          </h2>
          <p className="text-muted-foreground">
            {t('check.featuresDescription')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {features.map((feature, index) => (
            <div key={index} className="card-gradient border border-white/10 rounded-xl p-6 group hover:shadow-lg transition-all hover:-translate-y-1">
              <div className={`w-10 h-10 flex items-center justify-center rounded-full bg-primary/10 ${feature.color} mb-4 group-hover:animated-bounce`}>
                {feature.icon}
              </div>
              <h3 className="text-lg font-medium mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CheckFeatures;
