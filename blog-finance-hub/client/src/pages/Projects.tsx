import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FileText, BarChart, Download, ExternalLink } from "lucide-react";

export default function Projects() {
  return (
    <div className="min-h-screen flex flex-col animate-in fade-in duration-500">
      <Helmet>
        <title>Projects | DeCodes Life</title>
        <meta name="description" content="Finance models, business plans, and case studies by Dekena Wade. A showcase of financial analysis, strategy, and entrepreneurial projects." />
      </Helmet>
      <Header />

      <main className="flex-grow pt-32 pb-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="font-serif text-4xl md:text-5xl mb-6">Projects & Portfolio</h1>
            <p className="text-xl text-muted-foreground font-serif italic">
              "The difference between a dream and a plan is a spreadsheet."
            </p>
          </div>

          {/* Finance Models Section */}
          <section className="mb-20">
            <div className="flex items-center gap-4 mb-8 border-b border-border pb-4">
              <BarChart className="w-8 h-8 text-primary" />
              <h2 className="text-3xl font-serif m-0">Finance Models</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Project 1 */}
              <div className="card group">
                <div className="card-pill">Case Study</div>
                <h3 className="text-2xl mb-3">Nokia Strategic Analysis</h3>
                <p className="text-muted-foreground mb-6">
                  In-depth analysis of Nokia's strategic positioning, market challenges, and 
                  future growth opportunities in the telecommunications sector.
                </p>
                <div className="flex gap-4">
                  <a href="https://nokia-casestudy.manus.space/" target="_blank" rel="noopener noreferrer" className="btn btn-outline text-sm py-2 px-4 flex items-center gap-2">
                    <ExternalLink size={16} /> View Case Study
                  </a>
                </div>
              </div>

              {/* Project 2 */}
              <div className="card group">
                <div className="card-pill">Financial Analysis</div>
                <h3 className="text-2xl mb-3">Iomega Financial Review</h3>
                <p className="text-muted-foreground mb-6">
                  Detailed financial review and valuation analysis of Iomega, focusing on 
                  historical performance and projected cash flows.
                </p>
                <div className="flex gap-4">
                  <a href="https://iomegafin.click/" target="_blank" rel="noopener noreferrer" className="btn btn-outline text-sm py-2 px-4 flex items-center gap-2">
                    <ExternalLink size={16} /> View Analysis
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* AI/ML Projects Section */}
          <section className="mb-20">
            <div className="flex items-center gap-4 mb-8 border-b border-border pb-4">
              <BarChart className="w-8 h-8 text-primary" />
              <h2 className="text-3xl font-serif m-0">AI/ML Portfolio Projects</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* AI Project 1 */}
              <div className="card group">
                <div className="card-pill">AI/LLM</div>
                <h3 className="text-2xl mb-3">RAG Assistant</h3>
                <p className="text-muted-foreground mb-6">
                  Retrieval-Augmented Generation system for querying corporate financial reports with semantic search capabilities.
                </p>
                <div className="flex gap-4">
                  <a href="/projects/rag" className="btn btn-outline text-sm py-2 px-4 flex items-center gap-2">
                    <ExternalLink size={16} /> Explore
                  </a>
                </div>
              </div>

              {/* AI Project 2 */}
              <div className="card group">
                <div className="card-pill">Data Analysis</div>
                <h3 className="text-2xl mb-3">Financial Anomaly Detection</h3>
                <p className="text-muted-foreground mb-6">
                  Real-time detection of financial distress signals using machine learning on 10-K filings.
                </p>
                <div className="flex gap-4">
                  <a href="/projects/anomaly" className="btn btn-outline text-sm py-2 px-4 flex items-center gap-2">
                    <ExternalLink size={16} /> Explore
                  </a>
                </div>
              </div>

              {/* AI Project 3 */}
              <div className="card group">
                <div className="card-pill">AI Evaluation</div>
                <h3 className="text-2xl mb-3">LLM Evaluation Dashboard</h3>
                <p className="text-muted-foreground mb-6">
                  Score and evaluate AI responses for accuracy, hallucination risk, and reasoning quality.
                </p>
                <div className="flex gap-4">
                  <a href="/projects/llm-evaluation" className="btn btn-outline text-sm py-2 px-4 flex items-center gap-2">
                    <ExternalLink size={16} /> Explore
                  </a>
                </div>
              </div>

              {/* AI Project 4 */}
              <div className="card group">
                <div className="card-pill">AI Governance</div>
                <h3 className="text-2xl mb-3">AI Risk & Hallucination Tracker</h3>
                <p className="text-muted-foreground mb-6">
                  Real-time monitoring system for detecting AI model risks, hallucinations, biases, and jailbreaks.
                </p>
                <div className="flex gap-4">
                  <a href="/projects/risk-tracker" className="btn btn-outline text-sm py-2 px-4 flex items-center gap-2">
                    <ExternalLink size={16} /> Explore
                  </a>
                </div>
              </div>

              {/* AI Project 5 */}
              <div className="card group">
                <div className="card-pill">Observability</div>
                <h3 className="text-2xl mb-3">AI Workflow Observability</h3>
                <p className="text-muted-foreground mb-6">
                  Real-time monitoring dashboard for AI workflow execution with step-level metrics and cost analysis.
                </p>
                <div className="flex gap-4">
                  <a href="/projects/workflow-observability" className="btn btn-outline text-sm py-2 px-4 flex items-center gap-2">
                    <ExternalLink size={16} /> Explore
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Business Plans Section */}
          <section>
            <div className="flex items-center gap-4 mb-8 border-b border-border pb-4">
              <FileText className="w-8 h-8 text-primary" />
              <h2 className="text-3xl font-serif m-0">Business Plans</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Project 3 */}
              <div className="card group">
                <div className="card-pill">Strategy</div>
                <h3 className="text-2xl mb-3">Kofi Trucking Expansion</h3>
                <p className="text-muted-foreground mb-6">
                  Strategic growth plan including fleet expansion analysis, operational 
                  efficiency improvements, and financial projections.
                </p>
                <div className="flex gap-4">
                  <button className="btn btn-outline text-sm py-2 px-4 flex items-center gap-2">
                    <Download size={16} /> Pitch Deck
                  </button>
                </div>
              </div>

              {/* Project 4 */}
              <div className="card group">
                <div className="card-pill">Tourism</div>
                <h3 className="text-2xl mb-3">Wang Tours Taiwan</h3>
                <p className="text-muted-foreground mb-6">
                  Market entry strategy and business model canvas for a boutique 
                  cultural tourism agency targeting young professionals.
                </p>
                <div className="flex gap-4">
                  <button className="btn btn-outline text-sm py-2 px-4 flex items-center gap-2">
                    <Download size={16} /> Business Plan
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
