import { describe, it, expect } from 'vitest';
import { POSTS } from '../client/src/data/posts';

describe('Blog Posts', () => {
  describe('Post Structure', () => {
    it('should have all required posts', () => {
      const expectedSlugs = [
        'aon-internship',
        'ghana-changed-me',
        'kofi-trucking',
        'r-for-finance',
        'exam-survival',
        'mandarin-journey',
        'guyanese-chinese-fusion',
        'wang-tours',
        'kofi-systems',
        'grief-and-grind',
        'strong-one',
        'room-glow-up',
        'cdrama-comfort',
      ];

      expectedSlugs.forEach((slug) => {
        expect(POSTS[slug]).toBeDefined();
      });
    });

    it('should have correct structure for each post', () => {
      Object.values(POSTS).forEach((post) => {
        expect(post).toHaveProperty('slug');
        expect(post).toHaveProperty('tag');
        expect(post).toHaveProperty('title');
        expect(post).toHaveProperty('date');
        expect(post).toHaveProperty('content');
        expect(typeof post.slug).toBe('string');
        expect(typeof post.tag).toBe('string');
        expect(typeof post.title).toBe('string');
        expect(typeof post.date).toBe('string');
      });
    });
  });

  describe('Exam Survival Post', () => {
    const examPost = POSTS['exam-survival'];

    it('should have correct metadata', () => {
      expect(examPost.slug).toBe('exam-survival');
      expect(examPost.tag).toBe('Finance Grind');
      expect(examPost.title).toBe('The Finance Girl\'s Survival Guide to Exam Season');
      expect(examPost.date).toBe('Last updated 2025');
    });

    it('should have description', () => {
      expect(examPost.description).toBeDefined();
      expect(examPost.description).toContain('cheat sheets');
    });

    it('should have content', () => {
      expect(examPost.content).toBeDefined();
      expect(examPost.content).not.toBeNull();
    });
  });

  describe('Post Categories', () => {
    const categories = {
      'Finance Grind': ['aon-internship', 'r-for-finance', 'exam-survival'],
      'Global De': ['ghana-changed-me', 'mandarin-journey', 'guyanese-chinese-fusion'],
      'Business Builder': ['kofi-trucking', 'wang-tours', 'kofi-systems'],
      'Life & Growth': ['grief-and-grind', 'strong-one'],
      'Fun Stuff': ['room-glow-up', 'cdrama-comfort'],
    };

    Object.entries(categories).forEach(([category, slugs]) => {
      it(`should have posts in ${category}`, () => {
        slugs.forEach((slug) => {
          const post = POSTS[slug];
          expect(post.tag).toBe(category);
        });
      });
    });
  });

  describe('Post Content Validation', () => {
    it('exam-survival post should have full content', () => {
      const examPost = POSTS['exam-survival'];
      const contentStr = JSON.stringify(examPost.content);

      expect(contentStr).toContain('Finals season');
      expect(contentStr).toContain('Cheat Sheet');
      expect(contentStr).toContain('Time-Blocking');
      expect(contentStr).toContain('Nelson');
    });

    it('aon-internship post should have full content', () => {
      const aonPost = POSTS['aon-internship'];
      const contentStr = JSON.stringify(aonPost.content);

      expect(contentStr).toContain('Aon');
      expect(contentStr).toContain('D&O');
      expect(contentStr).toContain('insurance');
    });
  });

  describe('Post Accessibility', () => {
    it('all posts should be accessible by slug', () => {
      Object.keys(POSTS).forEach((slug) => {
        expect(POSTS[slug]).toBeDefined();
        expect(POSTS[slug].slug).toBe(slug);
      });
    });

    it('all posts should have non-empty titles', () => {
      Object.values(POSTS).forEach((post) => {
        expect(post.title.length).toBeGreaterThan(0);
      });
    });

    it('all posts should have valid tags', () => {
      const validTags = [
        'Finance Grind',
        'Global De',
        'Business Builder',
        'Life & Growth',
        'Fun Stuff',
      ];

      Object.values(POSTS).forEach((post) => {
        expect(validTags).toContain(post.tag);
      });
    });
  });
});
