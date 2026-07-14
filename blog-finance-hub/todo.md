# DeCodes Life - Project TODO

## Completed Features
- [x] Homepage with 5 main sections (Finance Grind, Global De, Business Builder, Life & Growth, Fun Stuff)
- [x] Blog post pages with dynamic routing
- [x] Projects page with Nokia and Iomega case study links
- [x] Search functionality for blog posts and projects
- [x] Newsletter signup form in footer
- [x] Mobile-responsive design
- [x] SEO optimization (meta tags, Open Graph, Twitter Cards)
- [x] Loading animation (spinning globe)
- [x] Jade/Pink/Gold color scheme with Swiss Modernist design
- [x] Full-stack upgrade (Express backend, tRPC, MySQL/TiDB, Drizzle ORM)
- [x] Manus OAuth authentication
- [x] S3 file storage configuration

## In Progress
- [x] File upload interface and management page
- [x] Integrate file storage with Projects page (via FileManager page)
- [x] Build vitest tests for file upload functionality
- [ ] Create admin panel for file management (optional enhancement)

## Future Enhancements
- [ ] Interactive finance calculators (DCF model, investment calculator, etc.)
- [ ] Blog post comments/discussion system
- [ ] Analytics dashboard for blog performance
- [ ] Email notification system for new blog posts
- [ ] Social media sharing buttons
- [ ] Dark mode toggle
- [ ] Internationalization (Mandarin support)
- [ ] Advanced search filters by category/date
- [ ] Blog post drafts and scheduling
- [ ] User profile customization

## Portfolio Page (Completed)
- [x] Create public portfolio page component with category filtering
- [x] Add tRPC procedure for fetching public project files
- [x] Integrate portfolio page into routing and navigation
- [x] Write vitest tests for portfolio functionality (16 tests passing)
- [x] Test and verify portfolio page displays correctly

## Blog Posts (Completed)
- [x] Add "The Finance Girl's Survival Guide to Exam Season" post to Finance Grind section
- [x] Create blog post detail page component (already existed)
- [x] Update Home page with new post card (already linked)
- [x] Test blog post links and display (15 tests passing)

## Related Posts Feature (Completed)
- [x] Create RelatedPosts component
- [x] Integrate RelatedPosts into BlogPost page
- [x] Style RelatedPosts component to match design
- [x] Write vitest tests for RelatedPosts functionality (17 tests passing)
- [x] Test blog post pages display related posts correctly

## New Blog Post (Completed)
- [x] Add "What Learning Finance Has Actually Taught Me So Far" to Finance Grind section
- [x] Update Home page references
- [x] Write and run tests (15 tests passing)

## New Blog Post: Geopolitics & AI (Completed)
- [x] Add "The World Economy During War — While Agentic AI Watches Everything" post (Finance Grind category)
- [x] Update Home page Finance Grind section
- [x] Write and run tests (17 tests passing)

## Blog Post Thumbnails (Completed)
- [x] Generate thumbnail images for all blog posts (4 images)
- [x] Update Post interface with thumbnail property
- [x] Add thumbnails to all blog posts
- [x] Display thumbnails in blog cards and detail pages
- [x] Write and run tests (15 tests passing)

## Security Improvements (Completed)
- [x] Install security dependencies (helmet, express-rate-limit, cors)
- [x] Add security headers middleware (helmet configured)
- [x] Implement file type validation (8 allowed MIME types, 50MB limit)
- [x] Add rate limiting to auth endpoints (5 requests per 15 minutes)
- [x] Configure CORS properly (domain whitelist configured)
- [x] Write and run security tests (12 tests passing)

## Audit Logging (Completed)
- [x] Create audit logging database table (auditLogs table with 13 columns)
- [x] Create audit logging utility functions (6 helper functions)
- [x] Add logging to OAuth authentication endpoints (success/failure tracking)
- [x] Add logging to file upload and deletion operations (with details)
- [x] Create audit log viewer endpoint (admin-only tRPC procedures)
- [x] Write and run audit logging tests (18 tests passing)

## Blog Post Updates (Completed)
- [x] Fix and improve agentic AI sentence in geopolitics post

## External Case Study Links (Completed)
- [x] Add Nokia and IOMEGA case study cards to Portfolio page (Featured Case Studies section)
- [x] Create Featured Projects section on Home page
- [x] Style and test case study cards (hover effects, responsive grid)

## Maritime Insurance Post (Completed)
- [x] Add "Could the U.S. Replace Lloyd's of London in Maritime Insurance?" to Finance Grind section
- [x] Generate thumbnail image (professional maritime insurance design)
- [x] Update Home page Finance Grind section
- [x] Write and run tests (9 tests passing)

## Newsletter & Engagement Features (Completed)
- [x] Create newsletter database schema and subscriber management (4 tables: newsletterSubscribers, newsletterEmails, newsletterEmailLogs, auditLogs)
- [x] Build newsletter signup form component (NewsletterSignup.tsx with email validation and status messages)
- [x] Add tRPC procedures for newsletter operations (subscribe, unsubscribe, getSubscribers, getActiveSubscribers, getEmailLogs)
- [x] Write and run comprehensive tests (16 vitest tests passing covering all newsletter functionality)
- [x] Integrate newsletter signup into blog posts (added to BlogPost.tsx)
- [x] Integrate newsletter signup into homepage (added to Home.tsx)
- [x] Add newsletter styling to index.css (responsive design with Jade/Pink/Gold theme)

## Post Header & Social Sharing (Completed)
- [x] Create reading time calculation utility (readingTime.ts with 4 functions)
- [x] Build social sharing buttons component (Twitter, LinkedIn, Email with icons)
- [x] Enhance post header with decorative divider and reading time
- [x] Add visual polish styling (animations, hover effects, improved spacing, link styling)
- [x] Integrate social sharing into BlogPost component
- [x] Write and run tests for new features (readingTime.test.ts with 18 tests)

## Contact Form Email Fix (Completed)
- [x] Replace broken Formspree endpoint with Nodemailer + Gmail SMTP backend route
- [x] Add tRPC contact.send procedure with input validation
- [x] Rewrite Contact.tsx to use trpc.contact.send mutation
- [x] Add loading state, success screen, and error handling to contact form
- [x] Add GMAIL_USER and GMAIL_APP_PASSWORD env vars to ENV config
- [ ] Set GMAIL_USER and GMAIL_APP_PASSWORD secrets so email actually delivers

## Newsletter Popup (Completed)
- [x] Build slide-in newsletter popup component (NewsletterPopup.tsx)
- [x] Trigger popup at 40% scroll depth on all article pages
- [x] Wire popup to trpc.newsletter.subscribe mutation
- [x] Add sessionStorage-based dismissal (won't re-show in same session)
- [x] Add localStorage-based subscription tracking (won't show if already subscribed)
- [x] Add CSS styles with slide-in animation and mobile-responsive layout
- [x] Integrate popup into BlogPost.tsx with postSlug tracking

## Future Enhancements (Not Yet Implemented)
- [ ] Create admin newsletter dashboard
- [ ] Email notification system to send updates to subscribers when new posts are published
- [ ] Set GMAIL_APP_PASSWORD secret to enable contact form email delivery and newsletter sending
