
import { 
  PlagiarismCheckConfig, 
  AiDetectionStatus, 
  AiDetectionReport 
} from './types';

/**
 * Service for AI text detection using the PlagiarismCheck.org API
 */
export class AiDetectionService {
  private baseUrl = 'https://plagiarismcheck.org/api/v1';
  private config: PlagiarismCheckConfig | null = null;
  
  /**
   * Initialize the service with API credentials
   */
  public initialize(config: PlagiarismCheckConfig): void {
    this.config = config;
    console.log('AI detection service initialized');
  }

  /**
   * Check if the service is configured with API credentials
   */
  public isConfigured(): boolean {
    return !!this.config && !!this.config.personalApiToken;
  }
  
  /**
   * Submit a text for AI detection
   */
  public async submitTextForAiDetection(text: string): Promise<number> {
    if (!this.isConfigured()) {
      throw new Error('Personal API token not configured. Call initialize() with personalApiToken first.');
    }
    
    console.log('Submitting text for AI detection');
    
    const formData = new FormData();
    formData.append('text', text);
    
    try {
      const response = await fetch(`${this.baseUrl}/chat-gpt/`, {
        method: 'POST',
        headers: {
          'X-API-TOKEN': this.config!.personalApiToken!
        },
        body: formData
      });
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      if (!data.success) {
        throw new Error('API returned failure status');
      }
      
      return data.data.id;
    } catch (error) {
      console.error('Error submitting text for AI detection:', error);
      throw error;
    }
  }
  
  /**
   * Check the status of an AI detection
   */
  public async checkAiDetectionStatus(textId: number): Promise<AiDetectionStatus> {
    if (!this.isConfigured()) {
      throw new Error('Personal API token not configured. Call initialize() with personalApiToken first.');
    }
    
    console.log(`Checking AI detection status for text ID: ${textId}`);
    
    try {
      const response = await fetch(`${this.baseUrl}/chat-gpt/${textId}`, {
        method: 'GET',
        headers: {
          'X-API-TOKEN': this.config!.personalApiToken!
        }
      });
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      if (!data.success) {
        throw new Error('API returned failure status');
      }
      
      return data.data;
    } catch (error) {
      console.error('Error checking AI detection status:', error);
      throw error;
    }
  }
  
  /**
   * Get the AI detection report
   */
  public async getAiDetectionReport(textId: number): Promise<AiDetectionReport> {
    if (!this.isConfigured()) {
      throw new Error('Personal API token not configured. Call initialize() with personalApiToken first.');
    }
    
    console.log(`Getting AI detection report for text ID: ${textId}`);
    
    try {
      const response = await fetch(`${this.baseUrl}/chat-gpt/${textId}`, {
        method: 'GET',
        headers: {
          'X-API-TOKEN': this.config!.personalApiToken!
        }
      });
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      if (!data.success) {
        throw new Error('API returned failure status');
      }
      
      return data.data;
    } catch (error) {
      console.error('Error getting AI detection report:', error);
      throw error;
    }
  }
}

// Export singleton instance
export const aiDetectionService = new AiDetectionService();
