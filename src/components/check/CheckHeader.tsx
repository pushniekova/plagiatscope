
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import ColorfulMascot from '@/components/ColorfulMascot';

const CheckHeader = () => {
  const { t } = useLanguage();

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-12">
        <span className="inline-block button-gradient text-white rounded-full px-3 py-1 text-sm font-medium mb-6">
          {t('check.badge')}
        </span>
        <h1 className="text-3xl md:text-5xl font-medium mb-6">
          {t('check.title')}
        </h1>
        <p className="text-lg text-muted-foreground">
          {t('check.description')}
        </p>
      </div>
      
      {/* Colorful mascot - kept in position for layout consistency */}
      <div className="absolute -top-20 right-0 hidden lg:block z-10">
        <ColorfulMascot size="lg" />
      </div>
    </div>
  );
};

export default CheckHeader;
