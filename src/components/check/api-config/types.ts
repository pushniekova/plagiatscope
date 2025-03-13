
export interface ApiConfig {
  groupToken: string;
  authorEmail: string;
  personalApiToken?: string;
  googleApiKey?: string;
  googleEngineId?: string;
}

export interface ExternalApiConfigProps {
  onConfigSaved: () => void;
}
