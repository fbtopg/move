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
    <div className="min-h-screen bg-black flex flex-col">
      <div className="sticky top-0 bg-black z-10 p-2">
        <div className="max-w-3xl mx-auto flex justify-between items-center">
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
      </div>
      <div className="flex-grow overflow-y-auto scrollbar-hide">
        <div className="max-w-3xl mx-auto p-2">
          {currentView === 'friends' ? <Friends /> : <Me />}
        </div>
      </div>
      <InviteFriends isOpen={isInviteOpen} onClose={() => setIsInviteOpen(false)} />
      <BottomNavBar activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default Index;