import React from 'react';
import { Calendar } from 'lucide-react';
import { Button } from "@/components/ui/button";

const ChallengeCard = () => {
  return (
    <div className="border border-gray-300 rounded-lg p-6 flex flex-col items-center text-center">
      <Calendar className="w-16 h-16 text-gray-400 mb-4" />
      <h2 className="text-xl font-bold mb-2">No Challenges</h2>
      <p className="text-sm text-gray-600 mb-6">
        Your current and upcoming challenges will be displayed when they become active.
      </p>
      <Button 
        variant="outline" 
        className="border border-gray-300 text-gray-600 hover:bg-gray-100 hover:text-gray-800 bg-transparent rounded-full"
      >
        Turn on notification
      </Button>
    </div>
  );
};

export default ChallengeCard;