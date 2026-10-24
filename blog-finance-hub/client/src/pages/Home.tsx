import { categoryLabel } from "@/lib/categoryLabel";
import { Link } from "wouter";
import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Code2, Database, GitBranch, type LucideIcon } from "lucide-react";
import NewsletterSignup from "@/components/NewsletterSignup";
import { POSTS } from "@/data/posts";

const learningPostPath = "/post/taking-reins-cloned-website-harvard-python";

const learningSkills: Array<{
  name: string;
  focus: string;
  Icon: LucideIcon;
}> = [
  {
    name: "Python",
    focus: "Harvard coursework, clear logic, and practical automation",
    Icon: Code2,
  },
  {
    name: "Git",
    focus: "Version control, commits, pull/push flow, and repo hygiene",
    Icon: GitBranch,
  },
  {
    name: "Databases",
    focus: "Schemas for posts, images, metadata, and portfolio records",
    Icon: Database,
  },
  {
    name: "React & TypeScript",
    focus: "Understanding the components that power this site",
    Icon: Code2,
  },
];

export default function Home() {
  const sortedPosts = Object.values(POSTS).sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateB - dateA;
  });
  const financialPosts = sortedPosts.filter((post) => post.tag === "De's Financial Takes");
  const lifePosts = sortedPosts.filter((post) => post.tag === "Life & Growth");
  const spotlightPosts = [
    "career-path-not-linear-never-random",
    "reading-crosscurrents-ai-oil-inflation-q4-2026",
    "from-tumblr-html-to-financial-technology",
  ]
    .map((slug) => POSTS[slug])
    .filter(Boolean);

  return (
    <div className="min-h-screen flex flex-col animate-in fade-in duration-500">
      <Helmet>
        <title>DeCodes Life | Risk, Technology & Everyday Observations</title>
        <meta name="description" content="DeCodes Life is Dekena Wade's ideas portfolio: observations on risk, business, technology, culture, and the skills she is building along the way." />
        <meta name="keywords" content="DeCodes Life, Dekena Wade, Dcodes, observations, applied AI, audit, risk analysis, AI implementation, career reflections, business strategy, Mandarin learning, Guyanese heritage" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://finbloghub.space/" />
        <meta property="og:title" content="DeCodes Life | Risk, Technology & Everyday Observations" />
        <meta property="og:description" content="Observations on business, technology, risk, culture, and the systems Dekena Wade is learning to understand and build." />
        <meta property="og:image" content="https://files.manuscdn.com/user_upload_by_module/session_file/310519663195299521/gbPCcanLrCwSoRTK.png" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://decodeslife.com/" />
        <meta property="twitter:title" content="DeCodes Life | Risk, Technology & Everyday Observations" />
        <meta property="twitter:description" content="DeCodes Life by Dekena Wade: risk analysis, applied AI, audit-minded analysis, career growth, travel, business strategy, and learning in public." />
        <meta property="twitter:image" content="https://files.manuscdn.com/user_upload_by_module/session_file/310519663195299521/gbPCcanLrCwSoRTK.png" />
      </Helmet>
      <Header />

      {/* HERO SECTION */}
      <div className="home-hero-stage">
        <section className="hero">
        <div className="hero-inner container">
          <div className="hero-text">
            <p className="hero-tag">Risk • Technology • Business • Culture • Curiosity</p>
            <h1>Making sense of risk, systems, and everyday life.</h1>
            <p className="hero-subtitle">Hi, I'm De — asking questions, connecting ideas, and sharing what I notice.</p>
            <p className="hero-sub">
              Brooklyn-based and Guyanese-rooted, I’m interested in how people and organizations
              identify risk and make decisions across business, finance, cybersecurity, and IT.
              Here, I connect that curiosity with culture, personal growth, and the technical skills I’m building.
            </p>
            <div className="hero-actions">
              <a href="#latest" className="btn btn-primary">Read the latest</a>
              <a href="#about" className="btn btn-ghost">Who’s De?</a>
            </div>
          </div>
          <div className="hero-card">
            <div className="hero-pill">Currently</div>
            <ul>
              <li>🎓 Building on my finance degree with a wider view of risk</li>
              <li>🎬 The world of C-Drama: stories, culture, and new perspectives</li>
              <li>🤖 Studying AI implementation, data, and automation</li>
              <li>🧩 Exploring how business decisions and technology shape risk</li>
            </ul>
          </div>
        </div>
        </section>
      </div>

      {/* LEARNING PROGRESS SECTION */}
      <section className="section learning-section" id="learning">
        <div className="container learning-grid">
          <div className="learning-copy">
            <p className="learning-kicker">Currently Learning</p>
            <h2>Building the skills behind the questions.</h2>
            <p>
              I am tracking the skills I am learning in public: the code, systems,
              and data foundations that help me move from using AI tools to
              understanding how my portfolio actually works.
            </p>
            <Link href={learningPostPath} className="btn btn-ghost learning-cta">
              Why I am learning these skills
            </Link>
          </div>

          <div className="learning-panel" aria-label="Skills learning progress">
            <div className="learning-panel-header">
              <span>Skill Stack</span>
              <Link href={learningPostPath}>Read why →</Link>
            </div>
            <div className="learning-skill-grid">
              {learningSkills.map(({ name, focus, Icon }) => (
                <Link key={name} href={learningPostPath} className="learning-row">
                  <div className="learning-skill-title">
                    <span className="learning-icon" aria-hidden="true">
                      <Icon size={16} strokeWidth={1.8} />
                    </span>
                    <span>{name}</span>
                  </div>
                  <p>{focus}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* LATEST POSTS SECTION */}
      <section className="section section-alt" id="latest">
        <div className="container">
          <div className="section-header">
            <h2>Latest on the blog</h2>
            <p>Fresh from the “my life is a case study” files.</p>
          </div>

          <div className="grid grid-3">
            {sortedPosts
              .slice(0, 3)
              .map((post) => (
                <article key={post.slug} className="card">
                  <div className="card-pill">{categoryLabel(post.tag)}</div>
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
              <p>Explore the full portfolio: case studies, applied AI tools, financial models, and strategy work.</p>
              <Link href="/portfolio" className="card-link">Go to About Me & Portfolio →</Link>
            </article>
          </div>
        </div>
      </section>

      {/* CATEGORY SECTIONS */}
      {/* De's Financial Takes */}
      <section className="section" id="finance">
        <div className="container section-split finance-showcase">
          <div className="section-text">
            <h2>De's Takes</h2>
            <p>
              My observations on what’s happening in the world: business decisions, technology,
              markets, risk, and the questions that stay with me. A place to follow an idea across subjects.
            </p>
            <ul className="tag-list">
              <li>Risk & emerging signals</li>
              <li>Business & technology</li>
              <li>Systems & institutions</li>
              <li>Work & changing perspectives</li>
            </ul>
          </div>
          <div className="section-cards finance-article-grid">
            {financialPosts
              .slice(0, 4)
              .map(post => (
                <Link key={post.slug} href={`/post/${post.slug}`} className="finance-expand-card">
                  <article>
                    <span className="finance-card-date">{post.date}</span>
                    <h3>{post.title}</h3>
                    <div className="finance-card-reveal">
                      <p>{post.description}</p>
                      <span className="mini-link">Read article →</span>
                    </div>
                  </article>
                </Link>
              ))}
            {financialPosts.length > 4 && (
              <Link href="/files" className="finance-expand-card finance-archive-card">
                <article>
                  <span className="finance-card-date">Archive</span>
                  <h3>Browse the full finance writing library</h3>
                  <div className="finance-card-reveal">
                    <p>See the rest of the markets, AI, insurance, inflation, and finance systems essays in one organized place.</p>
                    <span className="mini-link">Open archive →</span>
                  </div>
                </article>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Global De */}
      <section className="section section-alt" id="global">
        <div className="container section-split">
          <div className="section-text">
            <h2>Global De</h2>
            <p>
              Guyanese roots, Brooklyn life, Ghana lessons, C-drama discoveries, and a growing love
              for Mandarin and global systems. This is where my passport, curiosity, and career collide.
            </p>
            <ul className="tag-list">
              <li>Study abroad reflections</li>
              <li>Language learning (Mandarin)</li>
              <li>Culture, food & identity</li>
            </ul>
          </div>
          <div className="section-cards category-article-stack">
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
          <div className="section-cards category-article-stack">
            {lifePosts
              .map(post => (
                <article key={post.slug} className="mini-card">
                  <h3>{post.title}</h3>
                  <p>{post.description}</p>
                  <Link href={`/post/${post.slug}`} className="mini-link">Read →</Link>
                </article>
              ))}
            {lifePosts.length === 0 && (
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
          <div className="section-cards category-article-stack">
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

      {/* ARTICLE SPOTLIGHT SECTION */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-header">
            <h2>Have You Read These?</h2>
            <p>A smaller starting point for the essays that best explain what I am building, learning, and thinking through.</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {spotlightPosts.map((post) => (
              <Link key={post.slug} href={`/post/${post.slug}`} className="block">
                <article className="spotlight-card h-full">
                  <p className="card-pill">{categoryLabel(post.tag)}</p>
                  <h3>{post.title}</h3>
                  <p>{post.description}</p>
                  <span className="card-link">Read this →</span>
                </article>
              </Link>
            ))}
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
            <h2 className="about-title">About Me</h2>
            <p className="about-intro">
              I’m Dekena Wade, a Brooklyn-based, Guyanese-rooted graduate drawn to a recurring question: what could go wrong, what signals matter, and how can we make a better decision? My interests span business and financial risk, cybersecurity, and IT.
            </p>
            <p className="about-body">
              My finance background is a starting point. Through analysis, project work, and learning to code, I’m building the technical skills to investigate systems and communicate what I find—across industries, rather than within one lane.
            </p>
            <Link href="/portfolio" className="btn btn-primary about-cta">See About Me & Portfolio</Link>
          </div>
          <div className="about-card">
            <h3>Quick background</h3>
            <ul>
              <li>🎓 Finance graduate, class of 2026 — building across disciplines</li>
              <li>🌍 Guyanese-American, Brooklyn-based, curious about the world</li>
              <li>📈 Experience: JPMorgan, EY, PwC, Aon, Handshake & more</li>
              <li>🤖 Learning: Python, Git, databases, React, TypeScript, and AI systems</li>
            </ul>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
