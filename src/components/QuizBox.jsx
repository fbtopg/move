import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';

const QuizBox = ({ image, quizNumber, question, onParticipate }) => {
  return (
    <div className="aspect-square mb-8 rounded-lg overflow-hidden relative">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
      ></div>
      <div className="absolute inset-0 flex flex-col justify-center p-6">
        <div className="flex flex-col items-start">
          <p className="text-sm font-semibold mb-2">Quiz #{quizNumber}</p>
          <h3 className="text-4xl font-light text-white mb-4 text-left">
            {question}
          </h3>
        </div>
      </div>
      <Button
        className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-white text-black hover:bg-gray-200 transition-colors"
        onClick={onParticipate}
      >
        <ArrowRight className="h-6 w-6" />
      </Button>
    </div>
  );
};

export default QuizBox;