import React, { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Mail, X } from "lucide-react";

interface NewsletterPopupProps {
  postSlug?: string;
}

const DISMISSED_KEY = "newsletter_popup_dismissed";
const SUBSCRIBED_KEY = "newsletter_subscribed";

export default function NewsletterPopup(_props: NewsletterPopupProps) {
  const newsletterUrl = import.meta.env.VITE_NEWSLETTER_SUBSCRIBE_URL;
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const handleScroll = useCallback(() => {
    if (dismissed) return;
    if (!newsletterUrl) return;
    if (localStorage.getItem(DISMISSED_KEY) || localStorage.getItem(SUBSCRIBED_KEY)) return;

    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? scrollTop / docHeight : 0;

    if (scrollPercent >= 0.4) {
      setVisible(true);
    }
  }, [dismissed, newsletterUrl]);

  useEffect(() => {
    if (!newsletterUrl) return;
    // Don't show if already dismissed or subscribed this session
    if (localStorage.getItem(DISMISSED_KEY) || localStorage.getItem(SUBSCRIBED_KEY)) return;

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const handleDismiss = () => {
    setVisible(false);
    setDismissed(true);
    // Remember dismissal for this session only (sessionStorage) — will show again next visit
    sessionStorage.setItem(DISMISSED_KEY, "true");
  };

  if (!visible || !newsletterUrl) return null;

  return (
    <div className="newsletter-popup-overlay" role="dialog" aria-modal="true" aria-label="Subscribe to newsletter">
      <div className="newsletter-popup">
        {/* Close button */}
        <button
          className="newsletter-popup-close"
          onClick={handleDismiss}
          aria-label="Close newsletter popup"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="newsletter-popup-icon">
          <Mail className="w-5 h-5" />
        </div>
        <h3 className="newsletter-popup-title">Stay in the loop</h3>
        <p className="newsletter-popup-body">
          Get new articles from DeCodes Life delivered straight to your inbox.
        </p>

        <Button asChild className="newsletter-popup-btn">
          <a href={newsletterUrl} target="_blank" rel="noopener noreferrer">
            Subscribe — it's free
          </a>
        </Button>

        <button className="newsletter-popup-skip" onClick={handleDismiss}>
          No thanks
        </button>
      </div>
    </div>
  );
}
