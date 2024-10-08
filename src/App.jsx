import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import RecentActivity from "./pages/RecentActivity";
import SplashScreen from "./components/SplashScreen";
import Settings from "./pages/Settings";

const queryClient = new QueryClient();

const App = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Preload the main app content
    const preloadContent = async () => {
      // You can add any necessary preloading logic here
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulating content load
    };

    preloadContent();
  }, []);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        {showSplash ? (
          <SplashScreen onAnimationComplete={handleSplashComplete} />
        ) : (
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
              <Route path="/recent-activity" element={<RecentActivity />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </BrowserRouter>
        )}
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;