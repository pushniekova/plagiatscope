
import React from 'react';
import { Search, Filter, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';

interface HistoryToolbarProps {
  selectedView: 'card' | 'list';
  setSelectedView: (view: 'card' | 'list') => void;
}

const HistoryToolbar: React.FC<HistoryToolbarProps> = ({
  selectedView,
  setSelectedView
}) => {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col sm:flex-row gap-3 justify-between">
      <div className="relative w-full sm:w-auto flex-1 max-w-sm">
        <Search className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
        <Input 
          type="search" 
          placeholder={t('profile.history.search')} 
          className="pl-8"
        />
      </div>
      <div className="flex gap-3">
        <Button 
          variant="outline" 
          size="icon" 
          title={t('profile.history.viewMode.card')}
          className={selectedView === 'card' ? 'bg-primary/10' : ''}
          onClick={() => setSelectedView('card')}
        >
          <div className="grid grid-cols-2 gap-0.5">
            <div className="w-1.5 h-1.5 bg-current rounded-sm"></div>
            <div className="w-1.5 h-1.5 bg-current rounded-sm"></div>
            <div className="w-1.5 h-1.5 bg-current rounded-sm"></div>
            <div className="w-1.5 h-1.5 bg-current rounded-sm"></div>
          </div>
        </Button>
        <Button 
          variant="outline" 
          size="icon" 
          title={t('profile.history.viewMode.list')}
          className={selectedView === 'list' ? 'bg-primary/10' : ''}
          onClick={() => setSelectedView('list')}
        >
          <div className="flex flex-col gap-0.5 items-stretch">
            <div className="w-4 h-1 bg-current rounded-sm"></div>
            <div className="w-4 h-1 bg-current rounded-sm"></div>
            <div className="w-4 h-1 bg-current rounded-sm"></div>
          </div>
        </Button>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon">
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default HistoryToolbar;
