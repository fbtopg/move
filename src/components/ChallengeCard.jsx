import React from 'react';
import { Sparkles } from 'lucide-react';
import { Button } from "@/components/ui/button";

const ChallengeCard = ({ challenge }) => {
  const { title, description, step_one, step_two, step_three } = challenge;

  const steps = [step_one, step_two, step_three].filter(Boolean);

  return (
    <div className="w-64 bg-gradient-to-br from-blue-100 via-pink-100 to-blue-200 rounded-xl p-6 shadow-lg flex flex-col items-center">
      <div className="w-full flex justify-center mb-4">
        <Sparkles className="text-yellow-500" size={24} />
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">{title}</h3>
      <p className="text-xs text-gray-600 mb-6 text-center leading-relaxed">{description}</p>
      
      <div className="w-full mb-6">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center mb-3">
            <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center text-xs font-bold mr-3">
              {index + 1}
            </div>
            <p className="text-xs flex-1">{step}</p>
          </div>
        ))}
      </div>

      <Button className="w-full bg-black text-white hover:bg-gray-800 transition-colors duration-300 py-2 text-sm font-semibold rounded-full">
        Get started
      </Button>
    </div>
  );
};

export default ChallengeCard;