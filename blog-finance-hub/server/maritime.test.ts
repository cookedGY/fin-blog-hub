import { describe, it, expect } from 'vitest';
import { POSTS } from '../client/src/data/posts';

describe('Maritime Insurance Post', () => {
  const post = POSTS['maritime-insurance'];

  it('should have maritime-insurance slug', () => {
    expect(post.slug).toBe('maritime-insurance');
  });

  it('should have Finance Grind tag', () => {
    expect(post.tag).toBe('Finance Grind');
  });

  it('should have correct title', () => {
    expect(post.title).toContain("Lloyd's of London");
  });

  it('should have March 6, 2026 date', () => {
    expect(post.date).toBe('March 6, 2026');
  });

  it('should have description', () => {
    expect(post.description).toBeDefined();
    expect(post.description).toContain('insurance');
  });

  it('should have thumbnail URL', () => {
    expect(post.thumbnail).toBeDefined();
    expect(post.thumbnail).toContain('maritime-insurance');
    expect(post.thumbnail).toContain('cloudfront');
  });

  it('should have content', () => {
    expect(post.content).toBeDefined();
  });

  it('should be most recent post', () => {
    const posts = Object.values(POSTS);
    const dates = posts.map(p => new Date(p.date).getTime());
    const maritimeDate = new Date(post.date).getTime();
    expect(maritimeDate).toBe(Math.max(...dates));
  });

  it('should be in Finance Grind category', () => {
    const financeGrindPosts = Object.values(POSTS).filter(p => p.tag === 'Finance Grind');
    expect(financeGrindPosts).toContainEqual(post);
  });
});
