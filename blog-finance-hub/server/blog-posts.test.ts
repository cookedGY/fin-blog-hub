import { describe, it, expect } from 'vitest';
import { isValidElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { POSTS } from '../client/src/data/posts';

// Validate the current publication contract, not removed demonstration posts.
describe('Published articles', () => {
  const entries = Object.entries(POSTS);
  it('contains the existing article collection', () => {
    expect(entries.length).toBeGreaterThanOrEqual(24);
    expect(POSTS['aon-internship']).toBeDefined();
    expect(POSTS['career-path-not-linear-never-random']).toBeDefined();
  });

  it.each(entries)('%s has valid routing, metadata and renderable content', (key, post) => {
    expect(post.slug).toBe(key);
    expect(post.slug).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    for (const value of [post.title, post.date, post.description, post.seoDescription]) {
      expect(typeof value).toBe('string');
      expect(value?.trim().length).toBeGreaterThan(0);
    }
    expect(["De's Financial Takes", 'Global De', 'Business Builder', 'Life & Growth', 'Fun Stuff']).toContain(post.tag);
    expect(isValidElement(post.content)).toBe(true);
    if (post.seoKeywords) {
      expect(post.seoKeywords.length).toBeGreaterThan(0);
      post.seoKeywords.forEach(keyword => expect(keyword.trim().length).toBeGreaterThan(0));
    }
  });

  it('preserves the existing Aon article content', () => {
    const content = JSON.stringify(POSTS['aon-internship'].content);
    for (const phrase of ['Aon', 'D&O', 'insurance']) expect(content).toContain(phrase);
  });

  it('provides unique section destinations for every link in the new article contents', () => {
    const post = POSTS['growing-pains-of-technical-advancements'];
    const html = renderToStaticMarkup(post.content);
    const navigation = html.match(/<nav[^>]*aria-labelledby="article-toc-title"[^>]*>([\s\S]*?)<\/nav>/)?.[1];
    expect(navigation).toBeDefined();
    const targets = [...navigation!.matchAll(/href="#([^"]+)"/g)].map(match => match[1]);
    const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map(match => match[1]);
    expect(targets).toHaveLength(10);
    expect(new Set(ids).size).toBe(ids.length);
    targets.forEach(id => expect(html).toContain(`<h2 id="${id}"`));
    expect(html).toContain('Every technology boom comes with an invitation:');
    expect(html).not.toContain('—');
  });
});
