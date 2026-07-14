import { useState } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, FileText, Loader2, Filter, Home } from "lucide-react";

const PROJECT_CATEGORIES = [
  "Finance Grind",
  "Global De",
  "Business Builder",
  "Life & Growth",
  "Fun Stuff",
];

export default function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Fetch all public files
  const allFilesQuery = trpc.files.listPublic.useQuery();

  // Filter files based on selected category
  const filteredFiles = selectedCategory
    ? allFilesQuery.data?.filter((file) => file.projectCategory === selectedCategory) || []
    : allFilesQuery.data || [];

  const getFileIcon = (mimeType: string) => {
    if (mimeType.includes("pdf")) return "📄";
    if (mimeType.includes("word") || mimeType.includes("document")) return "📝";
    if (mimeType.includes("sheet") || mimeType.includes("excel")) return "📊";
    if (mimeType.includes("presentation")) return "🎯";
    if (mimeType.includes("zip") || mimeType.includes("archive")) return "📦";
    return "📎";
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <section className="bg-gradient-to-b from-primary/5 to-transparent py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-2">
                Portfolio
              </h1>
              <p className="text-lg text-muted-foreground font-medium">
                by Dekena Wade
              </p>
            </div>
            <Link href="/">
              <Button variant="outline" size="sm" className="gap-2">
                <Home className="w-4 h-4" />
                Home
              </Button>
            </Link>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Explore case studies, financial analyses, business projects, and more from my work across
            finance, travel, business ventures, and personal growth.
          </p>
        </div>
      </section>

      {/* Featured Case Studies */}
      <section className="bg-gradient-to-b from-accent/5 to-transparent py-12 px-4 border-t border-border">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-serif font-bold text-foreground mb-2">Featured Case Studies</h2>
          <p className="text-muted-foreground mb-8">Deep dives into real-world projects and analyses</p>
          
          <div className="grid gap-6 md:grid-cols-3">
            {/* Nokia Case Study */}
            <a href="https://nokia-casestudy.manus.space/" target="_blank" rel="noopener noreferrer">
              <Card className="hover:shadow-lg transition-all duration-300 h-full hover:border-primary cursor-pointer">
                <CardHeader>
                  <div className="text-3xl mb-2">📱</div>
                  <CardTitle className="text-xl">Nokia Case Study</CardTitle>
                  <CardDescription>Financial Analysis & Market Dynamics</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    A comprehensive analysis of Nokia's financial performance, market positioning, and strategic decisions in the mobile industry.
                  </p>
                  <div className="inline-flex items-center gap-2 text-primary text-sm font-medium">
                    View Case Study →
                  </div>
                </CardContent>
              </Card>
            </a>

            {/* IOMEGA Case Study */}
            <a href="https://iomegafin-usztjjag.manus.space/" target="_blank" rel="noopener noreferrer">
              <Card className="hover:shadow-lg transition-all duration-300 h-full hover:border-primary cursor-pointer">
                <CardHeader>
                  <div className="text-3xl mb-2">💾</div>
                  <CardTitle className="text-xl">IOMEGA Case Study</CardTitle>
                  <CardDescription>Business Strategy & Financial Performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    An in-depth examination of IOMEGA's business strategy, financial metrics, and competitive positioning in the storage technology market.
                  </p>
                  <div className="inline-flex items-center gap-2 text-primary text-sm font-medium">
                    View Case Study →
                  </div>
                </CardContent>
              </Card>
            </a>

            {/* American Greeting Card Case Study */}
            <a href="https://ameridash-scxf8jz4.manus.space/" target="_blank" rel="noopener noreferrer">
              <Card className="hover:shadow-lg transition-all duration-300 h-full hover:border-primary cursor-pointer">
                <CardHeader>
                  <div className="text-3xl mb-2">💌</div>
                  <CardTitle className="text-xl">American Greeting Card</CardTitle>
                  <CardDescription>Business Analysis & Market Strategy</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    A detailed case analysis of American Greeting Card's business model, market positioning, and strategic challenges in the greeting card industry.
                  </p>
                  <div className="inline-flex items-center gap-2 text-primary text-sm font-medium">
                    View Case Study →
                  </div>
                </CardContent>
              </Card>
            </a>

            {/* Recent Presentation */}
            <a href="https://nvdapresen-cehp3wfn.manus.space" target="_blank" rel="noopener noreferrer">
              <Card className="hover:shadow-lg transition-all duration-300 h-full hover:border-primary cursor-pointer">
                <CardHeader>
                  <div className="text-3xl mb-2">🎯</div>
                  <CardTitle className="text-xl">Recent Presentation</CardTitle>
                  <CardDescription>Professional Insights & Analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    A comprehensive presentation showcasing key insights, strategic analysis, and professional perspectives on current market trends and opportunities.
                  </p>
                  <div className="inline-flex items-center gap-2 text-primary text-sm font-medium">
                    View Presentation →
                  </div>
                </CardContent>
              </Card>
            </a>
          </div>
        </div>
      </section>

      {/* AI/ML Portfolio Projects */}
      <section className="bg-gradient-to-b from-primary/5 to-transparent py-12 px-4 border-t border-border">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-serif font-bold text-foreground mb-2">AI/ML Portfolio Projects</h2>
          <p className="text-muted-foreground mb-8">Applied AI tools showcasing evaluation, governance, and finance operations expertise</p>
          
          <div className="grid gap-6 md:grid-cols-3">
            <a href="/projects/rag">
              <Card className="hover:shadow-lg transition-all duration-300 h-full hover:border-primary cursor-pointer">
                <CardHeader>
                  <div className="text-3xl mb-2">🔍</div>
                  <CardTitle className="text-xl">RAG Assistant</CardTitle>
                  <CardDescription>AI/LLM · Semantic Search</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Retrieval-Augmented Generation system for querying corporate financial reports (Iomega, Nokia, American Greetings) with semantic search.
                  </p>
                  <div className="inline-flex items-center gap-2 text-primary text-sm font-medium">Explore →</div>
                </CardContent>
              </Card>
            </a>

            <a href="/projects/anomaly">
              <Card className="hover:shadow-lg transition-all duration-300 h-full hover:border-primary cursor-pointer">
                <CardHeader>
                  <div className="text-3xl mb-2">📉</div>
                  <CardTitle className="text-xl">Financial Anomaly Detection</CardTitle>
                  <CardDescription>Data Analysis · 10-K Filings</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Real-time detection of financial distress signals using machine learning on SEC 10-K filings and corporate financial data.
                  </p>
                  <div className="inline-flex items-center gap-2 text-primary text-sm font-medium">Explore →</div>
                </CardContent>
              </Card>
            </a>

            <a href="/projects/llm-evaluation">
              <Card className="hover:shadow-lg transition-all duration-300 h-full hover:border-primary cursor-pointer">
                <CardHeader>
                  <div className="text-3xl mb-2">🧪</div>
                  <CardTitle className="text-xl">LLM Evaluation Dashboard</CardTitle>
                  <CardDescription>AI Evaluation · Quality Scoring</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Score and evaluate AI responses for accuracy, hallucination risk, and reasoning quality across finance Q&A tasks.
                  </p>
                  <div className="inline-flex items-center gap-2 text-primary text-sm font-medium">Explore →</div>
                </CardContent>
              </Card>
            </a>

            <a href="/projects/risk-tracker">
              <Card className="hover:shadow-lg transition-all duration-300 h-full hover:border-primary cursor-pointer">
                <CardHeader>
                  <div className="text-3xl mb-2">🛡️</div>
                  <CardTitle className="text-xl">AI Risk & Hallucination Tracker</CardTitle>
                  <CardDescription>AI Governance · Safety Monitoring</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Real-time monitoring system for detecting AI model risks, hallucinations, biases, and jailbreaks with incident management.
                  </p>
                  <div className="inline-flex items-center gap-2 text-primary text-sm font-medium">Explore →</div>
                </CardContent>
              </Card>
            </a>

            <a href="/projects/workflow-observability">
              <Card className="hover:shadow-lg transition-all duration-300 h-full hover:border-primary cursor-pointer">
                <CardHeader>
                  <div className="text-3xl mb-2">📊</div>
                  <CardTitle className="text-xl">AI Workflow Observability</CardTitle>
                  <CardDescription>Observability · Cost Analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Real-time monitoring dashboard for AI workflow execution with step-level metrics, latency tracking, and cost analysis.
                  </p>
                  <div className="inline-flex items-center gap-2 text-primary text-sm font-medium">Explore →</div>
                </CardContent>
              </Card>
            </a>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Category Filter */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">Filter by Category</h2>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button
              onClick={() => setSelectedCategory(null)}
              variant={selectedCategory === null ? "default" : "outline"}
              className="rounded-full"
            >
              All Projects
            </Button>
            {PROJECT_CATEGORIES.map((category) => (
              <Button
                key={category}
                onClick={() => setSelectedCategory(category)}
                variant={selectedCategory === category ? "default" : "outline"}
                className="rounded-full"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Files Grid */}
        {allFilesQuery.isLoading ? (
          <div className="flex items-center justify-center py-16">
            <div className="text-center">
              <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
              <p className="text-muted-foreground">Loading portfolio...</p>
            </div>
          </div>
        ) : filteredFiles.length > 0 ? (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground mb-6">
              Showing {filteredFiles.length} {selectedCategory ? `project(s) in ${selectedCategory}` : "project(s)"}
            </p>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredFiles.map((file) => (
                <Card
                  key={file.id}
                  className="hover:shadow-lg transition-shadow duration-300 flex flex-col"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="text-2xl mb-2">{getFileIcon(file.mimeType)}</div>
                        <CardTitle className="text-lg line-clamp-2 break-words">
                          {file.filename}
                        </CardTitle>
                        <CardDescription className="text-xs mt-1">
                          {file.projectCategory}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="flex-1 flex flex-col justify-between">
                    {file.description && (
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                        {file.description}
                      </p>
                    )}

                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{formatFileSize(file.fileSize)}</span>
                        <span>{new Date(file.createdAt).toLocaleDateString()}</span>
                      </div>

                      <a
                        href={file.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
                      >
                        <Download className="w-4 h-4" />
                        Download
                      </a>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No projects yet</h3>
            <p className="text-muted-foreground">
              {selectedCategory
                ? `No projects found in ${selectedCategory}. Try selecting a different category.`
                : "Check back soon for case studies and project showcases!"}
            </p>
          </div>
        )}
      </div>

      {/* Stats Section */}
      {allFilesQuery.data && allFilesQuery.data.length > 0 && (
        <section className="bg-muted/30 py-12 px-4 mt-12">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-serif font-bold text-primary mb-2">
                  {allFilesQuery.data.length}
                </div>
                <p className="text-sm text-muted-foreground">Projects Shared</p>
              </div>
              <div>
                <div className="text-3xl font-serif font-bold text-primary mb-2">
                  {PROJECT_CATEGORIES.length}
                </div>
                <p className="text-sm text-muted-foreground">Categories</p>
              </div>
              <div>
                <div className="text-3xl font-serif font-bold text-primary mb-2">
                  {(
                    allFilesQuery.data.reduce((sum, file) => sum + file.fileSize, 0) /
                    (1024 * 1024)
                  ).toFixed(1)}
                  MB
                </div>
                <p className="text-sm text-muted-foreground">Total Size</p>
              </div>
              <div>
                <div className="text-3xl font-serif font-bold text-primary mb-2">
                  {new Set(allFilesQuery.data.map((f) => f.projectCategory)).size}
                </div>
                <p className="text-sm text-muted-foreground">Active Categories</p>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
