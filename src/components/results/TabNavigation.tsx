
import React from 'react';
import { File, List, BarChart, Globe } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (value: string) => void;
  children: React.ReactNode;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ 
  activeTab, 
  onTabChange,
  children
}) => {
  const { t } = useLanguage();

  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
      <TabsList className="w-full border-b rounded-none justify-start bg-muted">
        <TabsTrigger value="highlight" className="flex items-center gap-2">
          <File className="h-4 w-4" />
          {t('results.tabs.highlighted')}
        </TabsTrigger>
        <TabsTrigger value="sources" className="flex items-center gap-2">
          <List className="h-4 w-4" />
          {t('results.tabs.sources')}
        </TabsTrigger>
        <TabsTrigger value="external" className="flex items-center gap-2">
          <Globe className="h-4 w-4" />
          {t('results.tabs.external')}
        </TabsTrigger>
        <TabsTrigger value="summary" className="flex items-center gap-2">
          <BarChart className="h-4 w-4" />
          {t('results.tabs.summary')}
        </TabsTrigger>
      </TabsList>
      
      <div className="bg-card">
        {children}
      </div>
    </Tabs>
  );
};

export default TabNavigation;
