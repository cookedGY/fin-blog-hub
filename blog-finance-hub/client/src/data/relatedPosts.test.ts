import { describe, it, expect } from 'vitest';
import { getRelatedPosts, relatedPostsMap } from './relatedPosts';
import { POSTS } from './posts';

describe('Related article links', () => {
  it.each(Object.entries(relatedPostsMap))('%s links to existing, distinct articles', (slug, related) => {
    expect(POSTS[slug]).toBeDefined();
    expect(new Set(related).size).toBe(related.length);
    expect(related).not.toContain(slug);
    expect(related.length).toBeLessThanOrEqual(3);
    related.forEach(target => expect(POSTS[target], `Missing target ${target}`).toBeDefined());
  });
  it('returns no recommendations for an unknown article', () => {
    expect(getRelatedPosts('non-existent-post')).toEqual([]);
  });
  it('retains the insurance articles connection', () => {
    expect(getRelatedPosts('maritime-insurance')).toContain('aon-internship');
    expect(getRelatedPosts('aon-internship')).toContain('maritime-insurance');
  });
});
