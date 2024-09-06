import React, { useState, useEffect } from 'react';
import InviteFriends from '../components/InviteFriends';
import BottomNavBar from '../components/BottomNavBar';
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Friends from './Friends';
import Me from './Me';

const Index = () => {
  const [activeTab, setActiveTab] = useState('community');
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [currentView, setCurrentView] = useState('friends');

  useEffect(() => {
    const enterFullScreen = async () => {
      try {
        if (document.documentElement.requestFullscreen) {
          await document.documentElement.requestFullscreen();
        } else if (document.documentElement.webkitRequestFullscreen) { // iOS Safari
          await document.documentElement.webkitRequestFullscreen();
        }
      } catch (err) {
        console.error("Error attempting to enable full-screen mode:", err);
      }
    };

    enterFullScreen();

    // Add event listener for orientation changes
    window.addEventListener('orientationchange', enterFullScreen);

    // Cleanup
    return () => {
      window.removeEventListener('orientationchange', enterFullScreen);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <div 
        className="flex-grow overflow-y-auto pb-20 px-4"
        style={{
          paddingTop: 'env(safe-area-inset-top)',
          height: '100vh',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      >
        <div className="max-w-md mx-auto pt-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex space-x-4">
              <button
                className={`text-lg font-bold ${currentView === 'friends' ? 'text-white' : 'text-gray-400'}`}
                onClick={() => setCurrentView('friends')}
              >
                Friends
              </button>
              <button
                className={`text-lg font-bold ${currentView === 'me' ? 'text-white' : 'text-gray-400'}`}
                onClick={() => setCurrentView('me')}
              >
                Me
              </button>
            </div>
            <Button 
              size="icon" 
              variant="ghost" 
              onClick={() => setIsInviteOpen(true)}
              className="hover:bg-transparent p-1.5"
            >
              <Plus className="h-6 w-6 text-white" />
            </Button>
          </div>

          {currentView === 'friends' ? <Friends /> : <Me />}
        </div>
      </div>
      <InviteFriends isOpen={isInviteOpen} onClose={() => setIsInviteOpen(false)} />
      <BottomNavBar activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default Index;