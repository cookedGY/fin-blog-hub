import { useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, Brain, CheckCircle, XCircle, AlertCircle } from "lucide-react";

const QUESTIONS = [
  {
    id: 1, question: "What is the primary risk factor for a company with 60% revenue concentration in a single declining product?", category: "Risk Analysis",
    responses: [
      { model: "GPT-4", answer: "The primary risk is business model obsolescence. When a single product generates 60% of revenue and is in structural decline, the company faces existential risk unless it can successfully pivot to new revenue streams. This is compounded by the difficulty of reallocating R&D and sales resources mid-decline.", accuracy: 95, hallucination: 2, reasoning: 92 },
      { model: "Claude 3", answer: "Revenue concentration risk is the main concern. A 60% dependency on a declining product creates a revenue cliff effect. As the product declines, fixed costs remain, compressing margins. The company must either find replacement revenue quickly or face insolvency.", accuracy: 90, hallucination: 5, reasoning: 88 },
      { model: "Gemini Pro", answer: "The main risk is cash flow disruption. With 60% of revenue declining, the company will see significant cash flow reduction within 2-3 years. This limits investment capacity for new products and may trigger debt covenant violations if leveraged.", accuracy: 82, hallucination: 8, reasoning: 80 },
    ],
  },
  {
    id: 2, question: "How does platform risk differ from product risk in technology companies?", category: "Technology Strategy",
    responses: [
      { model: "GPT-4", answer: "Platform risk is fundamentally more severe than product risk. A product failure affects one revenue stream, but platform failure (like Nokia's Symbian) creates an ecosystem collapse — developers leave, users follow, and the entire product portfolio becomes uncompetitive simultaneously.", accuracy: 97, hallucination: 1, reasoning: 95 },
      { model: "Claude 3", answer: "Platform risk involves ecosystem dependencies that product risk does not. When a platform fails, third-party developers and enterprise customers must migrate their entire workflows, creating massive switching costs that paradoxically lock them into the failing platform longer, then cause rapid mass exodus once a tipping point is reached.", accuracy: 93, hallucination: 3, reasoning: 91 },
      { model: "Gemini Pro", answer: "Platform risk affects the entire technology stack while product risk is isolated. Nokia's Symbian failure is a classic example — when the platform became uncompetitive, all Nokia devices became uncompetitive regardless of hardware quality.", accuracy: 88, hallucination: 6, reasoning: 85 },
    ],
  },
  {
    id: 3, question: "What financial metrics best predict corporate distress 12-18 months in advance?", category: "Financial Forecasting",
    responses: [
      { model: "GPT-4", answer: "The Altman Z-Score components are most predictive: working capital/total assets, retained earnings/total assets, EBIT/total assets, market cap/total liabilities, and revenue/total assets. Additionally, cash conversion cycle deterioration and days sales outstanding increases often precede formal distress by 12-18 months.", accuracy: 94, hallucination: 3, reasoning: 93 },
      { model: "Claude 3", answer: "Cash flow metrics are the strongest leading indicators. Specifically: free cash flow to debt ratio declining below 0.1x, interest coverage ratio below 2x, and gross margin compression exceeding 300bps year-over-year. These metrics tend to deteriorate 12-18 months before covenant violations or credit rating downgrades.", accuracy: 91, hallucination: 4, reasoning: 89 },
      { model: "Gemini Pro", answer: "Revenue growth deceleration combined with margin compression is the most reliable predictor. When revenue growth turns negative while gross margins compress simultaneously, it indicates both demand-side and supply-side problems — a combination that typically leads to distress within 18 months.", accuracy: 85, hallucination: 10, reasoning: 82 },
    ],
  },
];

function ScoreBar({ value, color }: { value: number; color: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 rounded-full h-2" style={{ background: "var(--border)" }}>
        <div className="h-2 rounded-full" style={{ width: `${value}%`, background: color }} />
      </div>
      <span className="text-xs font-bold w-8 text-right" style={{ color }}>{value}</span>
    </div>
  );
}

export default function LLMEvaluation() {
  const [selectedQ, setSelectedQ] = useState(0);
  const question = QUESTIONS[selectedQ];
  const avgScores = question.responses.map(r => ({ model: r.model, avg: Math.round((r.accuracy + (100 - r.hallucination) + r.reasoning) / 3) })).sort((a, b) => b.avg - a.avg);

  return (
    <div className="min-h-screen" style={{ background: "var(--bg)" }}>
      <div className="max-w-4xl mx-auto px-4 py-10">
        <Link href="/portfolio" className="inline-flex items-center gap-2 text-sm mb-8 hover:underline" style={{ color: "var(--jade)" }}>
          <ArrowLeft className="w-4 h-4" /> Back to Portfolio
        </Link>
        <div className="mb-8">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 text-white" style={{ background: "var(--jade)" }}>AI PROJECT</span>
          <h1 className="text-3xl font-bold mb-3" style={{ fontFamily: "var(--font-serif)", color: "var(--text-main)" }}>LLM Evaluation Dashboard</h1>
          <p className="text-sm max-w-2xl" style={{ color: "var(--text-muted)" }}>An evaluation framework for scoring LLM responses to finance and strategy questions. Measures accuracy, hallucination risk, and reasoning quality across GPT-4, Claude 3, and Gemini Pro.</p>
          <div className="flex flex-wrap gap-2 mt-4">
            {["LLM Evaluation", "AI Governance", "Finance QA", "Hallucination Detection"].map(tag => (
              <span key={tag} className="px-2 py-1 rounded text-xs" style={{ background: "var(--card-bg)", color: "var(--jade-dark)", border: "1px solid var(--jade-light)" }}>{tag}</span>
            ))}
          </div>
        </div>
        <div className="rounded-xl p-5 mb-6" style={{ background: "var(--card-bg)", border: "1px solid var(--border)" }}>
          <p className="text-xs font-semibold mb-3" style={{ color: "var(--text-muted)" }}>SELECT EVALUATION QUESTION</p>
          <div className="space-y-2">
            {QUESTIONS.map((q, i) => (
              <button key={q.id} onClick={() => setSelectedQ(i)} className="w-full text-left px-4 py-3 rounded-lg text-sm transition"
                style={{ background: selectedQ === i ? "var(--jade)" : "var(--bg)", color: selectedQ === i ? "#fff" : "var(--text-main)", border: `1px solid ${selectedQ === i ? "var(--jade)" : "var(--border)"}` }}>
                <span className="text-xs font-semibold opacity-70 mr-2">[{q.category}]</span>{q.question}
              </button>
            ))}
          </div>
        </div>
        <div className="rounded-xl p-5 mb-6" style={{ background: "var(--card-bg)", border: "1px solid var(--border)" }}>
          <h3 className="font-semibold mb-3 flex items-center gap-2" style={{ color: "var(--text-main)" }}>
            <Brain className="w-4 h-4" style={{ color: "var(--jade)" }} /> Model Leaderboard
          </h3>
          <div className="flex gap-4">
            {avgScores.map((s, i) => (
              <div key={s.model} className="flex-1 rounded-lg p-3 text-center" style={{ background: "var(--bg)", border: `2px solid ${i === 0 ? "var(--jade)" : "var(--border)"}` }}>
                <div className="text-xs mb-1" style={{ color: "var(--text-muted)" }}>{i === 0 ? "🥇" : i === 1 ? "🥈" : "🥉"} {s.model}</div>
                <div className="text-2xl font-bold" style={{ color: i === 0 ? "var(--jade)" : "var(--text-main)" }}>{s.avg}</div>
                <div className="text-xs" style={{ color: "var(--text-muted)" }}>avg score</div>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          {question.responses.map(response => (
            <div key={response.model} className="rounded-xl p-5" style={{ background: "var(--card-bg)", border: "1px solid var(--border)" }}>
              <div className="flex items-center justify-between mb-3">
                <span className="font-semibold" style={{ color: "var(--text-main)" }}>{response.model}</span>
                <div className="flex items-center gap-2">
                  {response.hallucination <= 3 ? <CheckCircle className="w-4 h-4" style={{ color: "#16a34a" }} /> : response.hallucination <= 7 ? <AlertCircle className="w-4 h-4" style={{ color: "#d97706" }} /> : <XCircle className="w-4 h-4" style={{ color: "#dc2626" }} />}
                  <span className="text-xs" style={{ color: "var(--text-muted)" }}>{response.hallucination <= 3 ? "Low hallucination" : response.hallucination <= 7 ? "Moderate risk" : "High risk"}</span>
                </div>
              </div>
              <p className="text-sm mb-4 leading-relaxed" style={{ color: "var(--text-body)" }}>{response.answer}</p>
              <div className="grid grid-cols-3 gap-4 pt-3" style={{ borderTop: "1px solid var(--border)" }}>
                <div><p className="text-xs mb-1" style={{ color: "var(--text-muted)" }}>Accuracy</p><ScoreBar value={response.accuracy} color="#16a34a" /></div>
                <div><p className="text-xs mb-1" style={{ color: "var(--text-muted)" }}>Hallucination Risk</p><ScoreBar value={response.hallucination} color="#dc2626" /></div>
                <div><p className="text-xs mb-1" style={{ color: "var(--text-muted)" }}>Reasoning</p><ScoreBar value={response.reasoning} color="var(--jade)" /></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
