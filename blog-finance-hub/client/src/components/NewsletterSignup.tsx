import React, { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Check, AlertCircle } from "lucide-react";

interface NewsletterSignupProps {
  source?: string;
  postSlug?: string;
  className?: string;
}

export default function NewsletterSignup({
  source = "blog-post",
  postSlug,
  className = "",
}: NewsletterSignupProps) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const subscribeMutation = trpc.newsletter.subscribe.useMutation({
    onSuccess: () => {
      setStatus("success");
      setMessage("Welcome! Check your email for confirmation.");
      setEmail("");
      setName("");
      setTimeout(() => setStatus("idle"), 5000);
    },
    onError: (error: any) => {
      setStatus("error");
      setMessage(error.message || "Something went wrong. Please try again.");
      setTimeout(() => setStatus("idle"), 5000);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setStatus("error");
      setMessage("Please enter your email address.");
      return;
    }
    subscribeMutation.mutate({
      email,
      name: name || undefined,
      subscriptionSource: source,
      postSlug,
    });
  };

  return (
    <div className={`newsletter-signup ${className}`}>
      <div className="newsletter-signup-content">
        <div className="newsletter-signup-header">
          <Mail className="w-6 h-6 text-primary" />
          <h3>Get New Posts in Your Inbox</h3>
        </div>
        <p className="newsletter-signup-description">
          Subscribe to receive updates whenever I publish new articles about finance, business, and personal growth.
        </p>

        <form onSubmit={handleSubmit} className="newsletter-signup-form">
          <div className="form-group">
            <Input
              type="text"
              placeholder="Your name (optional)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={status === "loading"}
              className="input-field"
            />
          </div>
          <div className="form-group">
            <Input
              type="email"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === "loading"}
              required
              className="input-field"
            />
          </div>

          {status === "success" && (
            <div className="status-message success">
              <Check className="w-5 h-5" />
              <span>{message}</span>
            </div>
          )}

          {status === "error" && (
            <div className="status-message error">
              <AlertCircle className="w-5 h-5" />
              <span>{message}</span>
            </div>
          )}

          <Button
            type="submit"
            disabled={status === "loading" || status === "success"}
            className="subscribe-button"
          >
            {status === "loading" ? "Subscribing..." : "Subscribe"}
          </Button>
        </form>

        <p className="newsletter-privacy">
          No spam, unsubscribe anytime. Your email is safe with me.
        </p>
      </div>
    </div>
  );
}
