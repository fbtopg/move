import React from "react";
import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from 'next-themes';
import { SupabaseAuthProvider } from './integrations/supabase/auth';
import { navItems } from "./nav-items";
import Profile from "./pages/Profile";
import Board from "./pages/Board";
import Settings from "./pages/Settings";
import Notifications from "./pages/Notifications";
import GroupDetails from "./pages/GroupDetails";
import Login from "./pages/Login";

const queryClient = new QueryClient();

const App = () => {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SupabaseAuthProvider>
            <TooltipProvider>
              <Toaster position="top-center" />
              <BrowserRouter>
                <Routes>
                  {navItems.map(({ to, page }) => (
                    <Route key={to} path={to} element={page} />
                  ))}
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/board" element={<Board />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/notifications" element={<Notifications />} />
                  <Route path="/group/:groupId" element={<GroupDetails />} />
                  <Route path="/login" element={<Login />} />
                </Routes>
              </BrowserRouter>
            </TooltipProvider>
          </SupabaseAuthProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;