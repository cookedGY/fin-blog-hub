# DeCodes cloud workspace

The website application is in `blog-finance-hub/`. Read its `AGENTS.md` and
`docs/cloud-workflow.md` before editing. Run commands from that directory.

This repository is public. Keep brainstorming, unpublished drafts and private
attachments in the private task; do not commit them to the repository.

Support two workflows in the same cloud environment:

- **Articles:** brainstorm, draft, revise and prepare an article in one task.
  Compare with existing articles before claiming a topic is new. Read
  `docs/publishing-workflow.md` and match the current post schema.
- **Website:** implement and locally preview visual or functional changes,
  preserving published articles and existing hosting.

Preparing changes is allowed. Before any push, public pull request, public
preview, production merge or deployment, show the exact content/diff and test
results and obtain the user's explicit approval for that revision and action.
Never infer publication approval from a brainstorming or editing request.
Never disclose credentials or copy `.env`, cookies or local credential stores.

Keep a task-local record of the requested change, approval, commit, and deployment
verification. Check current remote state before publication to avoid duplicate
posts and overwriting concurrent changes. A successful push is not proof that
Vercel deployed successfully.
