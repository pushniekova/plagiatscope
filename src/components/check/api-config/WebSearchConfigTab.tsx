
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

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
  return (
    <div className="space-y-4 mt-4">
      <div className="space-y-2">
        <Label htmlFor="google-api-key">Google API Key</Label>
        <Input
          id="google-api-key"
          type="text"
          value={googleApiKey}
          onChange={(e) => setGoogleApiKey(e.target.value)}
          placeholder="Введіть ваш Google API Key"
        />
        <p className="text-xs text-muted-foreground mt-1">
          Отримайте API ключ з <a href="https://console.cloud.google.com/apis/credentials" target="_blank" className="text-primary hover:underline">Google Cloud Console</a>
        </p>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="google-engine-id">Google Custom Search Engine ID</Label>
        <Input
          id="google-engine-id"
          type="text"
          value={googleEngineId}
          onChange={(e) => setGoogleEngineId(e.target.value)}
          placeholder="Введіть ID пошукової системи Google"
        />
        <p className="text-xs text-muted-foreground mt-1">
          Створіть пошукову систему та отримайте ID на <a href="https://programmablesearchengine.google.com/cse/all" target="_blank" className="text-primary hover:underline">Programmable Search Engine</a>
        </p>
      </div>
    </div>
  );
};

export default WebSearchConfigTab;
