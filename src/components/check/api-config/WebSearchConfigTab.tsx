
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/contexts/LanguageContext';

interface WebSearchTabProps {
  googleApiKey: string;
  setGoogleApiKey: (value: string) => void;
  googleEngineId: string;
  setGoogleEngineId: (value: string) => void;
}

const WebSearchConfigTab: React.FC<WebSearchTabProps> = ({ 
  googleApiKey, 
  setGoogleApiKey, 
  googleEngineId, 
  setGoogleEngineId 
}) => {
  const { currentLanguage } = useLanguage();
  
  return (
    <div className="space-y-4 mt-4">
      <div className="space-y-2">
        <Label htmlFor="google-api-key">Google API Key</Label>
        <Input
          id="google-api-key"
          type="text"
          value={googleApiKey}
          onChange={(e) => setGoogleApiKey(e.target.value)}
          placeholder={currentLanguage === 'uk' ? "Введіть ваш Google API Key" : "Enter your Google API Key"}
        />
        <p className="text-xs text-muted-foreground mt-1">
          {currentLanguage === 'uk' ? (
            <>Отримайте API ключ з <a href="https://console.cloud.google.com/apis/credentials" target="_blank" className="text-primary hover:underline">Google Cloud Console</a></>
          ) : (
            <>Get your API key from <a href="https://console.cloud.google.com/apis/credentials" target="_blank" className="text-primary hover:underline">Google Cloud Console</a></>
          )}
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          {currentLanguage === 'uk' ? (
            <>Не забудьте активувати "Custom Search API" у <a href="https://console.cloud.google.com/apis/library/customsearch.googleapis.com" target="_blank" className="text-primary hover:underline">Google Cloud Library</a></>
          ) : (
            <>Don't forget to enable "Custom Search API" in <a href="https://console.cloud.google.com/apis/library/customsearch.googleapis.com" target="_blank" className="text-primary hover:underline">Google Cloud Library</a></>
          )}
        </p>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="google-engine-id">Google Custom Search Engine ID</Label>
        <Input
          id="google-engine-id"
          type="text"
          value={googleEngineId}
          onChange={(e) => setGoogleEngineId(e.target.value)}
          placeholder={currentLanguage === 'uk' ? "Введіть ID пошукової системи Google" : "Enter your Google Search Engine ID"}
        />
        <p className="text-xs text-muted-foreground mt-1">
          {currentLanguage === 'uk' ? (
            <>Створіть пошукову систему та отримайте ID на <a href="https://programmablesearchengine.google.com/cse/all" target="_blank" className="text-primary hover:underline">Programmable Search Engine</a></>
          ) : (
            <>Create a search engine and get your ID at <a href="https://programmablesearchengine.google.com/cse/all" target="_blank" className="text-primary hover:underline">Programmable Search Engine</a></>
          )}
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          {currentLanguage === 'uk' ? (
            <>Налаштуйте пошукову систему на "Весь інтернет" для найкращих результатів</>
          ) : (
            <>Configure your search engine to search "The entire web" for best results</>
          )}
        </p>
      </div>
    </div>
  );
};

export default WebSearchConfigTab;
