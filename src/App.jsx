import React, { useState, useEffect } from "react";
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
import LoginModal from "./components/LoginModal";
import SplashScreen from "./components/SplashScreen";
import { AnimatePresence } from "framer-motion";

const queryClient = new QueryClient();

const App = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <SupabaseAuthProvider>
            <TooltipProvider>
              <Toaster position="top-center" />
              <AnimatePresence>
                {showSplash && <SplashScreen />}
              </AnimatePresence>
              <BrowserRouter>
                <Routes>
                  {navItems.map(({ to, page }) => (
                    <Route key={to} path={to} element={React.cloneElement(page, { openLoginModal })} />
                  ))}
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/board" element={<Board openLoginModal={openLoginModal} />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/notifications" element={<Notifications />} />
                  <Route path="/group/:groupId" element={<GroupDetails />} />
                </Routes>
              </BrowserRouter>
              <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
            </TooltipProvider>
          </SupabaseAuthProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;