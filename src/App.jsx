import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
import Login from "./pages/Login";
import { SupabaseAuthProvider, useSupabaseAuth } from './integrations/supabase/auth';

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }) => {
  const { session, loading } = useSupabaseAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const AppRoutes = () => (
  <Routes>
    <Route path="/login" element={<Login />} />
    {navItems.map(({ to, page }) => (
      <Route key={to} path={to} element={<ProtectedRoute>{page}</ProtectedRoute>} />
    ))}
    <Route path="/daily-walk-challenge" element={<ProtectedRoute><DailyWalkChallenge /></ProtectedRoute>} />
    <Route path="/daily-quiz-challenge" element={<ProtectedRoute><DailyQuizChallenge /></ProtectedRoute>} />
    <Route path="/daily-walk-history" element={<ProtectedRoute><DailyWalkHistory /></ProtectedRoute>} />
    <Route path="/daily-quiz-history" element={<ProtectedRoute><DailyQuizHistory /></ProtectedRoute>} />
    <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
    <Route path="/rewards" element={<ProtectedRoute><Rewards /></ProtectedRoute>} />
    <Route path="/achievements" element={<ProtectedRoute><Achievements /></ProtectedRoute>} />
    <Route path="/follow" element={<ProtectedRoute><Follow /></ProtectedRoute>} />
    <Route path="/walk" element={<ProtectedRoute><Walk /></ProtectedRoute>} />
  </Routes>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <SupabaseAuthProvider>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </SupabaseAuthProvider>
  </QueryClientProvider>
);

export default App;