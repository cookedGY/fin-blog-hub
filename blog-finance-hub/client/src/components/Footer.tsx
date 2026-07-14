import { useState } from "react";
import { Link } from "wouter";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    
    // Simulate API call
    setTimeout(() => {
      setStatus("success");
      setEmail("");
    }, 1000);
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand & Copyright */}
          <div className="footer-brand">
            <Link href="/" className="logo mb-4 inline-block">
              <span className="logo-main text-xl">DeCodes Life</span>
              <span className="logo-sub text-xs">by Dekena Wade</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs mb-4">
              Decoding life one spreadsheet, passport stamp, and plot twist at a time.
            </p>
            <div className="footer-copyright text-xs text-muted-foreground">
              <p>© <span id="year">{new Date().getFullYear()}</span> DeCodes Life</p>
              <p className="mt-1">Built with love, bubble tea, and Google Sheets.</p>
              <p className="mt-1 opacity-70">All opinions are my own.</p>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="footer-newsletter">
            <h3 className="font-serif text-lg font-semibold mb-2">Join the inner circle</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Get the latest on finance, travel, and navigating your 20s straight to your inbox. No spam, just vibes.
            </p>
            
            {status === "success" ? (
              <div className="bg-green-50 text-green-800 p-4 rounded-xl border border-green-100 text-sm">
                ✨ You're in! Thanks for subscribing.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 px-4 py-2 rounded-full border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={status === "loading"}
                />
                <button 
                  type="submit" 
                  className="btn btn-primary whitespace-nowrap"
                  disabled={status === "loading"}
                >
                  {status === "loading" ? "Joining..." : "Subscribe"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
