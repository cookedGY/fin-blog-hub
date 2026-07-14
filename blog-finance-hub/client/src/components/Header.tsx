import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { Search, X } from "lucide-react";
import { POSTS } from "@/data/posts";

export default function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<typeof POSTS[string][]>([]);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [location] = useLocation();

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
    if (isSearchOpen) setIsSearchOpen(false);
  };

  const closeNav = () => {
    setIsNavOpen(false);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
      setIsNavOpen(false);
    } else {
      setSearchQuery("");
    }
  };

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults([]);
      return;
    }

    const query = searchQuery.toLowerCase();
    const results = Object.values(POSTS).filter(post => 
      post.title.toLowerCase().includes(query) || 
      post.tag.toLowerCase().includes(query) ||
      (post.description && post.description.toLowerCase().includes(query))
    );
    setSearchResults(results);
  }, [searchQuery]);

  // Close search when location changes
  useEffect(() => {
    setIsSearchOpen(false);
    setSearchQuery("");
  }, [location]);

  return (
    <header className="nav">
      <div className="nav-inner container relative">
        <Link href="/" className="logo" onClick={closeNav}>
          <span className="logo-main">DeCodes Life</span>
          <span className="logo-sub">by Dekena Wade</span>
        </Link>

        <div className="flex items-center gap-4">
          {/* Desktop Search Trigger */}
          <button 
            onClick={toggleSearch}
            className="hidden md:flex items-center justify-center p-2 text-muted-foreground hover:text-primary transition-colors"
            aria-label="Search"
          >
            <Search size={20} />
          </button>

          <button 
            className="nav-toggle" 
            id="navToggle" 
            aria-label="Toggle navigation"
            onClick={toggleNav}
          >
            <span></span><span></span>
          </button>
        </div>

        <nav className={`nav-links ${isNavOpen ? 'nav-open' : ''}`} id="navLinks">
          <a href="/#finance" onClick={closeNav}>Finance Grind</a>
          <a href="/#global" onClick={closeNav}>Global De</a>
          <a href="/#business" onClick={closeNav}>Business Builder</a>
          <Link href="/portfolio" onClick={closeNav}>Portfolio</Link>
          <Link href="/speaking" onClick={closeNav}>Speaking</Link>
          <Link href="/contact" onClick={closeNav}>Contact</Link>
          <a href="/#life" onClick={closeNav}>Life & Growth</a>
          <a href="/#fun" onClick={closeNav}>Fun Stuff</a>
          <a href="/#about" onClick={closeNav}>About</a>
          
          {/* Mobile Search Trigger inside menu */}
          <button 
            onClick={() => {
              closeNav();
              toggleSearch();
            }}
            className="md:hidden flex items-center gap-2 text-muted-foreground hover:text-primary mt-4 w-full"
          >
            <Search size={18} /> Search
          </button>
        </nav>

        {/* Search Overlay */}
        {isSearchOpen && (
          <div className="absolute top-full left-0 right-0 bg-white border-b border-border shadow-lg p-4 animate-in slide-in-from-top-2 z-50">
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search posts, projects, topics..."
                className="w-full pl-10 pr-10 py-2 border border-border rounded-full focus:outline-none focus:ring-2 focus:ring-primary/20"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button 
                onClick={toggleSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary"
              >
                <X size={18} />
              </button>
            </div>

            {/* Search Results */}
            {searchQuery && (
              <div className="max-w-2xl mx-auto mt-4 max-h-[60vh] overflow-y-auto">
                {searchResults.length > 0 ? (
                  <div className="grid gap-2">
                    {searchResults.map((post) => (
                      <Link key={post.slug} href={`/post/${post.slug}`} className="block p-3 hover:bg-muted rounded-lg transition-colors group">
                        <div className="text-xs font-medium text-primary uppercase tracking-wider mb-1">{post.tag}</div>
                        <div className="font-serif font-semibold text-lg group-hover:text-primary transition-colors">{post.title}</div>
                        {post.description && <div className="text-sm text-muted-foreground line-clamp-1">{post.description}</div>}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    No results found for "{searchQuery}"
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
