
/**
 * Web search utilities for plagiarism detection
 * This module provides functionality to check text against external web sources
 * It supports both real Google Custom Search integration and fallback simulation
 * 
 * This file is now a re-export wrapper around the modular implementation
 * in the webSearch/ directory
 */

import { searchMultipleResources, simulateWebSearch } from './webSearch/index';
import type { WebSearchResult } from './webSearch/types';

// Re-export the main functions and types
export { searchMultipleResources, simulateWebSearch };
export type { WebSearchResult };
