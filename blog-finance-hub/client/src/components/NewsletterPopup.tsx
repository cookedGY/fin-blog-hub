import React, { useState, useEffect, useCallback } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, X, Check, AlertCircle } from "lucide-react";

interface NewsletterPopupProps {
  postSlug?: string;
}

const DISMISSED_KEY = "newsletter_popup_dismissed";
const SUBSCRIBED_KEY = "newsletter_subscribed";

export default function NewsletterPopup({ postSlug }: NewsletterPopupProps) {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const subscribeMutation = trpc.newsletter.subscribe.useMutation({
    onSuccess: () => {
      setStatus("success");
      setMessage("You're in! New articles will land in your inbox.");
      localStorage.setItem(SUBSCRIBED_KEY, "true");
      setTimeout(() => {
        setVisible(false);
      }, 3000);
    },
    onError: (error: any) => {
      if (error.message?.includes("already subscribed")) {
        setStatus("success");
        setMessage("You're already subscribed — you're all set!");
        localStorage.setItem(SUBSCRIBED_KEY, "true");
        setTimeout(() => setVisible(false), 3000);
      } else {
        setStatus("error");
        setMessage(error.message || "Something went wrong. Please try again.");
        setTimeout(() => setStatus("idle"), 4000);
      }
    },
  });

  const handleScroll = useCallback(() => {
    if (dismissed) return;
    if (localStorage.getItem(DISMISSED_KEY) || localStorage.getItem(SUBSCRIBED_KEY)) return;

    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? scrollTop / docHeight : 0;

    if (scrollPercent >= 0.4) {
      setVisible(true);
    }
  }, [dismissed]);

  useEffect(() => {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");
    subscribeMutation.mutate({
      email: email.trim(),
      subscriptionSource: "article-popup",
      postSlug,
    });
  };

  if (!visible) return null;

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

        {status === "success" ? (
          <div className="newsletter-popup-success">
            <div className="newsletter-popup-success-icon">
              <Check className="w-6 h-6" />
            </div>
            <h3>You're subscribed!</h3>
            <p>{message}</p>
          </div>
        ) : (
          <>
            <div className="newsletter-popup-icon">
              <Mail className="w-5 h-5" />
            </div>
            <h3 className="newsletter-popup-title">Stay in the loop</h3>
            <p className="newsletter-popup-body">
              Get new articles from DeCodes Life delivered straight to your inbox — finance, business, and real life.
            </p>

            <form onSubmit={handleSubmit} className="newsletter-popup-form">
              <Input
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === "loading"}
                required
                className="newsletter-popup-input"
                autoFocus
              />

              {status === "error" && (
                <div className="newsletter-popup-error">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{message}</span>
                </div>
              )}

              <Button
                type="submit"
                disabled={status === "loading"}
                className="newsletter-popup-btn"
              >
                {status === "loading" ? "Subscribing..." : "Subscribe — it's free"}
              </Button>
            </form>

            <button className="newsletter-popup-skip" onClick={handleDismiss}>
              No thanks
            </button>
          </>
        )}
      </div>
    </div>
  );
}
