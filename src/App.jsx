import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { navItems } from "./nav-items";
import DailyWalkChallenge from "./pages/DailyWalkChallenge";
import DailyQuizChallenge from "./pages/DailyQuizChallenge";
import DailyWalkHistory from "./pages/DailyWalkHistory";
import { useEffect } from "react";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    const toggleFullScreen = () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch((err) => {
          console.log(`Error attempting to enable full-screen mode: ${err.message}`);
        });
      }
    };

    // Add event listener for user interaction
    document.addEventListener('click', toggleFullScreen);

    return () => {
      document.removeEventListener('click', toggleFullScreen);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <Routes>
            {navItems.map(({ to, page }) => (
              <Route key={to} path={to} element={page} />
            ))}
            <Route path="/daily-walk-challenge" element={<DailyWalkChallenge />} />
            <Route path="/daily-quiz-challenge" element={<DailyQuizChallenge />} />
            <Route path="/daily-walk-history" element={<DailyWalkHistory />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;