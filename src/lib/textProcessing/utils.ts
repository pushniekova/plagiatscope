
/**
 * Utility functions for text processing
 */

/**
 * Hashes a text string using a simple hashing algorithm
 */
export function hashText(text: string): string {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    const char = text.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash.toString(16);
}

/**
 * Calculates the total length of text with non-overlapping segments removed
 */
export function calculateNonOverlappingLength(
  text: string, 
  segments: Array<{ startIndex: number, endIndex: number }>
): number {
  if (segments.length === 0) return text.length;
  
  // Sort segments by start index
  const sortedSegments = [...segments].sort((a, b) => a.startIndex - b.startIndex);
  
  // Merge overlapping segments
  const mergedSegments = [];
  let currentSegment = { ...sortedSegments[0] };
  
  for (let i = 1; i < sortedSegments.length; i++) {
    const segment = sortedSegments[i];
    
    if (segment.startIndex <= currentSegment.endIndex) {
      // Segments overlap, merge them
      currentSegment.endIndex = Math.max(currentSegment.endIndex, segment.endIndex);
    } else {
      // No overlap, add current segment and start a new one
      mergedSegments.push(currentSegment);
      currentSegment = { ...segment };
    }
  }
  
  // Add the last segment
  mergedSegments.push(currentSegment);
  
  // Calculate total length of merged segments
  const totalSegmentLength = mergedSegments.reduce(
    (sum, segment) => sum + (segment.endIndex - segment.startIndex + 1), 
    0
  );
  
  return text.length - totalSegmentLength;
}

// API configuration storage
interface ExternalApiConfig {
  groupToken: string;
  authorEmail: string;
  personalApiToken?: string;
  googleApiKey?: string;
  googleEngineId?: string;
}

/**
 * Gets the external API configuration from localStorage
 */
export function getExternalApiConfig(): ExternalApiConfig | null {
  const configStr = localStorage.getItem('externalApiConfig');
  if (!configStr) return null;
  
  try {
    return JSON.parse(configStr) as ExternalApiConfig;
  } catch (e) {
    console.error('Error parsing external API config:', e);
    return null;
  }
}

/**
 * Saves the external API configuration to localStorage
 */
export function saveExternalApiConfig(config: ExternalApiConfig): void {
  localStorage.setItem('externalApiConfig', JSON.stringify(config));
}

/**
 * Retrieves Google Search API credentials if available
 */
export function getGoogleApiCredentials(): { apiKey: string; engineId: string } | null {
  const config = getExternalApiConfig();
  if (!config || !config.googleApiKey || !config.googleEngineId) {
    return null;
  }
  
  return {
    apiKey: config.googleApiKey,
    engineId: config.googleEngineId
  };
}
