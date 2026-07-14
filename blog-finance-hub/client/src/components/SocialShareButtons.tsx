import { Twitter, Linkedin, Mail } from 'lucide-react';

interface SocialShareButtonsProps {
  title: string;
  url: string;
  description?: string;
}

export default function SocialShareButtons({
  title,
  url,
  description = '',
}: SocialShareButtonsProps) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description);

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}&via=dekodeslife`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0A${encodedUrl}`,
  };

  return (
    <div className="social-share-buttons">
      <p className="social-share-label">Share this post</p>
      <div className="social-share-container">
        <a
          href={shareLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="social-share-btn social-share-twitter"
          title="Share on Twitter"
          aria-label="Share on Twitter"
        >
          <Twitter size={18} />
          <span>Twitter</span>
        </a>

        <a
          href={shareLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="social-share-btn social-share-linkedin"
          title="Share on LinkedIn"
          aria-label="Share on LinkedIn"
        >
          <Linkedin size={18} />
          <span>LinkedIn</span>
        </a>

        <a
          href={shareLinks.email}
          className="social-share-btn social-share-email"
          title="Share via Email"
          aria-label="Share via Email"
        >
          <Mail size={18} />
          <span>Email</span>
        </a>
      </div>
    </div>
  );
}
