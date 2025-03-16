
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface ScientificOfferSectionProps {
  onAddScientificCheck: () => void;
  onSkipScientificCheck: () => void;
}

const ScientificOfferSection: React.FC<ScientificOfferSectionProps> = ({
  onAddScientificCheck,
  onSkipScientificCheck
}) => {
  const { t } = useLanguage();

  return (
    <section id="results-section" className="py-12 bg-secondary/10">
      <div className="container mx-auto px-6">
        <div className="max-w-lg mx-auto">
          <Card className="overflow-hidden border-2 border-primary/20">
            <div className="bg-primary/10 p-6 text-center">
              <h2 className="text-xl font-bold text-center uppercase">
                {t('results.scientificCheck.title')}
              </h2>
            </div>
            <CardContent className="p-6">
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 bg-amber-400 rounded-full flex items-center justify-center mb-6">
                  <span className="text-4xl font-black text-black">doi</span>
                </div>
                
                <p className="text-center mb-6">
                  {t('results.scientificCheck.description')}
                </p>
                
                <div className="flex items-center gap-2 mb-8">
                  <span>{t('results.scientificCheck.price')}:</span>
                  <span className="flex items-center gap-1 font-medium">
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
                      <path d="M7.49991 0.876892C3.84222 0.876892 0.877075 3.84204 0.877075 7.49972C0.877075 11.1574 3.84222 14.1226 7.49991 14.1226C11.1576 14.1226 14.1227 11.1574 14.1227 7.49972C14.1227 3.84204 11.1576 0.876892 7.49991 0.876892ZM1.82707 7.49972C1.82707 4.36671 4.36689 1.82689 7.49991 1.82689C10.6329 1.82689 13.1727 4.36671 13.1727 7.49972C13.1727 10.6327 10.6329 13.1726 7.49991 13.1726C4.36689 13.1726 1.82707 10.6327 1.82707 7.49972ZM7.50003 4C7.77617 4 8.00003 4.22386 8.00003 4.5V7H10.0001C10.2762 7 10.5001 7.22386 10.5001 7.5C10.5001 7.77614 10.2762 8 10.0001 8H7.50003C7.22389 8 7.00003 7.77614 7.00003 7.5V4.5C7.00003 4.22386 7.22389 4 7.50003 4Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                    </svg>
                    150
                  </span>
                </div>
                
                <div className="flex flex-col w-full gap-3">
                  <Button 
                    size="lg"
                    className="bg-green-500 hover:bg-green-600 w-full uppercase font-bold"
                    onClick={onAddScientificCheck}
                  >
                    {t('results.scientificCheck.button')}
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-muted-foreground hover:text-foreground"
                    onClick={onSkipScientificCheck}
                  >
                    {t('results.scientificCheck.skipButton')}
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ScientificOfferSection;
