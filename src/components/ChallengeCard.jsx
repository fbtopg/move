import React from 'react';
import { Sparkles } from 'lucide-react';
import { Button } from "@/components/ui/button";

const ChallengeCard = ({ challenge }) => {
  const { title, description, step_one, step_two, step_three } = challenge;

  const steps = [step_one, step_two, step_three].filter(Boolean);

  return (
    <div className="w-full bg-gradient-to-br from-pink-100 to-white rounded-xl p-6 shadow-md flex flex-col items-center">
      <div className="w-full flex justify-end mb-2">
        <Sparkles className="text-black" size={24} />
      </div>
      <h3 className="text-2xl font-bold text-black mb-4 text-center">{title}</h3>
      <p className="text-sm text-gray-700 mb-6 text-center max-w-xs">{description}</p>
      
      <div className="flex justify-center items-center mb-8 w-full">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center flex-1">
            <div className="flex items-center w-full">
              <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center text-lg font-bold">
                {index + 1}
              </div>
              {index < steps.length - 1 && (
                <div className="flex-1 h-0.5 bg-black mx-2"></div>
              )}
            </div>
            <p className="text-xs text-center mt-2 w-20">{step}</p>
          </div>
        ))}
      </div>

      <Button className="w-full max-w-xs bg-black text-white hover:bg-gray-800">
        Get started
      </Button>
    </div>
  );
};

export default ChallengeCard;