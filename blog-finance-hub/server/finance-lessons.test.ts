import { describe, it, expect } from 'vitest';
import { POSTS } from '../client/src/data/posts';

describe('Finance Lessons Post', () => {
  describe('Post Metadata', () => {
    it('should exist in POSTS', () => {
      expect(POSTS['finance-lessons']).toBeDefined();
    });

    it('should have correct slug', () => {
      expect(POSTS['finance-lessons'].slug).toBe('finance-lessons');
    });

    it('should be in Finance Grind category', () => {
      expect(POSTS['finance-lessons'].tag).toBe('Finance Grind');
    });

    it('should have correct title', () => {
      expect(POSTS['finance-lessons'].title).toBe(
        'What Learning Finance Has Actually Taught Me So Far'
      );
    });

    it('should have date', () => {
      expect(POSTS['finance-lessons'].date).toBe('Last updated 2025');
    });

    it('should have description', () => {
      const desc = POSTS['finance-lessons'].description;
      expect(desc).toBeDefined();
      expect(desc).toContain('finance');
      expect(desc).toContain('uncertainty');
    });
  });

  describe('Post Content', () => {
    it('should have content', () => {
      expect(POSTS['finance-lessons'].content).toBeDefined();
      expect(POSTS['finance-lessons'].content).not.toBeNull();
    });

    it('should have comprehensive sections', () => {
      const contentStr = JSON.stringify(POSTS['finance-lessons'].content);

      expect(contentStr).toContain('Finance Is Less About Math');
      expect(contentStr).toContain('Risk Is the Real Subject');
      expect(contentStr).toContain('Data Is Becoming');
      expect(contentStr).toContain('Humbling Finance');
      expect(contentStr).toContain('Decision Making');
    });

    it('should contain key concepts', () => {
      const contentStr = JSON.stringify(POSTS['finance-lessons'].content);

      expect(contentStr).toContain('psychology');
      expect(contentStr).toContain('uncertainty');
      expect(contentStr).toContain('risk');
      expect(contentStr).toContain('data');
      expect(contentStr).toContain('Python');
    });
  });

  describe('Finance Grind Category', () => {
    it('should have multiple Finance Grind posts', () => {
      const financeGrindPosts = Object.values(POSTS).filter(
        (post) => post.tag === 'Finance Grind'
      );

      expect(financeGrindPosts.length).toBeGreaterThanOrEqual(3);
    });

    it('should include finance-lessons in Finance Grind', () => {
      const financeGrindPosts = Object.values(POSTS).filter(
        (post) => post.tag === 'Finance Grind'
      );

      expect(
        financeGrindPosts.some((post) => post.slug === 'finance-lessons')
      ).toBe(true);
    });

    it('should have related posts for finance-lessons', () => {
      const relatedPosts = Object.values(POSTS).filter(
        (post) =>
          post.tag === 'Finance Grind' &&
          post.slug !== 'finance-lessons'
      );

      expect(relatedPosts.length).toBeGreaterThan(0);
    });
  });

  describe('Post Integration', () => {
    it('should be accessible by slug', () => {
      expect(POSTS['finance-lessons']).toBeDefined();
      expect(POSTS['finance-lessons'].slug).toBe('finance-lessons');
    });

    it('should have non-empty title', () => {
      expect(POSTS['finance-lessons'].title.length).toBeGreaterThan(0);
    });

    it('should have valid tag', () => {
      const validTags = [
        'Finance Grind',
        'Global De',
        'Business Builder',
        'Life & Growth',
        'Fun Stuff',
      ];

      expect(validTags).toContain(POSTS['finance-lessons'].tag);
    });
  });
});
