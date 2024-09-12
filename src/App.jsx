import React, { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { navItems } from "./nav-items";
import DailyWalkChallenge from "./pages/DailyWalkChallenge";
import DailyQuizChallenge from "./pages/DailyQuizChallenge";
import DailyWalkHistory from "./pages/DailyWalkHistory";
import DailyQuizHistory from "./pages/DailyQuizHistory";
import Profile from "./pages/Profile";
import Rewards from "./pages/Rewards";
import Achievements from "./pages/Achievements";
import Follow from "./pages/Follow";
import Walk from "./pages/Walk";
import Board from "./pages/Board";
import { updateStatusBarColor } from './utils/statusBarUtils';

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // Initial update of status bar color
    updateStatusBarColor();

    // Set up a MutationObserver to watch for changes in the body's style
    const observer = new MutationObserver(() => {
      updateStatusBarColor();
    });

    observer.observe(document.body, { attributes: true, attributeFilter: ['style'] });

    // Cleanup function
    return () => observer.disconnect();
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
            <Route path="/daily-quiz-history" element={<DailyQuizHistory />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/rewards" element={<Rewards />} />
            <Route path="/achievements" element={<Achievements />} />
            <Route path="/follow" element={<Follow />} />
            <Route path="/walk" element={<Walk />} />
            <Route path="/board" element={<Board />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;