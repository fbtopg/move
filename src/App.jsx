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

const queryClient = new QueryClient();

const App = () => (
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
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;