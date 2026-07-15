# Codex publishing guide

This project stores published blog posts directly in React/TypeScript, not in Markdown.

When the user asks Codex to publish a post, update these files:

- `client/src/data/posts.tsx`: add the new post to the `POSTS` object.
- `client/src/data/relatedPosts.ts`: add internal links for the new slug when related posts are known.
- `client/public/sitemap.xml`: add a `/post/<slug>` entry with the publish date.

Post objects must include:

- `slug`: lowercase kebab-case, matching the object key and URL path.
- `tag`: one of `Finance Grind`, `Global De`, `Business Builder`, `Life & Growth`, or `Fun Stuff`.
- `title`
- `date`
- `description`
- `seoKeywords`
- `seoDescription`
- `content`: JSX wrapped in a fragment.

Optional:

- `thumbnail`: public image URL.

Publishing checklist:

1. Read `docs/publishing-workflow.md`.
2. Draft or convert the article into JSX paragraphs, headings, lists, and links.
3. Add the post near the top of `POSTS` if it is new or timely.
4. Add related-post mappings when useful.
5. Add the sitemap URL.
6. Run `pnpm check` and relevant tests, usually `pnpm test -- server/blog-posts.test.ts client/src/data/relatedPosts.test.ts`.
7. Commit and push after the user approves the final content.

Keep the author's voice direct, personal, analytical, and grounded in finance, culture, work, and lived experience. Preserve existing formatting patterns in `posts.tsx`.
