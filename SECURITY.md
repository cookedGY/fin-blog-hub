# Security

This is a public personal website repository. Source code and already published
articles are intentionally visible. Credentials and unpublished personal
material must remain private.

## Reporting a concern

Use GitHub's **Report a vulnerability** option if it is enabled for this
repository. If it is unavailable, contact the owner privately through the
website's published contact channel. Do not post credentials, personal data
or exploit details in a public issue.

## Before publishing

- Keep credentials in the relevant provider's secret settings, not the repo.
- Never put secrets in `VITE_*` variables: frontend build values may be shipped
  to visitors.
- Keep `.env` files, database dumps, diagnostic logs and private drafts out of
  commits. `.gitignore` does not remove files already in Git history.
- Review staged changes, dependency advisories and generated output.
- Treat a public PR, branch or deployment preview as publication.
- Check GitHub secret-scanning alerts and enable appropriate push protection
  and branch controls through repository settings.

## If a credential is exposed

Revoke or rotate it first. Removing a file or making the repository private
does not invalidate a credential or remove existing copies. Coordinate any
history cleanup rather than force-pushing without a recovery plan.

## Deployment boundary

The repository includes frontend and backend code. Confirm which components
are actually deployed before assessing internet exposure. A successful static
build does not validate authentication, database, email or upload services.
Review those services and their dependencies before enabling them publicly.

Security documentation is guidance, not evidence that all controls have been
enabled or that a full security audit has passed.
