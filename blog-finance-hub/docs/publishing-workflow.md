# Publishing workflow

Use this when you want Codex to publish a new article on Fin Blog Hub.

## How to ask Codex

Send a message like:

```text
Publish this as a new post:
Title: ...
Category: Finance Grind
Date: July 14, 2026
Slug: optional-custom-slug
Description: ...
SEO keywords: keyword one, keyword two, keyword three
Related posts: slug-one, slug-two

Draft:
...
```

You can also say:

```text
Turn this draft into a polished Fin Blog Hub article and publish it.
```

Codex will turn the draft into the site's React post format, add it to the blog data, update related links, update the sitemap, run checks, and prepare it for commit/push.

## What Codex edits

Published posts live in:

- `client/src/data/posts.tsx`

Related-post recommendations live in:

- `client/src/data/relatedPosts.ts`

Search engines discover post URLs from:

- `client/public/sitemap.xml`

## Categories

Use one of these category labels:

- `Finance Grind`
- `Global De`
- `Business Builder`
- `Life & Growth`
- `Fun Stuff`

## Useful post fields

- `title`: the display title.
- `slug`: the URL path after `/post/`.
- `date`: the visible publish date.
- `description`: short preview text for cards.
- `seoDescription`: search/social summary.
- `seoKeywords`: 5 to 10 focused search phrases.
- `thumbnail`: optional image URL.
- `content`: the article body as JSX.

## Best publishing rhythm

1. Give Codex a draft, notes, or topic.
2. Ask Codex to polish the article in your voice.
3. Approve the final text.
4. Ask Codex to publish it.
5. Ask Codex to push the repo when you are ready for Manus or your host to redeploy.

## Quick prompt

```text
Publish a new Fin Blog Hub post from the draft below. Keep my voice personal, sharp, finance-aware, and readable. Add SEO metadata, choose a slug, update related posts, update the sitemap, run checks, and tell me what changed before pushing.

Draft:
...
```
