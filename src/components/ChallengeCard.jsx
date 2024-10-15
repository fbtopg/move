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
      
      <div className="flex justify-between items-center mb-8 w-full relative">
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            <div className="flex flex-col items-center flex-1 z-10">
              <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center text-lg font-bold mb-3">
                {index + 1}
              </div>
              <p className="text-xs text-center mt-2 w-full">{step}</p>
            </div>
            {index < steps.length - 1 && (
              <div className="flex-grow h-0.5 bg-gray-300 absolute top-6 -z-10" style={{left: `${(100 / (steps.length - 1)) * index + 8}%`, right: `${(100 / (steps.length - 1)) * (steps.length - index - 1) + 8}%`}} />
            )}
          </React.Fragment>
        ))}
      </div>

      <Button className="w-full max-w-xs bg-black text-white hover:bg-gray-800 transition-colors duration-300 py-3 text-lg font-semibold rounded-full">
        Get started
      </Button>
    </div>
  );
};

export default ChallengeCard;