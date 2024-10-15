import React from 'react';
import { Check, Sparkles } from 'lucide-react';
import { Button } from "@/components/ui/button";

const ChallengeCard = ({ challenge = {} }) => {
  const { title = 'Challenge', step_one = '', step_two = '', step_three = '' } = challenge;

  const steps = [
    { text: step_one, completed: true },
    { text: step_two, completed: true },
    { text: step_three, completed: false },
  ];

  return (
    <div className="w-72 bg-gradient-to-br from-pink-100 to-white rounded-xl p-6 shadow-md">
      <div className="flex justify-end mb-4">
        <Sparkles className="text-black" size={24} />
      </div>
      <h3 className="text-2xl font-bold text-black mb-6">{title}</h3>
      <div className="space-y-4 mb-6">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${step.completed ? 'bg-black' : 'border-2 border-gray-300'}`}>
              {step.completed && <Check className="text-white" size={16} />}
              {!step.completed && <span className="text-gray-500">{index + 1}</span>}
            </div>
            <span className="text-sm text-gray-700">{step.text}</span>
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