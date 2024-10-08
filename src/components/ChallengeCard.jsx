import React from 'react';
import { Calendar } from 'lucide-react';
import { Button } from "@/components/ui/button";

const ChallengeCard = () => {
  return (
    <div className="border-2 border-gray-300 rounded-lg p-6 flex flex-col items-center text-center">
      <Calendar className="w-16 h-16 text-purple-500 mb-4" />
      <h2 className="text-2xl font-bold mb-2">No appointments</h2>
      <p className="text-gray-600 mb-6">
        Your upcoming and past appointments will appear when you book
      </p>
      <Button className="bg-black text-white hover:bg-gray-800">
        Search salons
      </Button>
    </div>
  );
};

export default ChallengeCard;