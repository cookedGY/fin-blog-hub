import { useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, TrendingDown, AlertTriangle, BarChart2 } from "lucide-react";

const COMPANIES = [
  {
    name: "Iomega Corporation", ticker: "IOM", year: 2007,
    signals: [
      { metric: "Revenue Growth", value: "-8.7%", status: "danger", note: "3rd consecutive year of decline" },
      { metric: "Gross Margin", value: "28.1%", status: "warning", note: "Down from 35.2% in 2005" },
      { metric: "Operating Income", value: "-$18.2M", status: "danger", note: "Operating loss for 2nd year" },
      { metric: "Cash Burn Rate", value: "$22M/yr", status: "warning", note: "At this rate, 5 years of runway" },
      { metric: "Product Concentration", value: "62%", status: "danger", note: "Zip products as % of revenue" },
      { metric: "R&D Spend", value: "4.1%", status: "warning", note: "Below industry average of 7%" },
    ],
    riskScore: 78, verdict: "HIGH RISK", verdictColor: "#e05252",
    summary: "Multiple converging signals indicate structural decline. Revenue concentration in legacy Zip products combined with margin compression and operating losses suggest the business model is unsustainable without a major pivot.",
  },
  {
    name: "Nokia Corporation", ticker: "NOK", year: 2011,
    signals: [
      { metric: "Revenue Growth", value: "-9.0%", status: "danger", note: "Accelerating decline from -4% in 2010" },
      { metric: "Market Share", value: "25%", status: "danger", note: "Down from 38% in 2008" },
      { metric: "Operating Margin", value: "-2.8%", status: "danger", note: "First operating loss in devices division" },
      { metric: "Cash Position", value: "€4.9B", status: "ok", note: "Strong liquidity buffer" },
      { metric: "Platform Risk", value: "Critical", status: "danger", note: "Symbian OS losing developer support" },
      { metric: "Workforce Reduction", value: "18,000", status: "warning", note: "Announced layoffs as cost measure" },
    ],
    riskScore: 85, verdict: "CRITICAL RISK", verdictColor: "#c0392b",
    summary: "Nokia exhibits classic signs of platform disruption. Accelerating market share loss, operating losses, and a forced platform pivot to Windows Phone indicate a company in existential crisis despite its strong cash position.",
  },
  {
    name: "American Greetings", ticker: "AM", year: 2013,
    signals: [
      { metric: "Revenue Growth", value: "-3.2%", status: "warning", note: "Moderate but consistent decline" },
      { metric: "Operating Margin", value: "7.2%", status: "ok", note: "Positive but declining from 8.5%" },
      { metric: "Digital Revenue", value: "+15%", status: "ok", note: "Growing offset to physical decline" },
      { metric: "Debt Load", value: "$485M", status: "warning", note: "Increased post-LBO transaction" },
      { metric: "Retail Footprint", value: "-12%", status: "warning", note: "Deliberate reduction in store count" },
      { metric: "Free Cash Flow", value: "$98M", status: "ok", note: "Sufficient to service LBO debt" },
    ],
    riskScore: 42, verdict: "MODERATE RISK", verdictColor: "#e67e22",
    summary: "American Greetings shows manageable distress signals. Unlike Iomega and Nokia, the company maintains positive operating margins and is executing a deliberate digital transition. The LBO debt load is the primary risk factor.",
  },
];

const STATUS_STYLES: Record<string, { bg: string; text: string; icon: string }> = {
  danger: { bg: "#fef2f2", text: "#c0392b", icon: "🔴" },
  warning: { bg: "#fffbeb", text: "#b7791f", icon: "🟡" },
  ok: { bg: "#f0fdf4", text: "#166534", icon: "🟢" },
};

export default function AnomalyDetection() {
  const [selected, setSelected] = useState(0);
  const company = COMPANIES[selected];

  return (
    <div className="min-h-screen" style={{ background: "var(--bg)" }}>
      <div className="max-w-4xl mx-auto px-4 py-10">
        <Link href="/portfolio" className="inline-flex items-center gap-2 text-sm mb-8 hover:underline" style={{ color: "var(--jade)" }}>
          <ArrowLeft className="w-4 h-4" /> Back to Portfolio
        </Link>
        <div className="mb-8">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 text-white" style={{ background: "var(--jade)" }}>AI PROJECT</span>
          <h1 className="text-3xl font-bold mb-3" style={{ fontFamily: "var(--font-serif)", color: "var(--text-main)" }}>Financial Anomaly Detection</h1>
          <p className="text-sm max-w-2xl" style={{ color: "var(--text-muted)" }}>
            A rule-based anomaly detection system that identifies financial distress signals from corporate 10-K filings.
            Analyzes revenue trends, margin compression, cash burn, and strategic risk factors.
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            {["Anomaly Detection", "Financial Modeling", "Risk Scoring", "10-K Analysis"].map(tag => (
              <span key={tag} className="px-2 py-1 rounded text-xs" style={{ background: "var(--card-bg)", color: "var(--jade-dark)", border: "1px solid var(--jade-light)" }}>{tag}</span>
            ))}
          </div>
        </div>

        <div className="flex gap-3 mb-8 flex-wrap">
          {COMPANIES.map((c, i) => (
            <button key={c.ticker} onClick={() => setSelected(i)}
              className="px-4 py-2 rounded-lg text-sm font-medium transition"
              style={{ background: selected === i ? "var(--jade)" : "var(--card-bg)", color: selected === i ? "#fff" : "var(--text-main)", border: `1px solid ${selected === i ? "var(--jade)" : "var(--border)"}` }}>
              {c.ticker} ({c.year})
            </button>
          ))}
        </div>

        <div className="rounded-xl p-6 mb-6 flex flex-col md:flex-row md:items-center gap-6" style={{ background: "var(--card-bg)", border: "1px solid var(--border)" }}>
          <div className="flex-1">
            <h2 className="font-bold text-xl mb-1" style={{ color: "var(--text-main)" }}>{company.name}</h2>
            <p className="text-sm mb-3" style={{ color: "var(--text-muted)" }}>{company.ticker} · {company.year} Annual Report</p>
            <p className="text-sm" style={{ color: "var(--text-body)" }}>{company.summary}</p>
          </div>
          <div className="flex flex-col items-center min-w-[140px]">
            <div className="w-24 h-24 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-2" style={{ background: company.verdictColor }}>
              {company.riskScore}
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-full text-white" style={{ background: company.verdictColor }}>{company.verdict}</span>
            <span className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>Risk Score / 100</span>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="font-semibold mb-4 flex items-center gap-2" style={{ color: "var(--text-main)" }}>
            <BarChart2 className="w-5 h-5" style={{ color: "var(--jade)" }} /> Anomaly Signals Detected
          </h3>
          <div className="grid md:grid-cols-2 gap-3">
            {company.signals.map(signal => {
              const style = STATUS_STYLES[signal.status];
              return (
                <div key={signal.metric} className="rounded-lg p-4 flex items-start gap-3" style={{ background: style.bg, border: `1px solid ${style.text}22` }}>
                  <span className="text-lg mt-0.5">{style.icon}</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-semibold" style={{ color: "var(--text-muted)" }}>{signal.metric}</span>
                      <span className="text-sm font-bold" style={{ color: style.text }}>{signal.value}</span>
                    </div>
                    <p className="text-xs" style={{ color: "var(--text-body)" }}>{signal.note}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-xl p-6" style={{ background: "var(--card-bg)", border: "1px solid var(--border)" }}>
          <h3 className="font-semibold mb-4 flex items-center gap-2" style={{ color: "var(--text-main)" }}>
            <TrendingDown className="w-5 h-5" style={{ color: "var(--jade)" }} /> Detection Methodology
          </h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            {[
              { title: "Revenue Signals", items: ["YoY decline > 5%", "3+ consecutive quarters down", "Segment concentration > 50%"] },
              { title: "Margin Signals", items: ["Gross margin < 30%", "Operating margin negative", "EBITDA compression > 200bps"] },
              { title: "Strategic Signals", items: ["Platform/product obsolescence", "Market share loss > 10%", "Workforce reduction > 5%"] },
            ].map(section => (
              <div key={section.title}>
                <p className="font-semibold text-xs mb-2" style={{ color: "var(--jade-dark)" }}>{section.title}</p>
                <ul className="space-y-1">
                  {section.items.map(item => (
                    <li key={item} className="flex items-start gap-2 text-xs" style={{ color: "var(--text-body)" }}>
                      <AlertTriangle className="w-3 h-3 mt-0.5 shrink-0" style={{ color: "var(--jade)" }} />{item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
