import React, { useState } from 'react';
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

  return (
    <div className="min-h-screen bg-light-background overflow-y-auto scrollbar-hide">
      <div className="max-w-md mx-auto p-2">
        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-4">
            <button
              className={`text-lg font-bold ${currentView === 'friends' ? 'text-light-text' : 'text-light-secondary'}`}
              onClick={() => setCurrentView('friends')}
            >
              Friends
            </button>
            <button
              className={`text-lg font-bold ${currentView === 'me' ? 'text-light-text' : 'text-light-secondary'}`}
              onClick={() => setCurrentView('me')}
            >
              Me
            </button>
          </div>
          <Button 
            size="icon" 
            variant="ghost" 
            onClick={() => setIsInviteOpen(true)}
            className="hover:bg-light-accent/10 p-1.5"
          >
            <Plus className="h-6 w-6 text-light-primary" />
          </Button>
        </div>

        {currentView === 'friends' ? <Friends /> : <Me />}
      </div>
      <InviteFriends isOpen={isInviteOpen} onClose={() => setIsInviteOpen(false)} />
      <BottomNavBar activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default Index;