import { describe, it, expect } from 'vitest';
import {
  calculateReadingTime,
  formatReadingTime,
  extractPlainText,
  getReadingTime,
} from './readingTime';

describe('Reading Time Utilities', () => {
  describe('calculateReadingTime', () => {
    it('should calculate reading time based on word count', () => {
      const text = 'word '.repeat(200); // 200 words
      const time = calculateReadingTime(text);
      expect(time).toBe(1); // 200 words / 200 wpm = 1 minute
    });

    it('should round up reading time', () => {
      const text = 'word '.repeat(250); // 250 words
      const time = calculateReadingTime(text);
      expect(time).toBe(2); // 250 words / 200 wpm = 1.25 -> 2 minutes
    });

    it('should return minimum 1 minute for short text', () => {
      const text = 'short text';
      const time = calculateReadingTime(text);
      expect(time).toBe(1);
    });

    it('should handle empty text', () => {
      const text = '';
      const time = calculateReadingTime(text);
      expect(time).toBe(1);
    });

    it('should handle text with multiple spaces', () => {
      const text = 'word    word    word'; // Multiple spaces between words
      const time = calculateReadingTime(text);
      expect(time).toBe(1);
    });
  });

  describe('formatReadingTime', () => {
    it('should format 1 minute as singular', () => {
      const formatted = formatReadingTime(1);
      expect(formatted).toBe('1 min read');
    });

    it('should format multiple minutes as plural', () => {
      const formatted = formatReadingTime(5);
      expect(formatted).toBe('5 min read');
    });

    it('should handle large numbers', () => {
      const formatted = formatReadingTime(100);
      expect(formatted).toBe('100 min read');
    });
  });

  describe('extractPlainText', () => {
    it('should remove HTML tags', () => {
      const html = '<p>Hello <strong>world</strong></p>';
      const text = extractPlainText(html);
      expect(text).toBe('Hello world');
    });

    it('should handle nested tags', () => {
      const html = '<div><p>Nested <em>content</em></p></div>';
      const text = extractPlainText(html);
      expect(text).toBe('Nested content');
    });

    it('should normalize whitespace', () => {
      const html = '<p>Multiple   spaces   and\n\nnewlines</p>';
      const text = extractPlainText(html);
      expect(text).toBe('Multiple spaces and newlines');
    });

    it('should handle self-closing tags', () => {
      const html = '<p>Text<br/>More text</p>';
      const text = extractPlainText(html);
      expect(text).toContain('Text');
      expect(text).toContain('More text');
    });

    it('should handle empty HTML', () => {
      const html = '<div></div>';
      const text = extractPlainText(html);
      expect(text).toBe('');
    });
  });

  describe('getReadingTime', () => {
    it('should calculate reading time for plain text', () => {
      const text = 'word '.repeat(200);
      const result = getReadingTime(text);
      expect(result.minutes).toBe(1);
      expect(result.formatted).toBe('1 min read');
    });

    it('should calculate reading time for HTML content', () => {
      const html = '<p>' + 'word '.repeat(200) + '</p>';
      const result = getReadingTime(html);
      expect(result.minutes).toBe(1);
      expect(result.formatted).toBe('1 min read');
    });

    it('should detect HTML content', () => {
      const html = '<div><p>Content with tags</p></div>';
      const result = getReadingTime(html);
      expect(result.minutes).toBeGreaterThanOrEqual(1);
      expect(result.formatted).toMatch(/\d+ min read/);
    });

    it('should return object with both minutes and formatted', () => {
      const text = 'word '.repeat(300);
      const result = getReadingTime(text);
      expect(result).toHaveProperty('minutes');
      expect(result).toHaveProperty('formatted');
      expect(typeof result.minutes).toBe('number');
      expect(typeof result.formatted).toBe('string');
    });

    it('should handle complex HTML with multiple tags', () => {
      const html = `
        <article>
          <h1>Title</h1>
          <p>First paragraph with ${'word '.repeat(100)}</p>
          <p>Second paragraph with ${'word '.repeat(100)}</p>
        </article>
      `;
      const result = getReadingTime(html);
      expect(result.minutes).toBeGreaterThanOrEqual(1);
    });
  });
});
