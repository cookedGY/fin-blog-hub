import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, Bot, BriefcaseBusiness, Home } from "lucide-react";
import BlogAmbientAudio from "@/components/BlogAmbientAudio";

const financeWork = [
  {
    title: "Nokia Case Study",
    subtitle: "Financial Analysis & Market Dynamics",
    description: "A comprehensive analysis of Nokia's financial performance, market positioning, and strategic decisions in the mobile industry.",
    href: "https://nokia-casestudy.manus.space/",
    emoji: "📱",
    skills: ["Financial analysis", "Market research", "Strategy"],
    recruiterNote: "Shows how I translate company history, financial signals, and competitive context into a structured business view.",
  },
  {
    title: "IOMEGA Case Study",
    subtitle: "Business Strategy & Financial Performance",
    description: "An examination of IOMEGA's business strategy, financial metrics, and competitive positioning in the storage technology market.",
    href: "https://iomegafin-usztjjag.manus.space/",
    emoji: "💾",
    skills: ["Historical data", "Financial metrics", "Competitive analysis"],
    recruiterNote: "Highlights my ability to work with older source material, rebuild context, and analyze a company beyond surface-level numbers.",
  },
  {
    title: "American Greeting Card",
    subtitle: "Business Analysis & Market Strategy",
    description: "A detailed case analysis of American Greeting Card's business model, market positioning, and strategic challenges.",
    href: "https://ameridash-scxf8jz4.manus.space/",
    emoji: "💌",
    skills: ["Business models", "Market positioning", "Consumer strategy"],
    recruiterNote: "Connects qualitative business model thinking with financial and strategic interpretation.",
  },
  {
    title: "NVDA Investor Presentation",
    subtitle: "Professional Insights & Analysis",
    description: "A presentation showcasing market insights, strategic analysis, and professional perspectives on current market trends.",
    href: "https://nvdapresen-cehp3wfn.manus.space",
    emoji: "🎯",
    skills: ["Presentation", "Investor narrative", "Market trends"],
    recruiterNote: "Demonstrates communication skills: turning analysis into a polished, audience-ready story.",
  },
];

const techWork = [
  {
    title: "RAG Assistant",
    subtitle: "AI/LLM · Semantic Search",
    description: "Retrieval-Augmented Generation system for querying corporate financial reports with semantic search.",
    href: "/projects/rag",
    emoji: "🔍",
    skills: ["RAG", "Semantic search", "Financial reports"],
    recruiterNote: "Shows my interest in building tools that make financial documents easier to query and understand.",
  },
  {
    title: "Financial Anomaly Detection",
    subtitle: "Data Analysis · 10-K Filings",
    description: "Detection of financial distress signals using machine learning on SEC 10-K filings and corporate financial data.",
    href: "/projects/anomaly",
    emoji: "📉",
    skills: ["ML signals", "SEC filings", "Risk detection"],
    recruiterNote: "Connects finance fundamentals with applied data analysis and early-warning systems.",
  },
  {
    title: "LLM Evaluation Dashboard",
    subtitle: "AI Evaluation · Quality Scoring",
    description: "Scores AI responses for accuracy, hallucination risk, and reasoning quality across finance Q&A tasks.",
    href: "/projects/llm-evaluation",
    emoji: "🧪",
    skills: ["AI evaluation", "Quality scoring", "Finance QA"],
    recruiterNote: "Shows I am thinking about reliability, not just output, when using AI in finance workflows.",
  },
  {
    title: "AI Risk & Hallucination Tracker",
    subtitle: "AI Governance · Safety Monitoring",
    description: "Monitoring system for detecting AI model risks, hallucinations, biases, and jailbreaks with incident management.",
    href: "/projects/risk-tracker",
    emoji: "🛡️",
    skills: ["AI governance", "Monitoring", "Incident review"],
    recruiterNote: "Demonstrates governance awareness and the operational side of responsible AI.",
  },
  {
    title: "AI Workflow Observability",
    subtitle: "Observability · Cost Analysis",
    description: "Dashboard for AI workflow execution with step-level metrics, latency tracking, and cost analysis.",
    href: "/projects/workflow-observability",
    emoji: "📊",
    skills: ["Observability", "Latency", "Cost tracking"],
    recruiterNote: "Shows I can think about AI systems as business operations, not just demos.",
  },
];

export default function Portfolio() {
  const [activePane, setActivePane] = useState<"finance" | "tech" | null>(null);
  const isFinanceActive = activePane === "finance";
  const isTechActive = activePane === "tech";

  return (
    <div className="portfolio-page min-h-screen">
      {/* Header Section */}
      <section className="portfolio-hero py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-2">
                Portfolio at a Glance
              </h1>
              <p className="text-lg text-muted-foreground font-medium">
                by Dekena Wade
              </p>
            </div>
            <div className="portfolio-header-actions">
              <Link href="/">
                <Button variant="outline" size="sm" className="gap-2">
                  <Home className="w-4 h-4" />
                  Home
                </Button>
              </Link>
              <BlogAmbientAudio />
            </div>
          </div>
          <p className="portfolio-intro-card text-lg text-muted-foreground max-w-3xl">
            A recruiter-friendly view of my work at the intersection of finance, analysis, and applied technology:
            finance case studies, technical builds, and the skills connecting both. These projects show how I
            turn class-based analysis into visual storytelling, then build toward dashboards that can help flag
            risk, anomalies, and operational signals in finance and AI workflows.
          </p>
        </div>
      </section>

      {/* Recruiter Split Portfolio */}
      <section className="portfolio-work-section py-12 px-4 border-t border-border">
        <div className="max-w-5xl mx-auto">
          <div className="grid gap-6 md:grid-cols-2">
            <div
              className="group/column cursor-pointer rounded-3xl border border-sky-200/70 bg-sky-50/70 p-4 transition-all duration-300 hover:border-sky-400/60 hover:shadow-lg md:p-5"
              onClick={() => setActivePane("finance")}
              onFocusCapture={() => setActivePane("finance")}
              onMouseEnter={() => setActivePane("finance")}
              onMouseLeave={() => setActivePane(null)}
            >
              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-full bg-sky-100 text-sky-700">
                    <BriefcaseBusiness className="h-5 w-5" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-foreground">Finance Case Studies & Work</h3>
                  <p className="text-sm text-muted-foreground">
                    Company analysis, financial storytelling, market context, and business strategy.
                  </p>
                </div>
                <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-medium text-sky-700">
                  Finance
                </span>
              </div>

              <div className="mb-5 flex flex-wrap gap-2">
                {["Financial analysis", "Market research", "Strategy", "Presentation"].map((skill) => (
                  <span key={skill} className="rounded-full border border-sky-200 bg-white/70 px-3 py-1 text-xs text-sky-700">
                    {skill}
                  </span>
                ))}
              </div>

              {!isFinanceActive && (
                <div className="mb-5 grid gap-3 text-sm text-muted-foreground">
                  <div className="flex items-center justify-between gap-3 rounded-2xl border border-sky-200 bg-white/75 p-4">
                    <span className="font-medium text-foreground">4 featured pieces</span>
                    <span className="text-right text-sky-700">Nokia, IOMEGA, AG, NVDA</span>
                  </div>
                  <div className="flex items-center justify-between gap-3 rounded-2xl border border-sky-200 bg-white/75 p-4">
                    <span className="font-medium text-foreground">Recruiter signal</span>
                    <span className="text-right text-sky-700">Analysis to presentation</span>
                  </div>
                  <div className="rounded-2xl border border-sky-200 bg-white/75 p-4 text-sky-700">
                    Hover or tap to reveal the finance case studies.
                  </div>
                </div>
              )}

              {isFinanceActive && (
                <>
                  <div className="mb-5 rounded-2xl border border-sky-200 bg-white/75 p-4 text-sm text-muted-foreground">
                    <p className="font-medium text-sky-700 mb-1">Why these projects matter</p>
                    <p>
                      These began as class-based analyses that I wanted to elevate because I had to present
                      them to my professor and classmates. I focused on making the work visual, easy to digest,
                      and clear about how I moved from research to analysis to final results.
                    </p>
                  </div>

                  <div className="space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
                    {financeWork.map((project) => (
                      <a key={project.title} href={project.href} target="_blank" rel="noopener noreferrer" className="group/card block">
                        <Card className="overflow-hidden transition-all duration-300 group-hover/card:-translate-y-1 group-hover/card:border-sky-400/70 group-hover/card:shadow-md">
                          <CardHeader className="pb-3">
                            <div className="flex items-start justify-between gap-3">
                              <div>
                                <div className="text-3xl mb-2">{project.emoji}</div>
                                <CardTitle className="text-lg">{project.title}</CardTitle>
                                <CardDescription>{project.subtitle}</CardDescription>
                              </div>
                              <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform duration-300 group-hover/card:translate-x-1 group-hover/card:-translate-y-1 group-hover/card:text-sky-700" />
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-muted-foreground mb-3">{project.description}</p>
                            <div className="flex flex-wrap gap-2 mb-3">
                              {project.skills.map((skill) => (
                                <span key={skill} className="rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground">
                                  {skill}
                                </span>
                              ))}
                            </div>
                            <div className="max-h-0 overflow-hidden text-sm text-sky-700 transition-all duration-300 group-hover/card:max-h-24 group-focus-within/card:max-h-24">
                              {project.recruiterNote}
                            </div>
                          </CardContent>
                        </Card>
                      </a>
                    ))}
                  </div>
                </>
              )}
            </div>

            <div
              className="group/column cursor-pointer rounded-3xl border border-emerald-200/80 bg-emerald-50/75 p-4 transition-all duration-300 hover:border-emerald-500/50 hover:shadow-lg md:p-5"
              onClick={() => setActivePane("tech")}
              onFocusCapture={() => setActivePane("tech")}
              onMouseEnter={() => setActivePane("tech")}
              onMouseLeave={() => setActivePane(null)}
            >
              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                    <Bot className="h-5 w-5" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-foreground">Tech & Applied AI Work</h3>
                  <p className="text-sm text-muted-foreground">
                    AI evaluation, data tools, risk monitoring, observability, and finance automation.
                  </p>
                </div>
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
                  Tech
                </span>
              </div>

              <div className="mb-5 flex flex-wrap gap-2">
                {["Python", "AI evaluation", "Data analysis", "Observability"].map((skill) => (
                  <span key={skill} className="rounded-full border border-emerald-200 bg-white/70 px-3 py-1 text-xs text-emerald-700">
                    {skill}
                  </span>
                ))}
              </div>

              {!isTechActive && (
                <div className="mb-5 grid gap-3 text-sm text-muted-foreground">
                  <div className="flex items-center justify-between gap-3 rounded-2xl border border-emerald-200 bg-white/75 p-4">
                    <span className="font-medium text-foreground">5 featured builds</span>
                    <span className="text-right text-emerald-700">RAG, eval, risk, anomalies</span>
                  </div>
                  <div className="flex items-center justify-between gap-3 rounded-2xl border border-emerald-200 bg-white/75 p-4">
                    <span className="font-medium text-foreground">Recruiter signal</span>
                    <span className="text-right text-emerald-700">Enterprise-style monitoring</span>
                  </div>
                  <div className="rounded-2xl border border-emerald-200 bg-white/75 p-4 text-emerald-700">
                    Hover or tap to reveal the applied AI dashboards.
                  </div>
                </div>
              )}

              {isTechActive && (
                <>
                  <div className="mb-5 rounded-2xl border border-emerald-200 bg-white/75 p-4 text-sm text-muted-foreground">
                    <p className="font-medium text-emerald-700 mb-1">Why these projects matter</p>
                    <p>
                      These builds extend my finance work into dashboards that can rate, evaluate, and flag
                      risk or anomalies. The idea is similar to how software engineering or IT teams monitor
                      enterprise systems: spot issues early, surface signals clearly, and make review easier.
                      My experience working at JPMorgan, two Big 4 firms, Aon, and later Handshake helped me
                      see how helpful these integrations can be when they are trained on the right data, built
                      with the right structure, and used with clear intent.
                    </p>
                  </div>

                  <div className="space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
                    {techWork.map((project) => (
                      <Link key={project.title} href={project.href} className="group/card block">
                        <Card className="overflow-hidden transition-all duration-300 group-hover/card:-translate-y-1 group-hover/card:border-emerald-500/60 group-hover/card:shadow-md">
                          <CardHeader className="pb-3">
                            <div className="flex items-start justify-between gap-3">
                              <div>
                                <div className="text-3xl mb-2">{project.emoji}</div>
                                <CardTitle className="text-lg">{project.title}</CardTitle>
                                <CardDescription>{project.subtitle}</CardDescription>
                              </div>
                              <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform duration-300 group-hover/card:translate-x-1 group-hover/card:-translate-y-1 group-hover/card:text-emerald-700" />
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-muted-foreground mb-3">{project.description}</p>
                            <div className="flex flex-wrap gap-2 mb-3">
                              {project.skills.map((skill) => (
                                <span key={skill} className="rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground">
                                  {skill}
                                </span>
                              ))}
                            </div>
                            <div className="max-h-0 overflow-hidden text-sm text-emerald-700 transition-all duration-300 group-hover/card:max-h-24 group-focus-within/card:max-h-24">
                              {project.recruiterNote}
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="h-12" />
    </div>
  );
}
