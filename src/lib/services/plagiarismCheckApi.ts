
/**
 * PlagiarismCheck.org API integration service
 * Based on the API documentation at https://plagiarismcheck.org/api/
 */

// Common types for both Plagiarism and AI detection APIs
export enum CheckStatus {
  // Plagiarism check statuses
  STATE_STORED = 2,
  STATE_SUBMITTED = 3,
  STATE_FAILED = 4,
  STATE_CHECKED = 5,
  
  // AI detection statuses
  AI_STATE_QUEUED = 1,
  AI_STATE_IN_PROGRESS = 2,
  AI_STATE_FAILED = 3,
  AI_STATE_CHECKED = 4
}

// Plagiarism check types
interface PlagiarismCheckStatus {
  id: number;
  state: number;
  filename: string;
  report?: {
    id: number;
    percent: string;
    source_count: number;
  };
}

interface PlagiarismReportNode {
  enabled: boolean;
  start: number;
  end: number;
  text: string;
  sources: number[];
  sources_improved: Array<{
    source: number;
    cos: number;
  }>;
  headers: number[];
  quotes: number[];
  destinations_clusters: number[];
}

interface PlagiarismSource {
  content_type: string;
  source: string;
  percent: number;
  plagiarism_percent: number;
  link: {
    name: string;
    urls: string[];
  };
}

interface PlagiarismReport {
  report: {
    id: number;
    percent: string;
    source_count: number;
  };
  report_data: {
    nodes: PlagiarismReportNode[];
    sources: PlagiarismSource[];
    matched_percent: number;
  };
}

// AI detection types
interface AiDetectionStatus {
  id: number;
  status: number;
  percent: number | null;
  processed_percent: number | null;
  strong_percent: number | null;
  likely_percent: number | null;
  chunks: AiDetectionChunk[];
}

interface AiDetectionChunk {
  reliability: number;
  position: [number, number]; // [start, end]
}

interface AiDetectionReport {
  id: number;
  status: number;
  percent: number;
  processed_percent: number;
  strong_percent: number;
  likely_percent: number;
  content: string;
  chunks: AiDetectionChunk[];
}

// Configuration object for the API
export interface PlagiarismCheckConfig {
  // Organization API (plagiarism check)
  groupToken: string;
  authorEmail: string;
  
  // Personal API (AI detection)
  personalApiToken?: string;
}

/**
 * API service for interacting with PlagiarismCheck.org
 */
export class PlagiarismCheckService {
  private baseOrgUrl = 'https://plagiarismcheck.org/api/org';
  private basePersonalUrl = 'https://plagiarismcheck.org/api/v1';
  private config: PlagiarismCheckConfig | null = null;
  
  /**
   * Initialize the service with API credentials
   */
  public initialize(config: PlagiarismCheckConfig): void {
    this.config = config;
    console.log('PlagiarismCheck API initialized with tokens');
  }

  /**
   * Check if the service is configured with API credentials
   */
  public isConfigured(): boolean {
    return !!this.config && !!this.config.groupToken && !!this.config.authorEmail;
  }

  /**
   * Check if the personal API is configured
   */
  public isPersonalApiConfigured(): boolean {
    return !!this.config && !!this.config.personalApiToken;
  }
  
  /**
   * Submit a text for plagiarism checking (organization API)
   */
  public async submitTextForPlagiarism(text: string): Promise<number> {
    if (!this.isConfigured()) {
      throw new Error('PlagiarismCheck API not configured. Call initialize() first.');
    }
    
    console.log('Submitting text to PlagiarismCheck API for plagiarism check');
    
    const formData = new FormData();
    formData.append('group_token', this.config!.groupToken);
    formData.append('author', this.config!.authorEmail);
    formData.append('text', text);
    
    try {
      const response = await fetch(`${this.baseOrgUrl}/text/check/`, {
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
      throw new Error('PlagiarismCheck API not configured. Call initialize() first.');
    }
    
    console.log(`Checking plagiarism status for text ID: ${textId}`);
    
    const formData = new FormData();
    formData.append('group_token', this.config!.groupToken);
    
    try {
      const response = await fetch(`${this.baseOrgUrl}/text/status/${textId}/`, {
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
      throw new Error('PlagiarismCheck API not configured. Call initialize() first.');
    }
    
    console.log(`Getting plagiarism report for text ID: ${textId}`);
    
    const formData = new FormData();
    formData.append('group_token', this.config!.groupToken);
    
    try {
      const response = await fetch(`${this.baseOrgUrl}/text/report/${textId}/`, {
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
      throw new Error('PlagiarismCheck API not configured. Call initialize() first.');
    }
    
    console.log(`Deleting text ID: ${textId}`);
    
    const formData = new FormData();
    formData.append('group_token', this.config!.groupToken);
    
    try {
      const response = await fetch(`${this.baseOrgUrl}/text/delete/${textId}/`, {
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

  /**
   * Submit a text for AI detection (personal API)
   */
  public async submitTextForAiDetection(text: string): Promise<number> {
    if (!this.isPersonalApiConfigured()) {
      throw new Error('Personal API token not configured. Call initialize() with personalApiToken first.');
    }
    
    console.log('Submitting text to PlagiarismCheck API for AI detection');
    
    const formData = new FormData();
    formData.append('text', text);
    
    try {
      const response = await fetch(`${this.basePersonalUrl}/chat-gpt/`, {
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
    if (!this.isPersonalApiConfigured()) {
      throw new Error('Personal API token not configured. Call initialize() with personalApiToken first.');
    }
    
    console.log(`Checking AI detection status for text ID: ${textId}`);
    
    try {
      const response = await fetch(`${this.basePersonalUrl}/chat-gpt/${textId}`, {
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
    if (!this.isPersonalApiConfigured()) {
      throw new Error('Personal API token not configured. Call initialize() with personalApiToken first.');
    }
    
    console.log(`Getting AI detection report for text ID: ${textId}`);
    
    try {
      const response = await fetch(`${this.basePersonalUrl}/chat-gpt/${textId}`, {
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

// Export a singleton instance
export const plagiarismCheckApi = new PlagiarismCheckService();
