import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ChevronRight, Plus } from "lucide-react";
import BottomNavBar from '../components/BottomNavBar';
import ChallengeCard from '../components/ChallengeCard';
import GroupButton from '../components/GroupButton';
import ActivitySection from '../components/ActivitySection';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const [activeTab, setActiveTab] = useState('community');
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const navigate = useNavigate();

  const challenges = [
    { type: "Daily Walk", date: "SEPTEMBER 2024", active: "16.5k", progress: "501/16.5K" },
    { type: "Daily Quiz", date: "SEPTEMBER 2024", active: "16.5k", progress: "11/30" },
  ];

  const handleNextChallenge = () => {
    setCurrentChallenge((prev) => (prev + 1) % challenges.length);
  };

  const groups = [
    { id: 1, name: 'Group 1', members: 5 },
    { id: 2, name: 'Group 2', members: 8 },
    { id: 3, name: 'Group 3', members: 3 },
  ];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <div className="flex-grow overflow-y-auto pb-20">
        <div className="relative">
          <ChallengeCard {...challenges[currentChallenge]} />
          <Button
            className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 rounded-full p-2"
            onClick={handleNextChallenge}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
          <Avatar
            className="absolute top-4 right-4 w-10 h-10 cursor-pointer"
            onClick={() => navigate('/profile')}
          >
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>

        <div className="px-4 mt-6">
          <Button
            className="w-full bg-gray-800 text-white rounded-full py-3 flex items-center justify-center mb-6"
            onClick={() => console.log("Create group clicked")}
          >
            <Plus className="mr-2 h-5 w-5" />
            Create Group
          </Button>

          <div className="flex space-x-2 mb-6 overflow-x-auto">
            {groups.map((group) => (
              <GroupButton key={group.id} name={group.name} members={group.members} />
            ))}
          </div>

          <ActivitySection />
        </div>
      </div>
      <BottomNavBar activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default Index;
