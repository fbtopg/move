import React from 'react';
import { Sparkles } from 'lucide-react';
import { Button } from "@/components/ui/button";

const ChallengeCard = ({ challenge }) => {
  const { title, description, steps } = challenge;

  // Parse steps from JSON string if necessary
  const parsedSteps = typeof steps === 'string' ? JSON.parse(steps) : steps;

  return (
    <div className="w-full bg-gradient-to-br from-pink-100 to-white rounded-xl p-6 shadow-md">
      <div className="flex justify-end mb-4">
        <Sparkles className="text-black" size={24} />
      </div>
      <h3 className="text-2xl font-bold text-black mb-6">{title}</h3>
      <p className="text-sm text-gray-700 mb-6">{description}</p>
      
      <div className="flex justify-center items-center mb-6">
        {parsedSteps && parsedSteps.slice(0, 3).map((step, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center text-lg font-bold">
                {index + 1}
              </div>
              {index < 2 && (
                <div className="w-16 h-0.5 bg-black"></div>
              )}
            </div>
            <p className="text-xs text-center mt-2 w-20">{step}</p>
          </div>
        ))}
      </div>

      <Button className="w-full bg-black text-white hover:bg-gray-800">
        Get started
      </Button>
    </div>
  );
};

export default ChallengeCard;