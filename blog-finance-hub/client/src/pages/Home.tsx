import { Link, useLocation } from "wouter";
import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Globe } from "lucide-react";
import { useAuth } from "@/_core/hooks/useAuth";
import NewsletterSignup from "@/components/NewsletterSignup";
import FlowerAnimation from "@/components/FlowerAnimation";
import { POSTS } from "@/data/posts";

export default function Home() {
  // The userAuth hooks provides authentication state
  // To implement login/logout functionality, simply call logout() or redirect to getLoginUrl()
  const { user, loading, error, isAuthenticated, logout } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, [location]);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-background z-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Globe className="w-12 h-12 text-primary animate-spin-slow" />
          <p className="text-sm font-serif tracking-widest text-muted-foreground">DECODING...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col animate-in fade-in duration-500">
      <Helmet>
        <title>FinBlogHub | Dekena Wade: Finance, AI & Guyanese Heritage</title>
        <meta name="description" content="Dekena Wade's finance blog exploring AI, business strategy, and Guyanese heritage. Finance student insights on internships, global travel, and building purpose-driven careers for young professionals." />
        <meta name="keywords" content="finance blog, AI finance, Guyanese heritage, finance student, career advice, business strategy, study abroad, Mandarin learning, immigrant stories, personal growth" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://finbloghub.manus.space/" />
        <meta property="og:title" content="FinBlogHub | Dekena Wade: Finance, AI & Guyanese Heritage" />
        <meta property="og:description" content="Dekena Wade's finance blog exploring AI, business strategy, and Guyanese heritage. Finance student insights on internships, global travel, and building purpose-driven careers for young professionals." />
        <meta property="og:image" content="https://files.manuscdn.com/user_upload_by_module/session_file/310519663195299521/gbPCcanLrCwSoRTK.png" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://decodeslife.com/" />
        <meta property="twitter:title" content="DeCodes Life | Finance, Travel & Culture by Dekena Wade" />
        <meta property="twitter:description" content="DeCodes Life by Dekena Wade — a finance lifestyle blog exploring internships, global travel, Mandarin learning, study abroad journeys, immigrant family stories, and personal growth. For students and young professionals building their future with purpose." />
        <meta property="twitter:image" content="https://files.manuscdn.com/user_upload_by_module/session_file/310519663195299521/gbPCcanLrCwSoRTK.png" />
      </Helmet>
      <Header />

      {/* HERO SECTION */}
      <div style={{ position: "relative", overflow: "hidden" }}>
        <FlowerAnimation />
        <section className="hero" style={{ position: "relative", zIndex: 2 }}>
        <div className="hero-inner container">
          <div className="hero-text">
            <p className="hero-tag">Finance • Culture • Travel • Real Life</p>
            <h1>Finance Blog by Dekena Wade: AI, Business Strategy & Guyanese Heritage</h1>
            <p className="hero-subtitle">Hi, I'm De — decoding life one spreadsheet and passport stamp at a time.</p>
            <p className="hero-sub">
              Brooklyn-based, Guyanese-rooted, finance major juggling DCF models, Mandarin,
              family business, grief, and growth. This is my corner of the internet to track it all.
            </p>
            <div className="hero-actions">
              <a href="#latest" className="btn btn-primary">Read the latest</a>
              <a href="#about" className="btn btn-ghost">Who’s De?</a>
            </div>
          </div>
          <div className="hero-card">
            <div className="hero-pill">Currently</div>
            <ul>
              <li>🎓 Finance degree: done. Now plotting my master's path</li>
              <li>🌏 Next global move: China</li>
              <li>📊 Building family + side businesses</li>
              <li>🧠 Balancing ambition, growth & what's next</li>
            </ul>
          </div>
        </div>
        </section>
      </div>

      {/* LATEST POSTS SECTION */}
      <section className="section section-alt" id="latest">
        <div className="container">
          <div className="section-header">
            <h2>Latest on the blog</h2>
            <p>Fresh from the “my life is a case study” files.</p>
          </div>

          <div className="grid grid-3">
            {Object.values(POSTS)
              .sort((a, b) => {
                const dateA = new Date(a.date).getTime();
                const dateB = new Date(b.date).getTime();
                return dateB - dateA;
              })
              .slice(0, 3)
              .map((post) => (
                <article key={post.slug} className="card">
                  <div className="card-pill">{post.tag}</div>
                  <h3>{post.title}</h3>
                  <p>{post.description}</p>
                  <Link href={`/post/${post.slug}`} className="card-link">
                    Read more →
                  </Link>
                </article>
              ))}
          </div>
        </div>
      </section>

      {/* FEATURED CASE STUDIES SECTION */}
      <section className="section" id="featured-projects">
        <div className="container">
          <div className="section-header">
            <h2>Featured Case Studies</h2>
            <p>Deep dives into real-world financial and business analysis.</p>
          </div>

          <div className="grid grid-2">
            {/* Nokia Case Study */}
            <a href="https://nokia-casestudy.manus.space/" target="_blank" rel="noopener noreferrer" className="card hover:shadow-lg transition-shadow">
              <div className="card-pill">Case Study</div>
              <div className="text-3xl mb-3">📱</div>
              <h3>Nokia Case Study</h3>
              <p>
                A comprehensive analysis of Nokia's financial performance, market positioning, and strategic decisions in the mobile industry.
              </p>
              <div className="card-link">View Case Study →</div>
            </a>

            {/* IOMEGA Case Study */}
            <a href="https://iomegafin-usztjjag.manus.space/" target="_blank" rel="noopener noreferrer" className="card hover:shadow-lg transition-shadow">
              <div className="card-pill">Case Study</div>
              <div className="text-3xl mb-3">💾</div>
              <h3>IOMEGA Case Study</h3>
              <p>
                An in-depth examination of IOMEGA's business strategy, financial metrics, and competitive positioning in the storage technology market.
              </p>
              <div className="card-link">View Case Study →</div>
            </a>
          </div>
        </div>
      </section>

      {/* CHECK OUT MY PROJECTS SECTION */}
      <section className="section section-alt" id="projects">
        <div className="container">
          <div className="section-header">
            <h2>Check Out My Projects</h2>
            <p>Applied AI tools, financial models, and case studies — built to solve real problems.</p>
          </div>

          <div className="grid grid-3">
            <article className="card">
              <div className="card-pill">AI/LLM</div>
              <div className="text-3xl mb-3">🔍</div>
              <h3>RAG Assistant</h3>
              <p>Query corporate financial reports (Iomega, Nokia, American Greetings) using Retrieval-Augmented Generation and semantic search.</p>
              <Link href="/projects/rag" className="card-link">Explore →</Link>
            </article>

            <article className="card">
              <div className="card-pill">AI Governance</div>
              <div className="text-3xl mb-3">🛡️</div>
              <h3>AI Risk & Hallucination Tracker</h3>
              <p>Real-time monitoring system for detecting AI model risks, hallucinations, biases, and safety violations with incident management.</p>
              <Link href="/projects/risk-tracker" className="card-link">Explore →</Link>
            </article>

            <article className="card">
              <div className="card-pill">Observability</div>
              <div className="text-3xl mb-3">📊</div>
              <h3>AI Workflow Observability</h3>
              <p>Monitor AI workflow execution in real time — step-level metrics, latency tracking, and cost analysis across model pipelines.</p>
              <Link href="/projects/workflow-observability" className="card-link">Explore →</Link>
            </article>

            <article className="card">
              <div className="card-pill">Data Analysis</div>
              <div className="text-3xl mb-3">📉</div>
              <h3>Financial Anomaly Detection</h3>
              <p>Detect financial distress signals using machine learning on SEC 10-K filings — Iomega, Nokia, and American Greetings case studies.</p>
              <Link href="/projects/anomaly" className="card-link">Explore →</Link>
            </article>

            <article className="card">
              <div className="card-pill">AI Evaluation</div>
              <div className="text-3xl mb-3">🧪</div>
              <h3>LLM Evaluation Dashboard</h3>
              <p>Score AI responses for accuracy, hallucination risk, and reasoning quality across finance Q&A tasks. Built for applied AI evaluation.</p>
              <Link href="/projects/llm-evaluation" className="card-link">Explore →</Link>
            </article>

            <article className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', background: 'var(--accent)', border: '2px dashed var(--primary)' }}>
              <div className="text-3xl mb-3">📁</div>
              <h3>View All Projects</h3>
              <p>Explore the full portfolio — case studies, business plans, financial models, and more.</p>
              <Link href="/portfolio" className="card-link">Go to Portfolio →</Link>
            </article>
          </div>
        </div>
      </section>

      {/* CATEGORY SECTIONS */}
      {/* Finance Grind */}
      <section className="section" id="finance">
        <div className="container section-split">
          <div className="section-text">
            <h2>Finance Grind</h2>
            <p>
              Real finance internship tips and lessons from a young finance student building a career. 
              Practical advice for college interns and early-career professionals.
            </p>
            <ul className="tag-list">
              <li>Investments & markets</li>
              <li>Internship breakdowns</li>
              <li>Study hacks & cheat sheets</li>
              <li>Career prep & recruiting</li>
            </ul>
          </div>
          <div className="section-cards">
            {Object.values(POSTS)
              .filter(p => p.tag === "Finance Grind")
              .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
              .map(post => (
                <article key={post.slug} className="mini-card">
                  <h3>{post.title}</h3>
                  <p>{post.description}</p>
                  <Link href={`/post/${post.slug}`} className="mini-link">Read →</Link>
                </article>
              ))}
          </div>
        </div>
      </section>

      {/* Global De */}
      <section className="section section-alt" id="global">
        <div className="container section-split">
          <div className="section-text">
            <h2>Global De</h2>
            <p>
              Guyanese roots, Brooklyn hustle, Ghana lessons, and a growing love for Chinese language
              and culture. This is where my passport and my major collide.
            </p>
            <ul className="tag-list">
              <li>Study abroad reflections</li>
              <li>Language learning (Mandarin)</li>
              <li>Culture, food & identity</li>
            </ul>
          </div>
          <div className="section-cards">
            {Object.values(POSTS)
              .filter(p => p.tag === "Global De")
              .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
              .map(post => (
                <article key={post.slug} className="mini-card">
                  <h3>{post.title}</h3>
                  <p>{post.description}</p>
                  <Link href={`/post/${post.slug}`} className="mini-link">Read →</Link>
                </article>
              ))}
          </div>
        </div>
      </section>

      {/* Business Builder */}
      <section className="section" id="business">
        <div className="container section-split">
          <div className="section-text">
            <h2>Business Builder</h2>
            <p>
              Family trucking, travel concepts, gym ideas, invoices, brand kits — the behind-the-scenes of
              projects I’m building while still finishing undergrad.
            </p>
            <ul className="tag-list">
              <li>Family business strategy</li>
              <li>Branding & systems</li>
              <li>Side project blueprints</li>
            </ul>
          </div>
          <div className="section-cards">
            {Object.values(POSTS)
              .filter(p => p.tag === "Business Builder")
              .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
              .map(post => (
                <article key={post.slug} className="mini-card">
                  <h3>{post.title}</h3>
                  <p>{post.description}</p>
                  <Link href={`/post/${post.slug}`} className="mini-link">Read →</Link>
                </article>
              ))}
            {Object.values(POSTS).filter(p => p.tag === "Business Builder").length === 0 && (
              <p className="text-muted-foreground text-sm">Coming soon — posts in progress.</p>
            )}
          </div>
        </div>
      </section>

      {/* Life & Growth */}
      <section className="section section-alt" id="life">
        <div className="container section-split">
          <div className="section-text">
            <h2>Life & Growth</h2>
            <p>
              Grief, family, adulthood, and the pressure of being “the responsible one.”
              The unfiltered side of the story behind the resumes and LinkedIn posts.
            </p>
            <ul className="tag-list">
              <li>Grief & healing</li>
              <li>Mental health & boundaries</li>
              <li>Growing up in real time</li>
            </ul>
          </div>
          <div className="section-cards">
            {Object.values(POSTS)
              .filter(p => p.tag === "Life & Growth")
              .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
              .map(post => (
                <article key={post.slug} className="mini-card">
                  <h3>{post.title}</h3>
                  <p>{post.description}</p>
                  <Link href={`/post/${post.slug}`} className="mini-link">Read →</Link>
                </article>
              ))}
            {Object.values(POSTS).filter(p => p.tag === "Life & Growth").length === 0 && (
              <p className="text-muted-foreground text-sm">Coming soon — posts in progress.</p>
            )}
          </div>
        </div>
      </section>

      {/* Fun Stuff */}
      <section className="section" id="fun">
        <div className="container section-split">
          <div className="section-text">
            <h2>Fun Stuff</h2>
            <p>
              C-dramas, room makeovers, karaoke nights, food runs, and the little joys that keep me from combusting.
            </p>
            <ul className="tag-list">
              <li>C-dramas & recs</li>
              <li>NYC eats & bubble tea</li>
              <li>Room & aesthetic projects</li>
            </ul>
          </div>
          <div className="section-cards">
            {Object.values(POSTS)
              .filter(p => p.tag === "Fun Stuff")
              .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
              .map(post => (
                <article key={post.slug} className="mini-card">
                  <h3>{post.title}</h3>
                  <p>{post.description}</p>
                  <Link href={`/post/${post.slug}`} className="mini-link">Read →</Link>
                </article>
              ))}
            {Object.values(POSTS).filter(p => p.tag === "Fun Stuff").length === 0 && (
              <p className="text-muted-foreground text-sm">Coming soon — posts in progress.</p>
            )}
          </div>
        </div>
      </section>

      {/* LATEST UPDATES SECTION */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-header">
            <h2>Latest Updates</h2>
            <p>Recent blog posts, presentations, and speaking engagements</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Recent Blog Post */}
            <Link href="/post/training-models-waiting-for-job" className="block">
              <div className="p-6 rounded-lg border border-border hover:border-primary hover:shadow-md transition-all duration-300 bg-muted/30 h-full cursor-pointer">
                <div className="text-3xl mb-3">🤖</div>
                <h3 className="font-serif font-bold text-lg text-foreground mb-2">Training the Models, Still Waiting for the Job</h3>
                <p className="text-sm text-muted-foreground mb-4">The strange reality of entry-level AI work — and what it means for the next generation of finance professionals.</p>
                <p className="text-xs font-medium text-primary">Finance Grind • June 2026</p>
              </div>
            </Link>

            {/* Recent Presentation */}
            <a href="https://nvdapresen-cehp3wfn.manus.space" target="_blank" rel="noopener noreferrer" className="block">
              <div className="p-6 rounded-lg border border-border hover:border-primary hover:shadow-md transition-all duration-300 bg-muted/30 h-full cursor-pointer">
                <div className="text-3xl mb-3">🎯</div>
                <h3 className="font-serif font-bold text-lg text-foreground mb-2">NVDA Investor Presentation</h3>
                <p className="text-sm text-muted-foreground mb-4">Professional presentation on market insights and strategic analysis for NVIDIA investor relations.</p>
                <p className="text-xs font-medium text-primary">Speaking • April 2026</p>
              </div>
            </a>

            {/* Speaking Page CTA */}
            <Link href="/speaking" className="block">
              <div className="p-6 rounded-lg border border-border hover:border-primary hover:shadow-md transition-all duration-300 bg-gradient-to-br from-primary/10 to-accent/10 h-full cursor-pointer flex flex-col justify-between">
                <div>
                  <div className="text-3xl mb-3">🎤</div>
                  <h3 className="font-serif font-bold text-lg text-foreground mb-2">Speaking & Media</h3>
                  <p className="text-sm text-muted-foreground mb-4">Explore all presentations, podcast appearances, and speaking engagements.</p>
                </div>
                <p className="text-xs font-medium text-primary">View All →</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* NEWSLETTER SECTION */}
      <section className="section">
        <div className="container">
          <NewsletterSignup source="homepage" />
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="section section-alt" id="about">
        <div className="container about-grid">
          <div className="about-text">
            <h2 className="about-title">About Me: Finance, AI & Guyanese Heritage</h2>
            <p className="about-intro">
              I'm Dekena — a Brooklyn-based, Guyanese-rooted finance graduate decoding life in real time.
            </p>
            <p className="about-body">
              I've worked across wealth management, insurance, tax, and analytics. I've studied in Ghana, visited Taiwan, and I'm leveling up my Mandarin as I plan my next move to China. Asia is calling — and I'm answering. I'm also helping build my family's businesses and figuring out my master's degree path.
            </p>
            <p className="about-body">
              This blog is my portfolio, journal, and receipts all in one place — for the grind, the growth, and the chaos in between.
            </p>
          </div>
          <div className="about-card">
            <h3>Quick stats</h3>
            <ul>
              <li>🎓 Finance graduate, class of 2026 — master's path next</li>
              <li>🌍 Guyanese-American, Brooklyn-based, Asia-bound</li>
              <li>📈 Internships: Aon, EY, JPMorgan, Beats & more</li>
              <li>🧾 Family biz consultant by default</li>
            </ul>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
