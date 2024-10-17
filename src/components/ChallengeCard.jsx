import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";

const ChallengeCard = ({ challenge }) => {
  const { title, description, step_one, step_two, step_three } = challenge;

  const steps = [step_one, step_two, step_three].filter(Boolean);

  return (
    <div className="w-full max-w-sm bg-gradient-to-br from-blue-100 via-pink-100 to-blue-200 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="mb-4">
        <h3 className="text-xl font-bold text-gray-800">{title}</h3>
      </div>
      <p className="text-sm text-gray-600 mb-6 leading-relaxed">{description}</p>
      
      <div className="space-y-4 mb-6">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center">
            <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-bold mr-3 flex-shrink-0">
              {index + 1}
            </div>
            <p className="text-sm flex-1">{step}</p>
          </div>
        ))}
      </div>

      <Button className="w-full bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-300 py-2 text-sm font-semibold rounded-full flex items-center justify-center group">
        Get started
        <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" size={18} />
      </Button>
    </div>
  );
};

export default ChallengeCard;