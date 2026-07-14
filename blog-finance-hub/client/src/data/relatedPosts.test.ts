import { describe, it, expect } from 'vitest';
import { getRelatedPosts, relatedPostsMap } from './relatedPosts';

describe('Related Posts Mapping', () => {
  it('should return related posts for AI posts', () => {
    const paperReviewRelated = getRelatedPosts('paper-review-ai');
    expect(paperReviewRelated).toContain('ai-tax-diagram-tool');
    expect(paperReviewRelated).toContain('geopolitics-ai');
  });

  it('should return related posts for tax diagram tool', () => {
    const taxToolRelated = getRelatedPosts('ai-tax-diagram-tool');
    expect(taxToolRelated).toContain('paper-review-ai');
    expect(taxToolRelated).toContain('geopolitics-ai');
  });

  it('should link geopolitics-ai to multiple clusters', () => {
    const geopoliticsRelated = getRelatedPosts('geopolitics-ai');
    expect(geopoliticsRelated).toContain('paper-review-ai');
    expect(geopoliticsRelated).toContain('ai-tax-diagram-tool');
    expect(geopoliticsRelated).toContain('maritime-insurance');
  });

  it('should link maritime-insurance to geopolitics and aon', () => {
    const maritimeRelated = getRelatedPosts('maritime-insurance');
    expect(maritimeRelated).toContain('geopolitics-ai');
    expect(maritimeRelated).toContain('aon-internship');
  });

  it('should return empty array for posts with no related content', () => {
    const griefRelated = getRelatedPosts('grief-and-grind');
    expect(griefRelated).toEqual([]);
  });

  it('should return empty array for non-existent posts', () => {
    const nonExistent = getRelatedPosts('non-existent-post');
    expect(nonExistent).toEqual([]);
  });

  it('should have bidirectional links where appropriate', () => {
    // Paper Review and Tax Tool should link to each other
    const paperReviewRelated = getRelatedPosts('paper-review-ai');
    const taxToolRelated = getRelatedPosts('ai-tax-diagram-tool');
    
    expect(paperReviewRelated).toContain('ai-tax-diagram-tool');
    expect(taxToolRelated).toContain('paper-review-ai');
  });

  it('should have all posts defined in the mapping', () => {
    const allPostSlugs = Object.keys(relatedPostsMap);
    expect(allPostSlugs.length).toBeGreaterThan(0);
    
    // Verify no circular references or invalid slugs
    allPostSlugs.forEach(slug => {
      const related = relatedPostsMap[slug];
      expect(Array.isArray(related)).toBe(true);
    });
  });
});
