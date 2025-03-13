
import React from 'react';
import MainLayout from '@/layouts/MainLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Shield } from 'lucide-react';

const Privacy = () => {
  const { t } = useLanguage();

  return (
    <MainLayout>
      <div className="container mx-auto px-6 py-16 max-w-4xl">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center rounded-full bg-primary/10 p-2 mb-4">
            <Shield className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{t('legal.privacy.title')}</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('legal.privacy.description')}
          </p>
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">{t('legal.privacy.section1.title')}</h2>
            <p>{t('legal.privacy.section1.paragraph1')}</p>
            <p>{t('legal.privacy.section1.paragraph2')}</p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">{t('legal.privacy.section2.title')}</h2>
            <p>{t('legal.privacy.section2.paragraph1')}</p>
            <ul className="list-disc pl-6 my-4">
              <li>{t('legal.privacy.section2.bullet1')}</li>
              <li>{t('legal.privacy.section2.bullet2')}</li>
              <li>{t('legal.privacy.section2.bullet3')}</li>
              <li>{t('legal.privacy.section2.bullet4')}</li>
              <li>{t('legal.privacy.section2.bullet5')}</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">{t('legal.privacy.section3.title')}</h2>
            <p>{t('legal.privacy.section3.paragraph1')}</p>
            <p>{t('legal.privacy.section3.paragraph2')}</p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">{t('legal.privacy.section4.title')}</h2>
            <p>{t('legal.privacy.section4.paragraph1')}</p>
            <p>{t('legal.privacy.section4.paragraph2')}</p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">{t('legal.privacy.section5.title')}</h2>
            <p>{t('legal.privacy.section5.paragraph1')}</p>
            <p>{t('legal.privacy.section5.paragraph2')}</p>
          </section>

          <p className="text-sm text-muted-foreground mt-8">
            {t('legal.privacy.lastUpdated')}
          </p>
        </div>
      </div>
    </MainLayout>
  );
};

export default Privacy;
