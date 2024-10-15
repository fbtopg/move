import React, { useState, useEffect } from "react";
import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from 'next-themes';
import { SupabaseAuthProvider } from './integrations/supabase/auth';
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
import Notifications from "./pages/Notifications";
import GroupDetails from "./pages/GroupDetails";
import Login from "./pages/Login";

const queryClient = new QueryClient();

const App = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const preloadContent = async () => {
      await new Promise(resolve => setTimeout(resolve, 2000));
    };

    preloadContent().then(() => {
      setShowSplash(false);
    });
  }, []);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SupabaseAuthProvider>
            <TooltipProvider>
              <Toaster position="top-center" />
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
                    <Route path="/notifications" element={<Notifications />} />
                    <Route path="/group/:groupId" element={<GroupDetails />} />
                    <Route path="/login" element={<Login />} />
                  </Routes>
                </BrowserRouter>
              )}
            </TooltipProvider>
          </SupabaseAuthProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;