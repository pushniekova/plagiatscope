
import { PlagiarismCheckConfig } from './types';
import { plagiarismService } from './plagiarismService';
import { aiDetectionService } from './aiDetectionService';

export * from './types';
export { plagiarismService } from './plagiarismService';
export { aiDetectionService } from './aiDetectionService';

/**
 * Main service for PlagiarismCheck.org API integration
 * Combines both plagiarism and AI detection services
 */
class PlagiarismCheckService {
  private config: PlagiarismCheckConfig | null = null;
  
  /**
   * Initialize both services with API credentials
   */
  public initialize(config: PlagiarismCheckConfig): void {
    this.config = config;
    
    // Initialize both services
    plagiarismService.initialize(config);
    aiDetectionService.initialize(config);
    
    console.log('PlagiarismCheck API initialized with tokens');
  }

  /**
   * Check if the plagiarism service is configured
   */
  public isConfigured(): boolean {
    return plagiarismService.isConfigured();
  }

  /**
   * Check if the AI detection service is configured
   */
  public isPersonalApiConfigured(): boolean {
    return aiDetectionService.isConfigured();
  }
}

// Export the main service as a singleton
export const plagiarismCheckApi = new PlagiarismCheckService();
