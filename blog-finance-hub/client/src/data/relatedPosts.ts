/**
 * Related posts mapping for internal linking
 * Each post slug maps to an array of related post slugs
 * This improves SEO and user engagement by connecting thematically similar content
 */

export const relatedPostsMap: Record<string, string[]> = {
  // Portfolio infrastructure & learning in public
  "under-the-hood-dad-taught-me-systems": [
    "taking-reins-cloned-website-harvard-python",
    "from-fashion-to-finance",
    "what-finance-taught-me",
  ],
  "taking-reins-cloned-website-harvard-python": [
    "under-the-hood-dad-taught-me-systems",
    "r-for-finance",
    "ai-tax-diagram-tool",
  ],

  // AI & Finance Tools cluster
  "ai-tax-diagram-tool": [
    "taking-reins-cloned-website-harvard-python",
    "geopolitics-ai",
    "training-models-waiting-for-job",
  ],
  "geopolitics-ai": [
    "ai-tax-diagram-tool",
    "maritime-insurance",
    "ai-environmental-discrimination",
  ],
  "training-models-waiting-for-job": [
    "ai-environmental-discrimination",
    "ai-tax-diagram-tool",
    "graduating-into-inflation",
  ],
  "graduating-into-inflation": [
    "training-models-waiting-for-job",
    "ai-environmental-discrimination",
    "aon-internship",
  ],
  "ai-environmental-discrimination": [
    "training-models-waiting-for-job",
    "geopolitics-ai",
    "graduating-into-inflation",
  ],

  // Geopolitical Risk & Insurance cluster
  "maritime-insurance": [
    "geopolitics-ai",
    "aon-internship",
    "war-risk-insurance-lloyds",
  ],
  "war-risk-insurance-lloyds": [
    "maritime-insurance",
    "aon-internship",
    "geopolitics-ai",
  ],

  // R / Data / Tech cluster
  "r-for-finance": [
    "taking-reins-cloned-website-harvard-python",
    "what-finance-taught-me",
    "training-models-waiting-for-job",
  ],

  // Professional Experience cluster
  "aon-internship": [
    "maritime-insurance",
    "graduating-into-inflation",
  ],

  // Personal/Life posts
  "grief-and-grind": [
    "from-fashion-to-finance",
  ],

  // Origin story & career journey
  "from-fashion-to-finance": [
    "under-the-hood-dad-taught-me-systems",
    "aon-internship",
    "graduating-into-inflation",
  ],

  // Language & Global perspective
  "learning-mandarin-finance-major": [
    "from-fashion-to-finance",
    "maritime-insurance",
    "geopolitics-ai",
  ],

  // Industrialization parallels & AI infrastructure
  "who-is-documenting-this": [
    "ai-environmental-discrimination",
    "training-models-waiting-for-job",
    "geopolitics-ai",
  ],

  // Search evolution & information literacy
  "how-search-changed": [
    "r-for-finance",
    "training-models-waiting-for-job",
    "who-is-documenting-this",
  ],

  // AI agents, synthetic data, future of finance work
  "when-ai-builds-itself": [
    "training-models-waiting-for-job",
    "ai-environmental-discrimination",
    "r-for-finance",
  ],
};

/**
 * Get related posts for a given post slug
 * Returns up to 3 most relevant related posts
 */
export function getRelatedPosts(slug: string): string[] {
  return relatedPostsMap[slug] || [];
}
