
import MainLayout from '@/layouts/MainLayout';
import CheckPageLogic from '@/components/check/CheckPageLogic';
import CheckHeader from '@/components/check/CheckHeader';
import CheckInput from '@/components/check/CheckInput';
import CheckResults from '@/components/check/CheckResults';
import CheckFeatures from '@/components/check/CheckFeatures';
import QueueStatusSection from '@/components/check/QueueStatusSection';
import ScientificOfferSection from '@/components/check/ScientificOfferSection';

const CheckPage = () => {
  return (
    <MainLayout>
      <CheckPageLogic>
        {({
          text,
          documentName,
          isAnalyzing,
          showResults,
          showQueueStatus,
          showScientificOffer,
          queueStatus,
          analysisResults,
          handleTextChange,
          handleFileUpload,
          handleAnalyze,
          handleSkipQueue,
          handleAddScientificCheck,
          handleSkipScientificCheck
        }) => (
          <>
            <section className="pt-32 pb-16 md:pt-40 md:pb-24 relative overflow-hidden">
              {/* Background gradient */}
              <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-transparent dark:from-blue-950/20 dark:to-transparent -z-10"></div>
              
              <div className="container mx-auto px-6 relative">
                {/* Header component */}
                <CheckHeader />
                
                {/* Input component */}
                <div className="max-w-3xl mx-auto">
                  <CheckInput
                    onAnalyze={handleAnalyze}
                    text={text}
                    onTextChange={handleTextChange}
                    onFileUpload={handleFileUpload}
                    isAnalyzing={isAnalyzing}
                  />
                </div>
              </div>
            </section>
            
            {/* Queue Status */}
            {showQueueStatus && (
              <QueueStatusSection 
                documentName={documentName}
                queueStatus={queueStatus}
                onSkipQueue={handleSkipQueue}
              />
            )}
            
            {/* Scientific Papers Offer */}
            {showScientificOffer && (
              <ScientificOfferSection
                onAddScientificCheck={handleAddScientificCheck}
                onSkipScientificCheck={handleSkipScientificCheck}
              />
            )}
            
            {/* Results section */}
            {showResults && (
              <CheckResults 
                text={text}
                analysisResults={analysisResults}
                documentName={documentName}
              />
            )}
            
            {/* Features section */}
            <CheckFeatures />
          </>
        )}
      </CheckPageLogic>
    </MainLayout>
  );
};

export default CheckPage;
