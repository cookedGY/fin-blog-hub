import React from "react";
import { Button } from "@/components/ui/button";
import { Mail, Rss } from "lucide-react";

interface NewsletterSignupProps {
  source?: string;
  postSlug?: string;
  className?: string;
}

export default function NewsletterSignup({
  className = "",
}: NewsletterSignupProps) {
  const newsletterUrl = import.meta.env.VITE_NEWSLETTER_SUBSCRIBE_URL;

  return (
    <div className={`newsletter-signup ${className}`}>
      <div className="newsletter-signup-content">
        <div className="newsletter-signup-header">
          <Mail className="w-6 h-6 text-primary" />
          <h3>Get New Posts in Your Inbox</h3>
        </div>
        <p className="newsletter-signup-description">
          Get new articles about finance, business, technology, and personal growth delivered through my newsletter feed.
        </p>

        <div className="newsletter-actions">
          {newsletterUrl ? (
            <Button asChild className="subscribe-button">
              <a href={newsletterUrl} target="_blank" rel="noopener noreferrer">
                Subscribe for Email Updates
              </a>
            </Button>
          ) : (
            <Button asChild className="subscribe-button">
              <a href="/rss.xml" target="_blank" rel="noopener noreferrer">
                <Rss className="w-4 h-4" />
                Open RSS Feed
              </a>
            </Button>
          )}
        </div>

        <p className="newsletter-privacy">
          No spam, unsubscribe anytime. The email signup link will connect here once the newsletter account is live.
        </p>
      </div>
    </div>
  );
}
