// SEO utilities for structured data and meta tags

export interface BlogPostSchema {
  "@context": string;
  "@type": string;
  headline: string;
  description: string;
  image: string;
  datePublished: string;
  author: {
    "@type": string;
    name: string;
  };
  keywords: string;
}

export function createBlogPostSchema(
  title: string,
  description: string,
  image: string,
  date: string,
  keywords: string[]
): BlogPostSchema {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description: description,
    image: image,
    datePublished: date,
    author: {
      "@type": "Person",
      name: "Dekena Wade",
    },
    keywords: keywords.join(", "),
  };
}

export function injectStructuredData(schema: BlogPostSchema) {
  // Remove any existing structured data script
  const existingScript = document.querySelector('script[type="application/ld+json"]');
  if (existingScript) {
    existingScript.remove();
  }

  // Create and inject new structured data
  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
}

export function updateMetaTags(
  title: string,
  description: string,
  image: string,
  keywords: string[]
) {
  // Update title
  document.title = `${title} | DeCodes Life`;

  // Update meta description
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute("content", description);
  }

  // Update keywords
  const metaKeywords = document.querySelector('meta[name="keywords"]');
  if (metaKeywords) {
    metaKeywords.setAttribute("content", keywords.join(", "));
  }

  // Update Open Graph tags
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute("content", title);

  const ogDescription = document.querySelector('meta[property="og:description"]');
  if (ogDescription) ogDescription.setAttribute("content", description);

  const ogImage = document.querySelector('meta[property="og:image"]');
  if (ogImage) ogImage.setAttribute("content", image);

  // Update Twitter tags
  const twitterTitle = document.querySelector('meta[name="twitter:title"]');
  if (twitterTitle) twitterTitle.setAttribute("content", title);

  const twitterDescription = document.querySelector(
    'meta[name="twitter:description"]'
  );
  if (twitterDescription) twitterDescription.setAttribute("content", description);

  const twitterImage = document.querySelector('meta[name="twitter:image"]');
  if (twitterImage) twitterImage.setAttribute("content", image);
}
