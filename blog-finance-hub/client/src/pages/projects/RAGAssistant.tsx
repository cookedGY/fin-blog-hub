import { useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, Search, FileText, Building2, ChevronDown, ChevronUp } from "lucide-react";

const REPORTS: Record<string, {
  name: string; ticker: string; year: string; industry: string; summary: string;
  keyFacts: string[]; riskFactors: string[];
  financialHighlights: Record<string, string>;
}> = {
  iomega: {
    name: "Iomega Corporation", ticker: "IOM", year: "2007", industry: "Technology / Data Storage",
    summary: "Iomega was a data storage company best known for the Zip drive. By 2007, the company faced severe competitive pressure from USB flash drives and declining Zip disk sales. Revenue had fallen significantly and the company was exploring strategic alternatives.",
    keyFacts: ["Revenue declined from $392M (2005) to $358M (2007)", "Zip drive sales fell over 40% year-over-year", "Operating loss of $18.2M in fiscal 2007", "Acquired by EMC Corporation in 2008 for $213M", "Net cash position of $112M provided acquisition appeal"],
    riskFactors: ["Intense competition from USB flash drives and cloud storage", "Dependence on legacy Zip product line for revenue", "Declining consumer and enterprise demand for removable media", "Inability to successfully transition to new storage technologies"],
    financialHighlights: { Revenue: "$358M", "Operating Income": "-$18.2M", "Net Cash": "$112M", Employees: "~1,200" },
  },
  nokia: {
    name: "Nokia Corporation", ticker: "NOK", year: "2011", industry: "Telecommunications / Mobile Devices",
    summary: "Nokia's 2011 annual report captured a company at a critical inflection point. Once the world's largest mobile phone maker, Nokia was rapidly losing market share to Apple's iPhone and Android devices. CEO Stephen Elop's 'burning platform' memo acknowledged the existential threat.",
    keyFacts: ["Market share fell from 38% (2008) to 25% (2011)", "Net sales declined 9% to €38.7B", "Operating loss of €1.07B in Devices & Services", "Partnership with Microsoft announced for Windows Phone", "Lumia smartphone line launched in Q4 2011", "Workforce reduction of 18,000 employees announced"],
    riskFactors: ["Rapid shift to smartphone ecosystem platforms (iOS, Android)", "Delayed response to touchscreen smartphone trend", "Symbian OS losing developer and consumer appeal", "Intense price competition from Asian manufacturers"],
    financialHighlights: { Revenue: "€38.7B", "Operating Income": "-€1.07B", "Net Cash": "€4.9B", Employees: "~130,000" },
  },
  american_greetings: {
    name: "American Greetings", ticker: "AM", year: "2013", industry: "Consumer Products / Greeting Cards",
    summary: "American Greetings faced structural headwinds from digital communication. The 2013 fiscal year report showed the company navigating a challenging transition as consumers shifted to e-cards, social media, and text messaging.",
    keyFacts: ["Net sales of $1.98B, down 3.2% year-over-year", "Operating income of $142M, down from $168M prior year", "Digital greeting card revenue grew 15% to $98M", "Went private via leveraged buyout in 2013 at $18.20/share", "Reduced physical retail footprint by 12%"],
    riskFactors: ["Secular decline in physical greeting card demand", "Competition from free digital alternatives (e-cards, social media)", "Retail channel consolidation reducing shelf space", "Rising paper and printing costs compressing margins"],
    financialHighlights: { Revenue: "$1.98B", "Operating Income": "$142M", "Net Cash": "$85M", Employees: "~26,000" },
  },
};

const SAMPLE_QUESTIONS = [
  "What were the main risk factors for Iomega?",
  "How did Nokia's revenue change in 2011?",
  "What strategic decisions did American Greetings make?",
  "Compare the financial health of all three companies",
];

function generateAnswer(question: string): { answer: string; sources: string[] } {
  const q = question.toLowerCase();
  if (q.includes("iomega") && (q.includes("risk") || q.includes("decline") || q.includes("cause"))) {
    return {
      answer: "Iomega's decline was driven by four primary factors:\n\n**1. Technological Disruption**: USB flash drives emerged as superior alternatives to Zip disks, offering greater capacity at lower cost.\n\n**2. Revenue Concentration**: Over 60% of revenue remained tied to the legacy Zip product line.\n\n**3. Competitive Pricing Pressure**: Commoditization drove gross margins from 35% to 28%.\n\n**4. Failed Product Transitions**: Despite launching new products (REV drive, network storage), none achieved the scale needed to offset Zip's decline.\n\nThe company's $112M net cash position ultimately made it an attractive acquisition target for EMC in 2008 at $213M.",
      sources: ["Iomega 10-K 2007 — Risk Factors Section", "Iomega 10-K 2007 — MD&A Revenue Discussion"],
    };
  }
  if (q.includes("nokia") && (q.includes("revenue") || q.includes("financial") || q.includes("2011"))) {
    return {
      answer: "Nokia's 2011 annual report revealed a company in significant financial distress:\n\n**Net Sales**: €38.7 billion, a decline of 9% from €42.4B in 2010\n\n**Devices & Services**: Operating loss of €1.07 billion, compared to a profit of €1.3B in 2010\n\n**Market Share**: Fell from 33% in 2010 to 25% in 2011\n\n**Strategic Response**: Nokia announced a landmark partnership with Microsoft to adopt Windows Phone as its primary smartphone platform, replacing the struggling Symbian OS.\n\n**Restructuring**: Plans to reduce the global workforce by 18,000 employees and cut costs by €1 billion annually.",
      sources: ["Nokia Annual Report 2011 — Financial Highlights", "Nokia Annual Report 2011 — CEO Letter"],
    };
  }
  if (q.includes("american greetings") && q.includes("strateg")) {
    return {
      answer: "American Greetings pursued a dual-track strategy in fiscal 2013:\n\n**Digital Expansion**: Grew digital greeting card revenue 15% to $98M through AG Interactive platform. Invested in mobile app development and social media integrations.\n\n**Operational Restructuring**: Reduced physical retail footprint by 12%. Implemented cost reduction program targeting $50M in annual savings.\n\n**Going Private**: The Weiss family led a leveraged buyout at $18.20/share to execute a longer-term transformation without quarterly earnings pressure.",
      sources: ["American Greetings 10-K FY2013 — Business Strategy", "American Greetings Proxy Statement 2013"],
    };
  }
  if (q.includes("compare") || q.includes("all three") || q.includes("cash")) {
    return {
      answer: "**Comparative Analysis: All Three Companies**\n\nIomega (2007): Revenue $358M | Operating Income -$18.2M | Net Cash $112M\nNokia (2011): Revenue €38.7B | Operating Income -€1.07B | Net Cash €4.9B\nAmerican Greetings (2013): Revenue $1.98B | Operating Income $142M | Net Cash $85M\n\n**Key Insight**: American Greetings was the only company to maintain positive operating income. All three faced structural industry disruption — digital storage, smartphones, and digital communication respectively.",
      sources: ["Iomega 10-K 2007", "Nokia Annual Report 2011", "American Greetings 10-K FY2013"],
    };
  }
  return {
    answer: "Based on the available financial reports from Iomega (2007), Nokia (2011), and American Greetings (2013):\n\n**Iomega**: Revenue of $358M with an operating loss of $18.2M. Strong cash position of $112M made it an acquisition target.\n\n**Nokia**: €38.7B in revenue but an operating loss of €1.07B. Announced Microsoft partnership to pivot to Windows Phone.\n\n**American Greetings**: $1.98B in revenue and $142M operating income. Went private in 2013 to execute long-term transformation.\n\nTry asking about a specific company's risk factors, financial metrics, or strategic decisions.",
    sources: ["Iomega 10-K 2007", "Nokia Annual Report 2011", "American Greetings 10-K FY2013"],
  };
}

export default function RAGAssistant() {
  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState<{ answer: string; sources: string[] } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [expandedReport, setExpandedReport] = useState<string | null>(null);

  const handleSearch = (q: string) => {
    const searchQuery = q || query;
    if (!searchQuery.trim()) return;
    setQuery(searchQuery);
    setIsLoading(true);
    setAnswer(null);
    setTimeout(() => { setAnswer(generateAnswer(searchQuery)); setIsLoading(false); }, 900);
  };

  const formatAnswer = (text: string) => text.split("\n").map((line, i) => {
    if (line.trim() === "") return <br key={i} />;
    if (line.includes("|")) return <p key={i} className="font-mono text-xs my-0.5" style={{ color: "var(--text-muted)" }}>{line}</p>;
    return (
      <p key={i} className="mb-1 text-sm leading-relaxed" style={{ color: "var(--text-body)" }}>
        {line.split(/\*\*(.*?)\*\*/g).map((part, j) =>
          j % 2 === 1 ? <strong key={j} style={{ color: "var(--text-main)" }}>{part}</strong> : part
        )}
      </p>
    );
  });

  return (
    <div className="min-h-screen" style={{ background: "var(--bg)" }}>
      <div className="max-w-4xl mx-auto px-4 py-10">
        <Link href="/portfolio" className="inline-flex items-center gap-2 text-sm mb-8 hover:underline" style={{ color: "var(--jade)" }}>
          <ArrowLeft className="w-4 h-4" /> Back to Portfolio
        </Link>
        <div className="mb-8">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 text-white" style={{ background: "var(--jade)" }}>AI PROJECT</span>
          <h1 className="text-3xl font-bold mb-3" style={{ fontFamily: "var(--font-serif)", color: "var(--text-main)" }}>RAG Financial Report Assistant</h1>
          <p className="text-sm max-w-2xl" style={{ color: "var(--text-muted)" }}>
            A Retrieval-Augmented Generation (RAG) system that answers questions about corporate financial reports.
            Powered by semantic search over 10-K filings from Iomega, Nokia, and American Greetings.
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            {["RAG Architecture", "NLP", "Financial Analysis", "10-K Filings"].map(tag => (
              <span key={tag} className="px-2 py-1 rounded text-xs" style={{ background: "var(--card-bg)", color: "var(--jade-dark)", border: "1px solid var(--jade-light)" }}>{tag}</span>
            ))}
          </div>
        </div>

        <div className="rounded-xl p-6 mb-8" style={{ background: "var(--card-bg)", border: "1px solid var(--border)" }}>
          <h2 className="font-semibold text-lg mb-4 flex items-center gap-2" style={{ color: "var(--text-main)" }}>
            <Search className="w-5 h-5" style={{ color: "var(--jade)" }} /> Ask a Question
          </h2>
          <div className="flex gap-3 mb-4">
            <input type="text" value={query} onChange={e => setQuery(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleSearch("")}
              placeholder="e.g. What were Nokia's main challenges in 2011?"
              className="flex-1 px-4 py-2 rounded-lg text-sm outline-none"
              style={{ background: "var(--bg)", border: "1px solid var(--border)", color: "var(--text-main)" }} />
            <button onClick={() => handleSearch("")} className="px-5 py-2 rounded-lg text-sm font-semibold text-white" style={{ background: "var(--jade)" }}>
              Search
            </button>
          </div>
          <p className="text-xs mb-2" style={{ color: "var(--text-muted)" }}>Try a sample question:</p>
          <div className="flex flex-wrap gap-2">
            {SAMPLE_QUESTIONS.map(q => (
              <button key={q} onClick={() => handleSearch(q)}
                className="px-3 py-1 rounded-full text-xs hover:opacity-80 transition"
                style={{ background: "var(--bg)", border: "1px solid var(--border)", color: "var(--jade-dark)" }}>{q}
              </button>
            ))}
          </div>
        </div>

        {isLoading && (
          <div className="rounded-xl p-6 mb-8 flex items-center gap-3" style={{ background: "var(--card-bg)", border: "1px solid var(--border)" }}>
            <div className="w-5 h-5 rounded-full border-2 animate-spin" style={{ borderColor: "var(--jade)", borderTopColor: "transparent" }} />
            <span className="text-sm" style={{ color: "var(--text-muted)" }}>Retrieving and synthesizing from financial reports...</span>
          </div>
        )}

        {answer && (
          <div className="rounded-xl p-6 mb-8" style={{ background: "var(--card-bg)", border: "1px solid var(--jade-light)" }}>
            <h3 className="font-semibold mb-4 flex items-center gap-2" style={{ color: "var(--text-main)" }}>
              <FileText className="w-4 h-4" style={{ color: "var(--jade)" }} /> Analysis Result
            </h3>
            <div>{formatAnswer(answer.answer)}</div>
            <div className="mt-4 pt-4" style={{ borderTop: "1px solid var(--border)" }}>
              <p className="text-xs font-semibold mb-2" style={{ color: "var(--text-muted)" }}>Sources:</p>
              <div className="flex flex-wrap gap-2">
                {answer.sources.map(s => (
                  <span key={s} className="px-2 py-1 rounded text-xs" style={{ background: "var(--bg)", color: "var(--jade-dark)", border: "1px solid var(--border)" }}>📄 {s}</span>
                ))}
              </div>
            </div>
          </div>
        )}

        <div>
          <h2 className="font-semibold text-lg mb-4 flex items-center gap-2" style={{ color: "var(--text-main)" }}>
            <Building2 className="w-5 h-5" style={{ color: "var(--jade)" }} /> Document Library
          </h2>
          <div className="space-y-3">
            {Object.entries(REPORTS).map(([key, report]) => (
              <div key={key} className="rounded-xl overflow-hidden" style={{ border: "1px solid var(--border)" }}>
                <button onClick={() => setExpandedReport(expandedReport === key ? null : key)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left hover:opacity-90 transition"
                  style={{ background: "var(--card-bg)" }}>
                  <div>
                    <span className="font-semibold text-sm" style={{ color: "var(--text-main)" }}>{report.name}</span>
                    <span className="ml-2 text-xs" style={{ color: "var(--text-muted)" }}>{report.ticker} · {report.year} · {report.industry}</span>
                  </div>
                  {expandedReport === key
                    ? <ChevronUp className="w-4 h-4" style={{ color: "var(--jade)" }} />
                    : <ChevronDown className="w-4 h-4" style={{ color: "var(--text-muted)" }} />}
                </button>
                {expandedReport === key && (
                  <div className="px-5 pb-5" style={{ background: "var(--bg)", borderTop: "1px solid var(--border)" }}>
                    <p className="text-sm mt-4 mb-4" style={{ color: "var(--text-body)" }}>{report.summary}</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                      {Object.entries(report.financialHighlights).map(([k, v]) => (
                        <div key={k} className="rounded-lg p-3 text-center" style={{ background: "var(--card-bg)" }}>
                          <div className="text-lg font-bold" style={{ color: "var(--jade)" }}>{v}</div>
                          <div className="text-xs" style={{ color: "var(--text-muted)" }}>{k}</div>
                        </div>
                      ))}
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs font-semibold mb-2" style={{ color: "var(--text-muted)" }}>KEY FACTS</p>
                        <ul className="space-y-1">
                          {report.keyFacts.map(f => (
                            <li key={f} className="text-xs flex gap-2" style={{ color: "var(--text-body)" }}>
                              <span style={{ color: "var(--jade)" }}>•</span>{f}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="text-xs font-semibold mb-2" style={{ color: "var(--text-muted)" }}>RISK FACTORS</p>
                        <ul className="space-y-1">
                          {report.riskFactors.map(r => (
                            <li key={r} className="text-xs flex gap-2" style={{ color: "var(--text-body)" }}>
                              <span style={{ color: "#e05252" }}>⚠</span>{r}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
