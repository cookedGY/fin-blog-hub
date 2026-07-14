import { Mail, Linkedin, Twitter } from "lucide-react";

export default function AuthorBio() {
  return (
    <div className="author-bio">
      <div className="author-bio-container">
        <div className="author-bio-avatar">
          <div className="avatar-placeholder">De</div>
        </div>
        <div className="author-bio-content">
          <h3 className="author-bio-name">Dekena Wade</h3>
          <p className="author-bio-title">Finance Student & Business Builder</p>
          <p className="author-bio-description">
            Brooklyn-based, Guyanese-rooted finance major exploring AI, business strategy, and personal growth. 
            I write about internships, family businesses, grief, and the messy reality of building a career while figuring out life.
          </p>
          <div className="author-bio-links">
            <a 
              href="https://www.linkedin.com/in/dekenawade" 
              target="_blank" 
              rel="noopener noreferrer"
              className="author-bio-link"
              title="Connect on LinkedIn"
            >
              <Linkedin size={18} />
              <span>LinkedIn</span>
            </a>
            <a 
              href="https://twitter.com/dekenawade" 
              target="_blank" 
              rel="noopener noreferrer"
              className="author-bio-link"
              title="Follow on Twitter"
            >
              <Twitter size={18} />
              <span>Twitter</span>
            </a>
            <a 
              href="mailto:dekena.wade@gmail.com"
              className="author-bio-link"
              title="Send an email"
            >
              <Mail size={18} />
              <span>Email</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
