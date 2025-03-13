
/**
 * Common utilities for text processing
 */

// Utility function to simulate hashing text (like in Plagiarism-Checker)
export function hashText(text: string): string {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    const char = text.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash.toString(16);
}

// Calculate total length of non-overlapping matched text segments (from Plagiarism-Checker)
export function calculateNonOverlappingLength(ranges: {start: number, end: number}[], textLength: number): number {
  if (ranges.length === 0) return 0;
  
  // Sort ranges by start index
  ranges.sort((a, b) => a.start - b.start);
  
  let totalLength = 0;
  let currentEnd = ranges[0].start;
  
  for (const range of ranges) {
    if (range.start > currentEnd) {
      // Non-overlapping range
      totalLength += range.end - range.start;
      currentEnd = range.end;
    } else if (range.end > currentEnd) {
      // Partially overlapping range
      totalLength += range.end - currentEnd;
      currentEnd = range.end;
    }
    // Completely overlapping ranges are ignored
  }
  
  return Math.min(totalLength, textLength);
}
