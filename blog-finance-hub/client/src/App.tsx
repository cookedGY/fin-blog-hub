import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import BlogPost from "./pages/BlogPost";
import Projects from "./pages/Projects";
import FileManager from "./pages/FileManager";
import Portfolio from "./pages/Portfolio";
import Speaking from "./pages/Speaking";
import Contact from "./pages/Contact";
import RAGAssistant from "./pages/projects/RAGAssistant";
import AnomalyDetection from "./pages/projects/AnomalyDetection";
import LLMEvaluation from "./pages/projects/LLMEvaluation";
import RiskTracker from "./pages/projects/RiskTracker";
import WorkflowObservability from "./pages/projects/WorkflowObservability";
function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/projects" component={Projects} />
      <Route path="/portfolio" component={Portfolio} />
      <Route path="/speaking" component={Speaking} />
      <Route path="/contact" component={Contact} />
      <Route path="/files" component={FileManager} />
      <Route path="/post/:slug" component={BlogPost} />
      <Route path="/projects/rag" component={RAGAssistant} />
      <Route path="/projects/anomaly" component={AnomalyDetection} />
      <Route path="/projects/llm-evaluation" component={LLMEvaluation} />
      <Route path="/projects/risk-tracker" component={RiskTracker} />
      <Route path="/projects/workflow-observability" component={WorkflowObservability} />
      <Route path="/404" component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
