import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { createBlogPostSchema, updateMetaTags, injectStructuredData } from './seo';

describe('SEO Utilities', () => {
  beforeEach(() => {
    // Setup DOM for testing
    document.head.innerHTML = `
      <meta name="description" content="Default description" />
      <meta name="keywords" content="default, keywords" />
      <meta property="og:title" content="Default Title" />
      <meta property="og:description" content="Default OG description" />
      <meta property="og:image" content="/default-image.png" />
      <meta name="twitter:title" content="Default Twitter Title" />
      <meta name="twitter:description" content="Default Twitter description" />
      <meta name="twitter:image" content="/default-twitter.png" />
    `;
  });

  afterEach(() => {
    document.head.innerHTML = '';
  });

  describe('createBlogPostSchema', () => {
    it('should create a valid blog post schema', () => {
      const schema = createBlogPostSchema(
        'Test Post',
        'This is a test post',
        'https://example.com/image.png',
        'March 1, 2026',
        ['test', 'blog', 'post']
      );

      expect(schema['@context']).toBe('https://schema.org');
      expect(schema['@type']).toBe('BlogPosting');
      expect(schema.headline).toBe('Test Post');
      expect(schema.description).toBe('This is a test post');
      expect(schema.image).toBe('https://example.com/image.png');
      expect(schema.datePublished).toBe('March 1, 2026');
      expect(schema.author.name).toBe('Dekena Wade');
      expect(schema.keywords).toBe('test, blog, post');
    });

    it('should handle empty keywords array', () => {
      const schema = createBlogPostSchema(
        'Test Post',
        'Description',
        'image.png',
        'March 1, 2026',
        []
      );

      expect(schema.keywords).toBe('');
    });

    it('should handle single keyword', () => {
      const schema = createBlogPostSchema(
        'Test Post',
        'Description',
        'image.png',
        'March 1, 2026',
        ['finance']
      );

      expect(schema.keywords).toBe('finance');
    });
  });

  describe('updateMetaTags', () => {
    it('should update page title', () => {
      updateMetaTags('New Title', 'New description', 'image.png', ['keyword']);
      expect(document.title).toBe('New Title | DeCodes Life');
    });

    it('should update meta description', () => {
      updateMetaTags('Title', 'New description', 'image.png', ['keyword']);
      const metaDescription = document.querySelector('meta[name="description"]');
      expect(metaDescription?.getAttribute('content')).toBe('New description');
    });

    it('should update meta keywords', () => {
      updateMetaTags('Title', 'Description', 'image.png', ['finance', 'blog', 'post']);
      const metaKeywords = document.querySelector('meta[name="keywords"]');
      expect(metaKeywords?.getAttribute('content')).toBe('finance, blog, post');
    });

    it('should update Open Graph tags', () => {
      updateMetaTags('OG Title', 'OG Description', 'og-image.png', ['keyword']);
      
      const ogTitle = document.querySelector('meta[property="og:title"]');
      const ogDescription = document.querySelector('meta[property="og:description"]');
      const ogImage = document.querySelector('meta[property="og:image"]');

      expect(ogTitle?.getAttribute('content')).toBe('OG Title');
      expect(ogDescription?.getAttribute('content')).toBe('OG Description');
      expect(ogImage?.getAttribute('content')).toBe('og-image.png');
    });

    it('should update Twitter tags', () => {
      updateMetaTags('Twitter Title', 'Twitter Description', 'twitter-image.png', ['keyword']);
      
      const twitterTitle = document.querySelector('meta[name="twitter:title"]');
      const twitterDescription = document.querySelector('meta[name="twitter:description"]');
      const twitterImage = document.querySelector('meta[name="twitter:image"]');

      expect(twitterTitle?.getAttribute('content')).toBe('Twitter Title');
      expect(twitterDescription?.getAttribute('content')).toBe('Twitter Description');
      expect(twitterImage?.getAttribute('content')).toBe('twitter-image.png');
    });

    it('should handle multiple keywords', () => {
      const keywords = ['finance', 'internship', 'career', 'business', 'growth'];
      updateMetaTags('Title', 'Description', 'image.png', keywords);
      
      const metaKeywords = document.querySelector('meta[name="keywords"]');
      expect(metaKeywords?.getAttribute('content')).toBe('finance, internship, career, business, growth');
    });
  });

  describe('injectStructuredData', () => {
    it('should inject structured data script', () => {
      const schema = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: 'Test Post',
        description: 'Test description',
        image: 'image.png',
        datePublished: 'March 1, 2026',
        author: { '@type': 'Person', name: 'Dekena Wade' },
        keywords: 'test, keywords'
      };

      injectStructuredData(schema);

      const script = document.querySelector('script[type="application/ld+json"]');
      expect(script).toBeTruthy();
      expect(script?.textContent).toContain('"@context":"https://schema.org"');
      expect(script?.textContent).toContain('"headline":"Test Post"');
    });

    it('should remove existing structured data before injecting new one', () => {
      const schema1 = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: 'First Post',
        description: 'First description',
        image: 'image1.png',
        datePublished: 'March 1, 2026',
        author: { '@type': 'Person', name: 'Dekena Wade' },
        keywords: 'first'
      };

      const schema2 = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: 'Second Post',
        description: 'Second description',
        image: 'image2.png',
        datePublished: 'March 2, 2026',
        author: { '@type': 'Person', name: 'Dekena Wade' },
        keywords: 'second'
      };

      injectStructuredData(schema1);
      const firstScript = document.querySelector('script[type="application/ld+json"]');
      expect(firstScript?.textContent).toContain('First Post');

      injectStructuredData(schema2);
      const allScripts = document.querySelectorAll('script[type="application/ld+json"]');
      expect(allScripts.length).toBe(1);
      expect(allScripts[0].textContent).toContain('Second Post');
    });

    it('should properly format JSON in script tag', () => {
      const schema = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: 'Test Post',
        description: 'Test description',
        image: 'image.png',
        datePublished: 'March 1, 2026',
        author: { '@type': 'Person', name: 'Dekena Wade' },
        keywords: 'test'
      };

      injectStructuredData(schema);

      const script = document.querySelector('script[type="application/ld+json"]');
      const content = script?.textContent || '';
      
      // Should be valid JSON
      expect(() => JSON.parse(content)).not.toThrow();
      
      const parsed = JSON.parse(content);
      expect(parsed.headline).toBe('Test Post');
      expect(parsed.author.name).toBe('Dekena Wade');
    });
  });
});
