import { Link } from "wouter";
import { POSTS, Post } from "@/data/posts";
import { getRelatedPosts } from "@/data/relatedPosts";

interface RelatedPostsProps {
  currentSlug: string;
  currentCategory: string;
  maxPosts?: number;
}

export default function RelatedPosts({
  currentSlug,
  currentCategory,
  maxPosts = 3,
}: RelatedPostsProps) {
  // First, try to get related posts from the mapping (semantic linking)
  let relatedPostSlugs = getRelatedPosts(currentSlug);

  // If no semantic links found, fall back to category-based linking
  if (relatedPostSlugs.length === 0) {
    relatedPostSlugs = Object.values(POSTS)
      .filter(
        (post) =>
          post.tag === currentCategory && post.slug !== currentSlug
      )
      .map((post) => post.slug);
  }

  // Get the actual post objects
  const relatedPosts = relatedPostSlugs
    .map((slug) => POSTS[slug])
    .filter((post): post is Post => post !== undefined)
    .slice(0, maxPosts);

  if (relatedPosts.length === 0) {
    return null;
  }

  return (
    <section className="mt-16 pt-10 border-t border-border">
      <h2 className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-6">
        Also Worth Reading
      </h2>
      <div className="flex flex-col divide-y divide-border">
        {relatedPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/post/${post.slug}`}
            className="group flex items-start justify-between gap-6 py-4 hover:text-primary transition-colors"
          >
            <div className="flex flex-col gap-1 min-w-0">
              <span className="text-xs font-semibold tracking-widest uppercase text-primary opacity-70">
                {post.tag}
              </span>
              <span className="font-serif text-base leading-snug group-hover:text-primary transition-colors line-clamp-2">
                {post.title}
              </span>
            </div>
            <span className="text-xs text-muted-foreground whitespace-nowrap pt-1 shrink-0">
              {post.date}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
