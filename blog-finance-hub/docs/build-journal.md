# Building DeCodes Life

This journal summarizes changes supported by the repository's commit history.
It separates the original AI-assisted starting point from subsequent design,
publishing and deployment work.

## From generated site to a maintained codebase

The site began with Manus. On July 14, 2026, the application source entered this
repository in [`5210d31`](https://github.com/cookedGY/fin-blog-hub/commit/5210d31).
That is the beginning of this repository's recorded history, not necessarily
the beginning of the project.

The same day, the site gained an article about learning Python and taking
ownership of the website
([`4809991`](https://github.com/cookedGY/fin-blog-hub/commit/4809991)).
Deployment work addressed authentication URL fallback and single-page-app
routing on Vercel
([`af38878`](https://github.com/cookedGY/fin-blog-hub/commit/af38878),
[`bd12868`](https://github.com/cookedGY/fin-blog-hub/commit/bd12868)).

**Lesson:** getting a generated site to run is different from understanding how
its content, routes and deployment fit together.

## Turning a website into a portfolio

July 29 added a public learning-progress section
([`59d0043`](https://github.com/cookedGY/fin-blog-hub/commit/59d0043))
and reorganized the portfolio around finance and technical work
([`b31a2fa`](https://github.com/cookedGY/fin-blog-hub/commit/b31a2fa)).
July 30 brought visual iterations, background imagery, animation and
readability work
([`7bf6e43`](https://github.com/cookedGY/fin-blog-hub/commit/7bf6e43),
[`8cbedea`](https://github.com/cookedGY/fin-blog-hub/commit/8cbedea)).

**Lesson:** a portfolio needs to explain what the work demonstrates, as well as
provide links to projects.

## Building the publishing loop

The site added RSS/newsletter integration
([`d87591d`](https://github.com/cookedGY/fin-blog-hub/commit/d87591d),
[`5109e71`](https://github.com/cookedGY/fin-blog-hub/commit/5109e71))
and mobile reading improvements
([`3905c6a`](https://github.com/cookedGY/fin-blog-hub/commit/3905c6a)).
On August 6, prerendered article pages were added for crawlers
([`64ee305`](https://github.com/cookedGY/fin-blog-hub/commit/64ee305)).
Later article commits show an ongoing editorial workflow rather than a
one-time website export.

**Lesson:** publishing includes metadata, discoverability, internal links and
mobile reading, not only adding paragraphs to a page.

## Learning from a deployment failure

The August 31 history records several pnpm configuration and lockfile fixes.
The final recorded change regenerated the lockfile with Vercel's pnpm version
([`d0754e4`](https://github.com/cookedGY/fin-blog-hub/commit/d0754e4)).

**Lesson:** a locally installed tool can differ from the deployment environment.
Pinning the package manager and testing a frozen-lockfile install makes that
difference visible before publication.

## Current work: cloud access, themes and repository clarity

The next iteration prepares two workflows in one cloud environment: private
article development and website maintenance. It also corrects dark-theme
colors, makes theme persistence tolerant of unavailable browser storage,
updates publication checks and documents the project at the repository root.
The security preparation removes tracked diagnostic artifacts, adds repository-wide
ignore rules, rejects insufficient session-signing keys, and updates selected
production dependencies, including targeted patched versions where the existing
ranges did not include a security fix. These are
incremental improvements, not a claim that the full application is security-audited.

Cloud environment activation, cross-device verification and production
deployment are separate milestones. These instructions do not claim they have
already happened.

## Where to look next

- [`posts.tsx`](../client/src/data/posts.tsx): typed editorial content.
- [`relatedPosts.ts`](../client/src/data/relatedPosts.ts): internal recommendations.
- [`ThemeContext.tsx`](../client/src/contexts/ThemeContext.tsx): theme switching.
- [`scripts/`](../scripts/): generated publishing artifacts.
- [`cloud-workflow.md`](cloud-workflow.md): the proposed cross-device process.
