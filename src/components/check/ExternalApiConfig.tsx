
import React from 'react';
import ExternalApiConfigTabs from './api-config/ExternalApiConfigTabs';

interface ExternalApiConfigProps {
  onConfigSaved: () => void;
}

const ExternalApiConfig: React.FC<ExternalApiConfigProps> = ({ onConfigSaved }) => {
  return <ExternalApiConfigTabs onConfigSaved={onConfigSaved} />;
};

export default ExternalApiConfig;
