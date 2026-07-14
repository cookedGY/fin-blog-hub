import { Link } from "wouter";
import { ArrowLeft, Activity, Clock, DollarSign, CheckCircle, XCircle } from "lucide-react";

const WORKFLOWS = [
  {
    name: "Financial Report RAG Pipeline", status: "Healthy", runs: 142, successRate: 96.5, avgDuration: "3.2s", costPerRun: "$0.018",
    steps: [
      { name: "Document Retrieval", duration: "0.4s", status: "ok", tokens: 0 },
      { name: "Semantic Chunking", duration: "0.3s", status: "ok", tokens: 0 },
      { name: "Context Assembly", duration: "0.2s", status: "ok", tokens: 1200 },
      { name: "LLM Inference", duration: "1.8s", status: "ok", tokens: 2400 },
      { name: "Response Validation", duration: "0.3s", status: "ok", tokens: 0 },
      { name: "Source Attribution", duration: "0.2s", status: "ok", tokens: 0 },
    ],
  },
  {
    name: "Anomaly Detection Batch Job", status: "Degraded", runs: 58, successRate: 87.9, avgDuration: "8.7s", costPerRun: "$0.042",
    steps: [
      { name: "Data Ingestion", duration: "1.2s", status: "ok", tokens: 0 },
      { name: "Signal Extraction", duration: "2.1s", status: "ok", tokens: 0 },
      { name: "Threshold Evaluation", duration: "0.8s", status: "ok", tokens: 0 },
      { name: "LLM Risk Scoring", duration: "3.4s", status: "warning", tokens: 3800 },
      { name: "Report Generation", duration: "1.0s", status: "warning", tokens: 1600 },
      { name: "Alert Dispatch", duration: "0.2s", status: "ok", tokens: 0 },
    ],
  },
  {
    name: "LLM Evaluation Suite", status: "Healthy", runs: 89, successRate: 98.9, avgDuration: "12.4s", costPerRun: "$0.087",
    steps: [
      { name: "Question Loading", duration: "0.1s", status: "ok", tokens: 0 },
      { name: "Multi-Model Inference", duration: "8.2s", status: "ok", tokens: 9600 },
      { name: "Accuracy Scoring", duration: "1.4s", status: "ok", tokens: 1200 },
      { name: "Hallucination Check", duration: "1.8s", status: "ok", tokens: 2400 },
      { name: "Score Aggregation", duration: "0.5s", status: "ok", tokens: 0 },
      { name: "Dashboard Update", duration: "0.4s", status: "ok", tokens: 0 },
    ],
  },
];

const STATUS_STYLES: Record<string, { color: string; bg: string }> = {
  Healthy: { color: "#16a34a", bg: "#f0fdf4" },
  Degraded: { color: "#d97706", bg: "#fffbeb" },
  Down: { color: "#c0392b", bg: "#fef2f2" },
};

const STEP_STYLES: Record<string, { color: string }> = {
  ok: { color: "#16a34a" },
  warning: { color: "#d97706" },
  error: { color: "#c0392b" },
};

export default function WorkflowObservability() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg)" }}>
      <div className="max-w-4xl mx-auto px-4 py-10">
        <Link href="/portfolio" className="inline-flex items-center gap-2 text-sm mb-8 hover:underline" style={{ color: "var(--jade)" }}>
          <ArrowLeft className="w-4 h-4" /> Back to Portfolio
        </Link>
        <div className="mb-8">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 text-white" style={{ background: "var(--jade)" }}>AI PROJECT</span>
          <h1 className="text-3xl font-bold mb-3" style={{ fontFamily: "var(--font-serif)", color: "var(--text-main)" }}>AI Workflow Observability Dashboard</h1>
          <p className="text-sm max-w-2xl" style={{ color: "var(--text-muted)" }}>A monitoring dashboard for AI pipeline workflows. Tracks step-level execution metrics, token consumption, cost per run, and success rates across financial analysis pipelines.</p>
          <div className="flex flex-wrap gap-2 mt-4">
            {["MLOps", "Pipeline Monitoring", "Cost Optimization", "Observability"].map(tag => (
              <span key={tag} className="px-2 py-1 rounded text-xs" style={{ background: "var(--card-bg)", color: "var(--jade-dark)", border: "1px solid var(--jade-light)" }}>{tag}</span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Runs", value: "289", icon: <Activity className="w-4 h-4" />, color: "var(--jade)" },
            { label: "Avg Success Rate", value: "94.4%", icon: <CheckCircle className="w-4 h-4" />, color: "#16a34a" },
            { label: "Avg Latency", value: "8.1s", icon: <Clock className="w-4 h-4" />, color: "var(--jade)" },
            { label: "Total Cost", value: "$12.40", icon: <DollarSign className="w-4 h-4" />, color: "#2563eb" },
          ].map(s => (
            <div key={s.label} className="rounded-xl p-4" style={{ background: "var(--card-bg)", border: "1px solid var(--border)" }}>
              <div className="flex items-center gap-2 mb-2" style={{ color: s.color }}>{s.icon}<span className="text-xs font-semibold" style={{ color: "var(--text-muted)" }}>{s.label}</span></div>
              <div className="text-2xl font-bold" style={{ color: s.color }}>{s.value}</div>
            </div>
          ))}
        </div>

        <div className="space-y-6">
          {WORKFLOWS.map(workflow => {
            const statusStyle = STATUS_STYLES[workflow.status];
            return (
              <div key={workflow.name} className="rounded-xl overflow-hidden" style={{ border: "1px solid var(--border)" }}>
                <div className="px-5 py-4 flex items-center justify-between" style={{ background: "var(--card-bg)" }}>
                  <div>
                    <h3 className="font-semibold" style={{ color: "var(--text-main)" }}>{workflow.name}</h3>
                    <div className="flex items-center gap-4 mt-1 flex-wrap">
                      <span className="text-xs" style={{ color: "var(--text-muted)" }}>{workflow.runs} runs</span>
                      <span className="text-xs" style={{ color: "var(--text-muted)" }}>Success: {workflow.successRate}%</span>
                      <span className="text-xs" style={{ color: "var(--text-muted)" }}>Avg: {workflow.avgDuration}</span>
                      <span className="text-xs" style={{ color: "var(--text-muted)" }}>Cost/run: {workflow.costPerRun}</span>
                    </div>
                  </div>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ background: statusStyle.bg, color: statusStyle.color }}>{workflow.status}</span>
                </div>
                <div className="px-5 py-4" style={{ background: "var(--bg)" }}>
                  <p className="text-xs font-semibold mb-3" style={{ color: "var(--text-muted)" }}>PIPELINE STEPS</p>
                  <div className="space-y-2">
                    {workflow.steps.map((step, i) => {
                      const stepStyle = STEP_STYLES[step.status];
                      return (
                        <div key={step.name} className="flex items-center gap-3">
                          <span className="text-xs w-4 text-center" style={{ color: "var(--text-muted)" }}>{i + 1}</span>
                          {step.status === "ok"
                            ? <CheckCircle className="w-3.5 h-3.5 shrink-0" style={{ color: stepStyle.color }} />
                            : <XCircle className="w-3.5 h-3.5 shrink-0" style={{ color: stepStyle.color }} />}
                          <span className="flex-1 text-xs" style={{ color: "var(--text-body)" }}>{step.name}</span>
                          <span className="text-xs font-mono" style={{ color: "var(--text-muted)" }}>{step.duration}</span>
                          {step.tokens > 0 && <span className="text-xs px-2 py-0.5 rounded" style={{ background: "var(--card-bg)", color: "var(--jade-dark)" }}>{step.tokens.toLocaleString()} tokens</span>}
                        </div>
                      );
                    })}
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
