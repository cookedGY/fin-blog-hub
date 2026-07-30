import React from "react";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

interface NewsletterSignupProps {
  source?: string;
  postSlug?: string;
  className?: string;
}

export default function NewsletterSignup({
  className = "",
}: NewsletterSignupProps) {
  const followItAction =
    "https://api.follow.it/subscription-form/eGtIdXJzdVkxRUlEM1FyVFVQNnVXdmJsWXlPcDR4bWN3RXRlMzFROXlkV0FlbG1kVHV5UVdmbmNCKyt1bkVJb09uK3NHK3Q5TUJFY3N6b2lQZmgxbkl6WkhqVjVaaVl5Y2NkYXdHYkVUZkJFTXJkZytqVW5RVldrMHJpVGgxRlB8QWQ0cTZId05Mc0F2OXQ5dSt6WEhLNDI3TlJ6SE9YeWkyaWx3Z0ZUZkZQdz0=/8";

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

        <form action={followItAction} method="post" target="_blank" className="newsletter-signup-form">
          <label className="sr-only" htmlFor="follow-it-email">
            Email address
          </label>
          <input
            id="follow-it-email"
            type="email"
            name="email"
            placeholder="your.email@example.com"
            required
            className="input-field"
          />
          <Button type="submit" className="subscribe-button">
            Subscribe for Email Updates
          </Button>
        </form>

        <p className="newsletter-privacy">
          No spam, unsubscribe anytime. New posts will be sent through Follow.it.
        </p>
      </div>
    </div>
  );
}
