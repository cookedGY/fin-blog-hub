import { useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, Shield, AlertTriangle, CheckCircle, Clock } from "lucide-react";

type Incident = { id: number; date: string; model: string; category: string; severity: string; title: string; description: string; impact: string; status: string; resolution: string };

const INCIDENTS: Incident[] = [
  { id: 1, date: "2024-03-15", model: "GPT-4", category: "Hallucination", severity: "High", title: "Fabricated SEC Filing Date", description: "Model cited a non-existent SEC 10-K filing date for Iomega, stating the filing was submitted on March 3, 2007 when the actual date was February 28, 2007.", impact: "Financial compliance risk if used in regulatory context", status: "Resolved", resolution: "Added date verification step to RAG pipeline" },
  { id: 2, date: "2024-03-18", model: "Claude 3", category: "Bias", severity: "Medium", title: "Survivorship Bias in Case Studies", description: "Model consistently cited successful turnaround stories when asked about corporate restructuring, omitting failed restructurings at similar companies.", impact: "Skewed strategic recommendations", status: "Mitigated", resolution: "Prompt engineering to explicitly request balanced examples" },
  { id: 3, date: "2024-03-22", model: "Gemini Pro", category: "Hallucination", severity: "High", title: "Incorrect Financial Ratio Calculation", description: "Model calculated Nokia's debt-to-equity ratio as 0.34 when the actual ratio from the 2011 annual report was 0.52, a 53% error.", impact: "Incorrect creditworthiness assessment", status: "Resolved", resolution: "Added numerical verification layer with source citations" },
  { id: 4, date: "2024-04-01", model: "GPT-4", category: "Overconfidence", severity: "Low", title: "Overstated Prediction Confidence", description: "Model stated with '95% certainty' that American Greetings would file for bankruptcy within 5 years, without acknowledging inherent uncertainty.", impact: "Misleading confidence levels for investment decisions", status: "Monitoring", resolution: "Added uncertainty quantification to output format" },
  { id: 5, date: "2024-04-05", model: "Claude 3", category: "Context Drift", severity: "Medium", title: "Cross-Company Data Contamination", description: "In a multi-turn conversation, model began attributing Nokia's financial metrics to Iomega after 8+ exchanges, suggesting context window degradation.", impact: "Incorrect financial analysis in extended sessions", status: "Resolved", resolution: "Implemented context refresh every 5 turns" },
];

const SEV: Record<string, { bg: string; text: string }> = {
  High: { bg: "#fef2f2", text: "#c0392b" },
  Medium: { bg: "#fffbeb", text: "#b7791f" },
  Low: { bg: "#f0fdf4", text: "#166534" },
};

export default function RiskTracker() {
  const [filter, setFilter] = useState("All");
  const filters = ["All", "High", "Medium", "Low", "Resolved", "Monitoring"];
  const filtered = INCIDENTS.filter(i => filter === "All" || i.severity === filter || i.status === filter);

  const statusIcon = (s: string) => s === "Resolved"
    ? <CheckCircle className="w-4 h-4" style={{ color: "#16a34a" }} />
    : s === "Mitigated"
    ? <Shield className="w-4 h-4" style={{ color: "#2563eb" }} />
    : <Clock className="w-4 h-4" style={{ color: "#d97706" }} />;

  return (
    <div className="min-h-screen" style={{ background: "var(--bg)" }}>
      <div className="max-w-4xl mx-auto px-4 py-10">
        <Link href="/portfolio" className="inline-flex items-center gap-2 text-sm mb-8 hover:underline" style={{ color: "var(--jade)" }}>
          <ArrowLeft className="w-4 h-4" /> Back to Portfolio
        </Link>
        <div className="mb-8">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 text-white" style={{ background: "var(--jade)" }}>AI PROJECT</span>
          <h1 className="text-3xl font-bold mb-3" style={{ fontFamily: "var(--font-serif)", color: "var(--text-main)" }}>AI Risk & Hallucination Tracker</h1>
          <p className="text-sm max-w-2xl" style={{ color: "var(--text-muted)" }}>A governance framework for tracking AI model incidents, hallucinations, and bias events in financial analysis workflows. Inspired by real-world AI safety practices at enterprise finance firms.</p>
          <div className="flex flex-wrap gap-2 mt-4">
            {["AI Governance", "Risk Management", "Hallucination Detection", "Model Safety"].map(tag => (
              <span key={tag} className="px-2 py-1 rounded text-xs" style={{ background: "var(--card-bg)", color: "var(--jade-dark)", border: "1px solid var(--jade-light)" }}>{tag}</span>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[{ label: "Total Incidents", value: "5", color: "var(--jade)" }, { label: "High Severity", value: "2", color: "#c0392b" }, { label: "Resolved", value: "3", color: "#16a34a" }, { label: "Avg Resolution", value: "4.2d", color: "var(--jade)" }].map(s => (
            <div key={s.label} className="rounded-xl p-4 text-center" style={{ background: "var(--card-bg)", border: "1px solid var(--border)" }}>
              <div className="text-2xl font-bold mb-1" style={{ color: s.color }}>{s.value}</div>
              <div className="text-xs" style={{ color: "var(--text-muted)" }}>{s.label}</div>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-2 mb-6">
          {filters.map(f => (
            <button key={f} onClick={() => setFilter(f)} className="px-3 py-1 rounded-full text-xs font-medium transition"
              style={{ background: filter === f ? "var(--jade)" : "var(--card-bg)", color: filter === f ? "#fff" : "var(--text-main)", border: `1px solid ${filter === f ? "var(--jade)" : "var(--border)"}` }}>
              {f}
            </button>
          ))}
        </div>
        <div className="space-y-4">
          {filtered.map(incident => {
            const sev = SEV[incident.severity];
            return (
              <div key={incident.id} className="rounded-xl p-5" style={{ background: "var(--card-bg)", border: "1px solid var(--border)" }}>
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background: sev.bg, color: sev.text }}>{incident.severity}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "var(--bg)", color: "var(--jade-dark)", border: "1px solid var(--jade-light)" }}>{incident.category}</span>
                      <span className="text-xs" style={{ color: "var(--text-muted)" }}>{incident.model} · {incident.date}</span>
                    </div>
                    <h3 className="font-semibold" style={{ color: "var(--text-main)" }}>{incident.title}</h3>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">{statusIcon(incident.status)}<span className="text-xs" style={{ color: "var(--text-muted)" }}>{incident.status}</span></div>
                </div>
                <p className="text-sm mb-3" style={{ color: "var(--text-body)" }}>{incident.description}</p>
                <div className="grid md:grid-cols-2 gap-3">
                  <div className="rounded-lg p-3" style={{ background: "var(--bg)", border: "1px solid var(--border)" }}>
                    <p className="text-xs font-semibold mb-1 flex items-center gap-1" style={{ color: "#c0392b" }}><AlertTriangle className="w-3 h-3" /> Impact</p>
                    <p className="text-xs" style={{ color: "var(--text-body)" }}>{incident.impact}</p>
                  </div>
                  <div className="rounded-lg p-3" style={{ background: "var(--bg)", border: "1px solid var(--border)" }}>
                    <p className="text-xs font-semibold mb-1 flex items-center gap-1" style={{ color: "#16a34a" }}><CheckCircle className="w-3 h-3" /> Resolution</p>
                    <p className="text-xs" style={{ color: "var(--text-body)" }}>{incident.resolution}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
