# DeCodes from any device

Use one private Codex Cloud environment connected to `cookedGY/fin-blog-hub`.
Use separate tasks for each article or website change so work stays manageable.
Brainstorm and prepare the article in the same task; no local publishing chat
or laptop filesystem is required.

## One-time environment setup

On ChatGPT web or desktop, choose **Work in → Cloud → Select environment →
Create environment**. Select the existing GitHub repository and restrict access
to yourself. If GitHub asks for a new grant, review its scope before authorizing.
Do not add Vercel tokens or production database credentials just to build the site.

Use Node 24 and the package manager declared in `package.json` (pnpm 10.4.1).
From the repository root:

```sh
cd blog-finance-hub
corepack enable
corepack pnpm install --frozen-lockfile
corepack pnpm check
corepack pnpm test -- server/blog-posts.test.ts client/src/data/relatedPosts.test.ts
corepack pnpm run build
```

If Corepack is absent, install the declared pnpm version using the environment's
package-manager setup. Do not silently use a different pnpm version or regenerate
the lockfile to hide an install error. No production secrets are needed for the
static frontend build tested here.

Review setup results, then save/publish the **cloud environment**. This makes the
environment usable for tasks; it is distinct from publishing the website.
Verify this environment on a second device before calling the setup complete.

## Articles

Start a private task in that environment:

> I have an article idea: [idea]. Help me brainstorm it, compare it with existing
> posts, and develop a draft in my voice. Keep this private. When the final draft
> is ready, prepare the website changes and show them to me before publishing.

Continue the same task to revise and prepare the post. Supply images as actual
attachments, not laptop paths. Codex should propose missing metadata for review
rather than requiring a long form before brainstorming.

Before publication, confirm title, category, date, slug, excerpt, SEO description,
keywords, body, related articles and any image/attribution. Published content
lives in `client/src/data/posts.tsx`; update related links and sitemap following
the existing guide. The build generates RSS and prerendered article pages.

This is a public repository. Draft branches and PRs can expose article text;
Vercel may create publicly reachable preview URLs from branch pushes.
Ask before pushing or opening a PR, even if production is unchanged.

## Website changes

Start a separate task in the same environment:

> Website change: [request]. Inspect the existing implementation, preserve
> articles and hosting, implement the change, and test it locally at desktop and
> mobile sizes. Show me the diff and preview before any public push/deployment.

For theme changes, test both directions, reload persistence, page navigation,
mobile navigation and article readability.

## Approve and verify

1. Review the exact final content/diff and checks.
2. Approve the identified revision and the intended public action explicitly.
3. Refresh the remote branch and handle conflicts without overwriting others.
4. Use the existing GitHub/Vercel production path; do not change DNS or hosting.
5. Confirm Vercel succeeded for the approved commit and inspect the live result.
6. Report the live URL and deployment outcome. If deployment fails, report it
   clearly; keep the last successful production deployment while diagnosing.

The prepared `Website checks` GitHub Actions workflow runs checks and builds;
it never deploys or receives production secrets. Once it has run on GitHub,
configure its `check` job as a required production-branch check. The workflow
file alone does not enforce branch protection or stop Vercel from deploying a
direct push. No hosted CI run or branch-protection setting is claimed here.

Site instructions currently contain historical `finbloghub.space` URLs.
Verify canonical-domain settings before changing URLs; do not migrate them
incidentally during an article or theme update.

## Mobile

After initial environment setup on web/desktop, open Codex on mobile, select the
saved cloud environment and start or continue a task there. A remote connection
to a laptop is a different mode and still depends on that laptop.

The environment and this guide do not automatically import old ChatGPT chats.
For an older brainstorm, supply its final draft or accessible conversation
reference once. New articles can be developed entirely within their cloud task.

References:
- https://learn.chatgpt.com/docs/cloud
- https://learn.chatgpt.com/docs/environments/cloud-environments
- https://vercel.com/docs/git
