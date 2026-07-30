import { useEffect, useMemo } from "react";
import { useRoute, Link } from "wouter";
import { POSTS } from "@/data/posts";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RelatedPosts from "@/components/RelatedPosts";
import NewsletterSignup from "@/components/NewsletterSignup";
import SocialShareButtons from "@/components/SocialShareButtons";
import AuthorBio from "@/components/AuthorBio";
import { updateMetaTags, createBlogPostSchema, injectStructuredData } from "@/lib/seo";
import NewsletterPopup from "@/components/NewsletterPopup";
import { getReadingTime } from "@/lib/readingTime";

function ReadingTime({ content }: { content: React.ReactNode }) {
  const contentString = typeof content === 'string' ? content : '';
  const { formatted: readingTime } = useMemo(() => getReadingTime(contentString), [contentString]);
  return <>{readingTime}</>;
}

export default function BlogPost() {
  const [match, params] = useRoute("/post/:slug");
  const slug = params?.slug;
  const post = slug ? POSTS[slug] : null;

  // Scroll to top when post changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // Set meta tags and structured data for SEO
  useEffect(() => {
    if (!post || !post.seoKeywords) return;

    const canonicalUrl = `https://finbloghub.manus.space/post/${slug}`;
    let canonicalTag = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalTag) {
      canonicalTag = document.createElement('link');
      canonicalTag.rel = 'canonical';
      document.head.appendChild(canonicalTag);
    }
    (canonicalTag as HTMLLinkElement).href = canonicalUrl;

    updateMetaTags(
      post.title,
      post.seoDescription || post.description || '',
      post.thumbnail || '',
      post.seoKeywords
    );

    const schema = createBlogPostSchema(
      post.title,
      post.seoDescription || post.description || '',
      post.thumbnail || '',
      post.date,
      post.seoKeywords
    );
    injectStructuredData(schema);
  }, [post, slug]);

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex flex-col items-center justify-center p-4 text-center">
          <h1 className="font-serif text-3xl mb-4">Post not found</h1>
          <p className="text-muted-foreground mb-6">The article you're looking for doesn't exist or has been moved.</p>
          <Link href="/" className="btn btn-primary">Go Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="editorial-main">

        {/* ── EDITORIAL HEADER ── */}
        <div className="editorial-header-wrap">
          <div className="editorial-header container">
            <div className="editorial-header-meta">
              <Link href="/" className="editorial-back">← All Posts</Link>
              <span className="editorial-meta-sep">·</span>
              <span className="editorial-category">{post.tag}</span>
              <span className="editorial-meta-sep">·</span>
              <span className="editorial-date">{post.date}</span>
              <span className="editorial-meta-sep">·</span>
              <span className="editorial-byline">By Dekena Wade</span>
              <span className="editorial-meta-sep">·</span>
              <span className="editorial-reading-time">
                <ReadingTime content={post.content} />
              </span>
            </div>
            <h1 className="editorial-title">{post.title}</h1>
            {post.description && (
              <p className="editorial-subtitle">{post.description}</p>
            )}
          </div>
        </div>

        {/* ── ARTICLE BODY + SIDEBAR ── */}
        <div className="editorial-body-wrap container">
          <div className="editorial-layout">

            {/* Main content column */}
            <article className="editorial-article">
              {post.thumbnail && (
                <div className="editorial-hero-img">
                  <img src={post.thumbnail} alt={post.title} />
                </div>
              )}
              <div className="post-content editorial-content">
                {post.content}
              </div>
            </article>

            {/* Sidebar */}
            <aside className="editorial-sidebar">
              <div className="editorial-sidebar-inner">

                {/* Category + tags */}
                <div className="sidebar-block">
                  <div className="sidebar-label">Category</div>
                  <div className="sidebar-value">{post.tag}</div>
                </div>

                {post.seoKeywords && post.seoKeywords.length > 0 && (
                  <div className="sidebar-block">
                    <div className="sidebar-label">Tags</div>
                    <div className="sidebar-tags">
                      {post.seoKeywords.slice(0, 5).map((kw: string) => (
                        <span key={kw} className="sidebar-tag">{kw}</span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="sidebar-block">
                  <div className="sidebar-label">Published</div>
                  <div className="sidebar-value">{post.date}</div>
                </div>

                <div className="sidebar-block">
                  <div className="sidebar-label">Reading time</div>
                  <div className="sidebar-value">
                    <ReadingTime content={post.content} />
                  </div>
                </div>

                <div className="sidebar-block">
                  <div className="sidebar-label">Author</div>
                  <div className="sidebar-value">Dekena Wade</div>
                  <div className="sidebar-author-sub">Finance student, Brooklyn</div>
                </div>

                {/* Share */}
                <div className="sidebar-block sidebar-share">
                  <div className="sidebar-label">Share</div>
                  <div className="sidebar-share-links">
                    <a
                      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://finbloghub.manus.space/post/${post.slug}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="sidebar-share-btn"
                    >
                      𝕏 Twitter
                    </a>
                    <a
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://finbloghub.manus.space/post/${post.slug}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="sidebar-share-btn"
                    >
                      in LinkedIn
                    </a>
                  </div>
                </div>

              </div>
            </aside>
          </div>
        </div>

        {/* Below-article components */}
        <div className="editorial-below container">
          <SocialShareButtons
            title={post.title}
            url={typeof window !== 'undefined' ? window.location.href : ''}
            description={post.seoDescription || post.description}
          />
          <AuthorBio />
          <RelatedPosts currentSlug={post.slug} currentCategory={post.tag} />
          <NewsletterSignup source="blog-post" />
        </div>

        {/* Slide-in newsletter popup — triggers at 40% scroll */}
        <NewsletterPopup postSlug={post.slug} />

      </main>

      <Footer />
    </div>
  );
}
