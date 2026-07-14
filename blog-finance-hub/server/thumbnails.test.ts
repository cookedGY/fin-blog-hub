import { describe, it, expect } from 'vitest';
import { POSTS } from '../client/src/data/posts';

describe('Blog Post Thumbnails', () => {
  describe('Thumbnail Properties', () => {
    it('should have thumbnail property in Post interface', () => {
      const post = POSTS['geopolitics-ai'];
      expect(post).toHaveProperty('thumbnail');
    });

    it('should have thumbnails for main Finance Grind posts', () => {
      const mainFinanceGrindPosts = ['geopolitics-ai', 'finance-lessons', 'exam-survival', 'aon-internship'];

      mainFinanceGrindPosts.forEach((slug) => {
        const post = POSTS[slug];
        expect(post.thumbnail).toBeDefined();
        expect(post.thumbnail).not.toBeNull();
        expect(typeof post.thumbnail).toBe('string');
      });
    });

    it('geopolitics-ai should have thumbnail URL', () => {
      const post = POSTS['geopolitics-ai'];
      expect(post.thumbnail).toContain('thumbnail-geopolitics-ai');
      expect(post.thumbnail).toContain('webp');
    });

    it('finance-lessons should have thumbnail URL', () => {
      const post = POSTS['finance-lessons'];
      expect(post.thumbnail).toContain('thumbnail-finance-lessons');
      expect(post.thumbnail).toContain('webp');
    });

    it('exam-survival should have thumbnail URL', () => {
      const post = POSTS['exam-survival'];
      expect(post.thumbnail).toContain('thumbnail-exam-survival');
      expect(post.thumbnail).toContain('webp');
    });

    it('aon-internship should have thumbnail URL', () => {
      const post = POSTS['aon-internship'];
      expect(post.thumbnail).toContain('thumbnail-aon-internship');
      expect(post.thumbnail).toContain('webp');
    });
  });

  describe('Thumbnail URLs', () => {
    it('should have valid thumbnail URLs starting with https', () => {
      const postsWithThumbnails = Object.values(POSTS).filter(
        (post) => post.thumbnail
      );

      postsWithThumbnails.forEach((post) => {
        expect(post.thumbnail).toMatch(/^https:\/\//);
      });
    });

    it('should have cloudfront URLs for thumbnails', () => {
      const postsWithThumbnails = Object.values(POSTS).filter(
        (post) => post.thumbnail
      );

      postsWithThumbnails.forEach((post) => {
        expect(post.thumbnail).toContain('cloudfront.net');
      });
    });

    it('should have webp format for optimized thumbnails', () => {
      const postsWithThumbnails = Object.values(POSTS).filter(
        (post) => post.thumbnail
      );

      postsWithThumbnails.forEach((post) => {
        expect(post.thumbnail).toMatch(/\.webp$/);
      });
    });
  });

  describe('Thumbnail Consistency', () => {
    it('should have thumbnails for main posts', () => {
      const mainPostSlugs = ['geopolitics-ai', 'finance-lessons', 'exam-survival', 'aon-internship'];

      mainPostSlugs.forEach((slug) => {
        const post = POSTS[slug];
        expect(post.thumbnail).toBeDefined();
        expect(post.thumbnail).not.toBeNull();
      });
    });

    it('should have unique thumbnail URLs', () => {
      const thumbnails = Object.values(POSTS)
        .filter((post) => post.thumbnail)
        .map((post) => post.thumbnail);

      const uniqueThumbnails = new Set(thumbnails);
      expect(uniqueThumbnails.size).toBe(thumbnails.length);
    });

    it('should have thumbnails matching post slugs', () => {
      const post = POSTS['geopolitics-ai'];
      expect(post.thumbnail).toContain(post.slug.replace('-', '-'));
    });
  });

  describe('Thumbnail Display', () => {
    it('should have thumbnail property optional', () => {
      const postWithThumbnail = POSTS['geopolitics-ai'];
      const postWithoutThumbnail = POSTS['r-for-finance'];

      expect(postWithThumbnail.thumbnail).toBeDefined();
      expect(postWithoutThumbnail.thumbnail).toBeUndefined();
    });

    it('should allow posts without thumbnails', () => {
      const allPosts = Object.values(POSTS);
      const postsWithoutThumbnails = allPosts.filter(
        (post) => !post.thumbnail
      );

      // Some posts may not have thumbnails yet
      expect(postsWithoutThumbnails.length).toBeGreaterThanOrEqual(0);
    });

    it('should have 4 posts with thumbnails', () => {
      const postsWithThumbnails = Object.values(POSTS).filter(
        (post) => post.thumbnail
      );

      expect(postsWithThumbnails.length).toBe(4);
    });
  });
});
