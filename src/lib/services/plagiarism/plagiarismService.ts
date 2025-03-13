
import { 
  PlagiarismCheckConfig, 
  PlagiarismCheckStatus, 
  PlagiarismReport 
} from './types';

/**
 * Service for handling plagiarism detection using the PlagiarismCheck.org API
 */
export class PlagiarismService {
  private baseUrl = 'https://plagiarismcheck.org/api/org';
  private config: PlagiarismCheckConfig | null = null;
  
  /**
   * Initialize the service with API credentials
   */
  public initialize(config: PlagiarismCheckConfig): void {
    this.config = config;
    console.log('Plagiarism detection service initialized');
  }

  /**
   * Check if the service is configured with API credentials
   */
  public isConfigured(): boolean {
    return !!this.config && !!this.config.groupToken && !!this.config.authorEmail;
  }
  
  /**
   * Submit a text for plagiarism checking
   */
  public async submitTextForPlagiarism(text: string): Promise<number> {
    if (!this.isConfigured()) {
      throw new Error('Plagiarism detection service not configured. Call initialize() first.');
    }
    
    console.log('Submitting text for plagiarism check');
    
    const formData = new FormData();
    formData.append('group_token', this.config!.groupToken);
    formData.append('author', this.config!.authorEmail);
    formData.append('text', text);
    
    try {
      const response = await fetch(`${this.baseUrl}/text/check/`, {
        method: 'POST',
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
      console.error('Error submitting text for plagiarism check:', error);
      throw error;
    }
  }
  
  /**
   * Check the status of a plagiarism check
   */
  public async checkPlagiarismStatus(textId: number): Promise<PlagiarismCheckStatus> {
    if (!this.isConfigured()) {
      throw new Error('Plagiarism detection service not configured. Call initialize() first.');
    }
    
    console.log(`Checking plagiarism status for text ID: ${textId}`);
    
    const formData = new FormData();
    formData.append('group_token', this.config!.groupToken);
    
    try {
      const response = await fetch(`${this.baseUrl}/text/status/${textId}/`, {
        method: 'POST',
        body: formData
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
      console.error('Error checking plagiarism status:', error);
      throw error;
    }
  }
  
  /**
   * Get the plagiarism report for a text
   */
  public async getPlagiarismReport(textId: number): Promise<PlagiarismReport> {
    if (!this.isConfigured()) {
      throw new Error('Plagiarism detection service not configured. Call initialize() first.');
    }
    
    console.log(`Getting plagiarism report for text ID: ${textId}`);
    
    const formData = new FormData();
    formData.append('group_token', this.config!.groupToken);
    
    try {
      const response = await fetch(`${this.baseUrl}/text/report/${textId}/`, {
        method: 'POST',
        body: formData
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
      console.error('Error getting plagiarism report:', error);
      throw error;
    }
  }
  
  /**
   * Delete a text and its report
   */
  public async deletePlagiarismText(textId: number): Promise<boolean> {
    if (!this.isConfigured()) {
      throw new Error('Plagiarism detection service not configured. Call initialize() first.');
    }
    
    console.log(`Deleting text ID: ${textId}`);
    
    const formData = new FormData();
    formData.append('group_token', this.config!.groupToken);
    
    try {
      const response = await fetch(`${this.baseUrl}/text/delete/${textId}/`, {
        method: 'POST',
        body: formData
      });
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      return data.success === true;
    } catch (error) {
      console.error('Error deleting text:', error);
      throw error;
    }
  }
}

// Export singleton instance
export const plagiarismService = new PlagiarismService();
