
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, FileText } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import SimilarityGauge from '@/components/results/SimilarityGauge';
import RiskLevelIndicator from '@/components/results/RiskLevelIndicator';
import ResultsViewer from '@/components/ResultsViewer';
import { findHistoryItemById } from './utils';
import { sampleHistoryData } from './data';
import { Match, ExternalSource } from '@/components/results/types';

interface HistoryReportDetailsProps {
  reportId: string;
}

const HistoryReportDetails: React.FC<HistoryReportDetailsProps> = ({ reportId }) => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [report, setReport] = useState<{
    item: any;
    originalText: string;
    matches: Match[];
    externalSources: ExternalSource[];
  } | null>(null);

  useEffect(() => {
    // In a real app, this would be an API call to get the report data
    const fetchReport = async () => {
      setLoading(true);
      try {
        // Find the history item
        const historyItem = findHistoryItemById(sampleHistoryData, reportId);

        if (!historyItem || historyItem.status !== 'completed') {
          // Report not found or not completed
          setReport(null);
          return;
        }

        // In a real app, we would fetch the full report data from the API
        // For demo purposes, we'll simulate the report data
        const simulatedText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
        Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;

        // Simulate some matches
        const simulatedMatches: Match[] = [
          {
            startIndex: 0,
            endIndex: 30,
            text: "Lorem ipsum dolor sit amet",
            matchPercentage: 95,
            source: "Wikipedia",
            sourceUrl: "https://en.wikipedia.org/wiki/Lorem_ipsum"
          },
          {
            startIndex: 140,
            endIndex: 210,
            text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco",
            matchPercentage: 85,
            source: "Academic Journal",
            sourceUrl: "https://example.com/journal"
          }
        ];

        // Simulate external sources
        const simulatedExternalSources: ExternalSource[] = [
          {
            source: "Lorem Ipsum Generator",
            similarity: 0.92,
            matchedText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            sourceUrl: "https://www.lipsum.com/"
          },
          {
            source: "Academic Database",
            similarity: 0.76,
            matchedText: "Ut enim ad minim veniam, quis nostrud exercitation",
            sourceUrl: "https://example.com/academic"
          }
        ];

        setReport({
          item: historyItem,
          originalText: simulatedText,
          matches: simulatedMatches,
          externalSources: simulatedExternalSources
        });
      } catch (error) {
        console.error("Error fetching report:", error);
      } finally {
        setLoading(false);
      }
    };

    if (reportId) {
      fetchReport();
    }
  }, [reportId]);

  const handleBack = () => {
    navigate('/profile/history');
  };

  const handleDownload = () => {
    // In a real app, this would download the report
    console.log('Downloading report');
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={handleBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('common.back')}
          </Button>
        </div>
        <Card>
          <CardContent className="p-8 flex justify-center">
            <div className="animate-pulse flex flex-col items-center">
              <div className="h-16 w-16 bg-muted rounded-full mb-4"></div>
              <div className="h-4 w-48 bg-muted rounded mb-2"></div>
              <div className="h-3 w-32 bg-muted rounded"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={handleBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('common.back')}
          </Button>
        </div>
        <Card>
          <CardContent className="p-8 text-center">
            <FileText className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-xl font-medium mb-2">{t('profile.history.reportNotFound')}</h2>
            <p className="text-muted-foreground">
              {t('profile.history.reportNotFoundDesc')}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={handleBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t('common.back')}
        </Button>
        <Button variant="outline" onClick={handleDownload}>
          <Download className="mr-2 h-4 w-4" />
          {t('profile.history.downloadReport')}
        </Button>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold mb-2">{report.item.documentName}</h1>
                <p className="text-muted-foreground">
                  {new Date(report.item.date).toLocaleString()}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <SimilarityGauge score={report.item.score} size="medium" />
                  <div className="text-sm text-muted-foreground mt-1">
                    {t('results.similarityScore')}
                  </div>
                </div>
                <div>
                  <RiskLevelIndicator score={report.item.score} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <ResultsViewer
          originalText={report.originalText}
          overallScore={report.item.score}
          matches={report.matches}
          externalSources={report.externalSources}
          documentName={report.item.documentName}
          analyzedCharacters={report.originalText.length}
        />
      </div>
    </div>
  );
};

export default HistoryReportDetails;
