/*
 * STYLE REMINDER — Editorial Lab Notebook:
 * the app is a focused one-page workbook, not a generic dashboard;
 * keep the reading canvas, six-step sequence, and visible completion marks.
 */
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import Roadmap from "@/pages/Roadmap";
import Review from "@/pages/Review";
import QuizLab from "@/pages/QuizLab";
import { Route, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";

declare global {
  interface Window {
    __COMET_PREVIEW_PATH__?: string;
  }
}

function Router() {
  const [location] = useLocation();
  const previewLocation = typeof window !== "undefined" ? window.__COMET_PREVIEW_PATH__ : undefined;

  return (
    <Switch location={previewLocation ?? location}>
      <Route path="/" component={Roadmap} />
      <Route path="/lo-trinh" component={Roadmap} />
      <Route path="/ngay/:day.html" component={Home} />
      <Route path="/on-tap" component={Review} />
      <Route path="/quiz-lab" component={QuizLab} />
      <Route path="/tong-ket" component={Dashboard} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
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
