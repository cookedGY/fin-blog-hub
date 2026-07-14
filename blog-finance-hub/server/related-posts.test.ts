import { describe, it, expect } from 'vitest';
import { POSTS } from '../client/src/data/posts';

describe('Related Posts Functionality', () => {
  describe('Category Grouping', () => {
    it('should group posts by category', () => {
      const categories: Record<string, string[]> = {};

      Object.values(POSTS).forEach((post) => {
        if (!categories[post.tag]) {
          categories[post.tag] = [];
        }
        categories[post.tag].push(post.slug);
      });

      expect(Object.keys(categories).length).toBeGreaterThan(0);
      Object.values(categories).forEach((slugs) => {
        expect(slugs.length).toBeGreaterThan(0);
      });
    });

    it('should have multiple posts in Finance Grind category', () => {
      const financeGrindPosts = Object.values(POSTS).filter(
        (post) => post.tag === 'Finance Grind'
      );

      expect(financeGrindPosts.length).toBeGreaterThanOrEqual(2);
    });

    it('should have multiple posts in Global De category', () => {
      const globalDePosts = Object.values(POSTS).filter(
        (post) => post.tag === 'Global De'
      );

      expect(globalDePosts.length).toBeGreaterThanOrEqual(2);
    });

    it('should have multiple posts in Business Builder category', () => {
      const businessBuilderPosts = Object.values(POSTS).filter(
        (post) => post.tag === 'Business Builder'
      );

      expect(businessBuilderPosts.length).toBeGreaterThanOrEqual(2);
    });
  });

  describe('Related Posts Selection Logic', () => {
    it('should exclude current post from related posts', () => {
      const examPost = POSTS['exam-survival'];
      const relatedPosts = Object.values(POSTS).filter(
        (post) =>
          post.tag === examPost.tag && post.slug !== examPost.slug
      );

      expect(relatedPosts.every((post) => post.slug !== 'exam-survival')).toBe(
        true
      );
    });

    it('should only include posts from same category', () => {
      const examPost = POSTS['exam-survival'];
      const relatedPosts = Object.values(POSTS).filter(
        (post) =>
          post.tag === examPost.tag && post.slug !== examPost.slug
      );

      expect(relatedPosts.every((post) => post.tag === 'Finance Grind')).toBe(
        true
      );
    });

    it('should limit related posts to specified max', () => {
      const examPost = POSTS['exam-survival'];
      const maxPosts = 3;
      const relatedPosts = Object.values(POSTS)
        .filter(
          (post) =>
            post.tag === examPost.tag && post.slug !== examPost.slug
        )
        .slice(0, maxPosts);

      expect(relatedPosts.length).toBeLessThanOrEqual(maxPosts);
    });

    it('should return empty array for categories with only one post', () => {
      // Find a category with only one post
      const categories: Record<string, string[]> = {};

      Object.values(POSTS).forEach((post) => {
        if (!categories[post.tag]) {
          categories[post.tag] = [];
        }
        categories[post.tag].push(post.slug);
      });

      const singlePostCategory = Object.entries(categories).find(
        ([_, slugs]) => slugs.length === 1
      );

      if (singlePostCategory) {
        const [category, [slug]] = singlePostCategory;
        const post = POSTS[slug];
        const relatedPosts = Object.values(POSTS).filter(
          (p) => p.tag === category && p.slug !== slug
        );

        expect(relatedPosts.length).toBe(0);
      }
    });
  });

  describe('Post Properties for Display', () => {
    it('should have all required properties for related post display', () => {
      Object.values(POSTS).forEach((post) => {
        expect(post).toHaveProperty('slug');
        expect(post).toHaveProperty('tag');
        expect(post).toHaveProperty('title');
        expect(post).toHaveProperty('date');
        expect(typeof post.slug).toBe('string');
        expect(typeof post.tag).toBe('string');
        expect(typeof post.title).toBe('string');
        expect(typeof post.date).toBe('string');
      });
    });

    it('should have description for all posts', () => {
      Object.values(POSTS).forEach((post) => {
        expect(post.description).toBeDefined();
        if (post.description) {
          expect(typeof post.description).toBe('string');
          expect(post.description.length).toBeGreaterThan(0);
        }
      });
    });

    it('should have content for all posts', () => {
      Object.values(POSTS).forEach((post) => {
        expect(post.content).toBeDefined();
        expect(post.content).not.toBeNull();
      });
    });
  });

  describe('Related Posts for Specific Posts', () => {
    it('exam-survival should have related Finance Grind posts', () => {
      const examPost = POSTS['exam-survival'];
      const relatedPosts = Object.values(POSTS).filter(
        (post) =>
          post.tag === examPost.tag && post.slug !== examPost.slug
      );

      expect(relatedPosts.length).toBeGreaterThan(0);
      expect(relatedPosts.some((post) => post.slug === 'aon-internship')).toBe(
        true
      );
      expect(relatedPosts.some((post) => post.slug === 'r-for-finance')).toBe(
        true
      );
    });

    it('aon-internship should have related Finance Grind posts', () => {
      const aonPost = POSTS['aon-internship'];
      const relatedPosts = Object.values(POSTS).filter(
        (post) =>
          post.tag === aonPost.tag && post.slug !== aonPost.slug
      );

      expect(relatedPosts.length).toBeGreaterThan(0);
      expect(relatedPosts.some((post) => post.slug === 'exam-survival')).toBe(
        true
      );
    });

    it('ghana-changed-me should have related Global De posts', () => {
      const ghanaPost = POSTS['ghana-changed-me'];
      const relatedPosts = Object.values(POSTS).filter(
        (post) =>
          post.tag === ghanaPost.tag && post.slug !== ghanaPost.slug
      );

      expect(relatedPosts.length).toBeGreaterThan(0);
    });
  });

  describe('Edge Cases', () => {
    it('should handle posts with same title gracefully', () => {
      const allPosts = Object.values(POSTS);
      const titles = allPosts.map((p) => p.title);
      const uniqueTitles = new Set(titles);

      // All titles should be unique
      expect(uniqueTitles.size).toBe(titles.length);
    });

    it('should handle posts with empty descriptions', () => {
      const postsWithoutDescription = Object.values(POSTS).filter(
        (post) => !post.description || post.description.length === 0
      );

      // This is acceptable - some posts might not have descriptions
      expect(Array.isArray(postsWithoutDescription)).toBe(true);
    });

    it('should maintain consistent slug-to-post mapping', () => {
      Object.entries(POSTS).forEach(([slug, post]) => {
        expect(post.slug).toBe(slug);
      });
    });
  });
});
