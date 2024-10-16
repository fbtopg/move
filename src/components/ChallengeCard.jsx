import React from 'react';
import { Sparkles } from 'lucide-react';
import { Button } from "@/components/ui/button";

const ChallengeCard = ({ challenge }) => {
  const { title, description, step_one, step_two, step_three } = challenge;

  const steps = [step_one, step_two, step_three].filter(Boolean);

  return (
    <div className="w-full bg-gradient-to-br from-pink-100 to-white rounded-xl p-8 shadow-lg flex flex-col items-center">
      <div className="w-full flex justify-center mb-4">
        <Sparkles className="text-yellow-500" size={28} />
      </div>
      <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">{title}</h3>
      <p className="text-sm text-gray-600 mb-8 text-center max-w-xs leading-relaxed">{description}</p>
      
      <div className="w-full mb-8">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center mb-4">
            <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-sm font-bold mr-4">
              {index + 1}
            </div>
            <p className="text-sm flex-1">{step}</p>
          </div>
        ))}
      </div>

      <Button className="w-full max-w-xs bg-black text-white hover:bg-gray-800 transition-colors duration-300 py-3 text-lg font-semibold rounded-full">
        Get started
      </Button>
    </div>
  );
};

export default ChallengeCard;