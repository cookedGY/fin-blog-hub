/**
 * Calculate reading time for a given text
 * Average reading speed: 200 words per minute
 */
export function calculateReadingTime(text: string): number {
  const wordsPerMinute = 200;
  const wordCount = text.trim().split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);
  return Math.max(1, readingTime); // Minimum 1 minute
}

/**
 * Format reading time as a human-readable string
 */
export function formatReadingTime(minutes: number): string {
  if (minutes === 1) {
    return '1 min read';
  }
  return `${minutes} min read`;
}

/**
 * Extract plain text from HTML content
 * Removes all HTML tags and entities
 */
export function extractPlainText(html: string): string {
  // Create a temporary div to parse HTML
  const temp = document.createElement('div');
  temp.innerHTML = html;
  
  // Get text content and normalize whitespace
  const text = temp.textContent || temp.innerText || '';
  return text.replace(/\s+/g, ' ').trim();
}

/**
 * Get reading time from content
 * Handles both plain text and HTML content
 */
export function getReadingTime(content: string): {
  minutes: number;
  formatted: string;
} {
  // If content looks like HTML, extract plain text first
  const isHtml = /<[^>]*>/g.test(content);
  const plainText = isHtml ? extractPlainText(content) : content;
  
  const minutes = calculateReadingTime(plainText);
  const formatted = formatReadingTime(minutes);
  
  return { minutes, formatted };
}
