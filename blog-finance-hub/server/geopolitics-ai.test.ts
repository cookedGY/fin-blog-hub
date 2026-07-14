import { describe, it, expect } from 'vitest';
import { POSTS } from '../client/src/data/posts';

describe('Geopolitics AI Post', () => {
  describe('Post Metadata', () => {
    it('should exist in POSTS', () => {
      expect(POSTS['geopolitics-ai']).toBeDefined();
    });

    it('should have correct slug', () => {
      expect(POSTS['geopolitics-ai'].slug).toBe('geopolitics-ai');
    });

    it('should be in Finance Grind category', () => {
      expect(POSTS['geopolitics-ai'].tag).toBe('Finance Grind');
    });

    it('should have correct title', () => {
      expect(POSTS['geopolitics-ai'].title).toContain('World Economy');
      expect(POSTS['geopolitics-ai'].title).toContain('War');
      expect(POSTS['geopolitics-ai'].title).toContain('Agentic AI');
    });

    it('should have date', () => {
      expect(POSTS['geopolitics-ai'].date).toBe('Last updated 2025');
    });

    it('should have description', () => {
      const desc = POSTS['geopolitics-ai'].description;
      expect(desc).toBeDefined();
      expect(desc).toContain('economy');
      expect(desc).toContain('geopolitics');
      expect(desc).toContain('AI');
    });
  });

  describe('Post Content', () => {
    it('should have content', () => {
      expect(POSTS['geopolitics-ai'].content).toBeDefined();
      expect(POSTS['geopolitics-ai'].content).not.toBeNull();
    });

    it('should have comprehensive sections', () => {
      const contentStr = JSON.stringify(POSTS['geopolitics-ai'].content);

      expect(contentStr).toContain('War and Markets');
      expect(contentStr).toContain('Supply Chain');
      expect(contentStr).toContain('Agentic AI');
      expect(contentStr).toContain('Humans Still Run');
      expect(contentStr).toContain('New Lens');
    });

    it('should contain key concepts', () => {
      const contentStr = JSON.stringify(POSTS['geopolitics-ai'].content);

      expect(contentStr).toContain('geopolitics');
      expect(contentStr).toContain('markets');
      expect(contentStr).toContain('AI');
      expect(contentStr).toContain('supply chain');
      expect(contentStr).toContain('missiles');
    });

    it('should reference historical examples', () => {
      const contentStr = JSON.stringify(POSTS['geopolitics-ai'].content);

      expect(contentStr).toContain('World War II');
      expect(contentStr).toContain('Cold War');
      expect(contentStr).toContain('Gulf War');
    });
  });

  describe('Finance Grind Category', () => {
    it('should have multiple Finance Grind posts', () => {
      const financeGrindPosts = Object.values(POSTS).filter(
        (post) => post.tag === 'Finance Grind'
      );

      expect(financeGrindPosts.length).toBeGreaterThanOrEqual(4);
    });

    it('should include geopolitics-ai in Finance Grind', () => {
      const financeGrindPosts = Object.values(POSTS).filter(
        (post) => post.tag === 'Finance Grind'
      );

      expect(
        financeGrindPosts.some((post) => post.slug === 'geopolitics-ai')
      ).toBe(true);
    });

    it('should have related posts for geopolitics-ai', () => {
      const relatedPosts = Object.values(POSTS).filter(
        (post) =>
          post.tag === 'Finance Grind' &&
          post.slug !== 'geopolitics-ai'
      );

      expect(relatedPosts.length).toBeGreaterThan(0);
    });
  });

  describe('Post Integration', () => {
    it('should be accessible by slug', () => {
      expect(POSTS['geopolitics-ai']).toBeDefined();
      expect(POSTS['geopolitics-ai'].slug).toBe('geopolitics-ai');
    });

    it('should have non-empty title', () => {
      expect(POSTS['geopolitics-ai'].title.length).toBeGreaterThan(0);
    });

    it('should have valid tag', () => {
      const validTags = [
        'Finance Grind',
        'Global De',
        'Business Builder',
        'Life & Growth',
        'Fun Stuff',
      ];

      expect(validTags).toContain(POSTS['geopolitics-ai'].tag);
    });

    it('should be first Finance Grind post', () => {
      const financeGrindPosts = Object.values(POSTS)
        .filter((post) => post.tag === 'Finance Grind')
        .sort((a, b) => {
          const aIndex = Object.keys(POSTS).indexOf(a.slug);
          const bIndex = Object.keys(POSTS).indexOf(b.slug);
          return aIndex - bIndex;
        });

      expect(financeGrindPosts[0].slug).toBe('geopolitics-ai');
    });
  });
});
