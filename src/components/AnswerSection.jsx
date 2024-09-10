import React, { useState } from 'react';
import { Button } from "@/components/ui/button";

const AnswerSection = () => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const answers = [
    { id: 'A', text: 'Jakarta' },
    { id: 'B', text: 'Surabaya' },
    { id: 'C', text: 'Bali' },
    { id: 'D', text: 'Yogyakarta' },
  ];

  const handleAnswerSelect = (answerId) => {
    setSelectedAnswer(answerId);
  };

  const handleSubmitAnswer = () => {
    console.log('Submitted answer:', selectedAnswer);
  };

  return (
    <div className="mt-4 mb-6">
      <h3 className="text-lg font-semibold mb-2">Choose your answer:</h3>
      <div className="grid grid-cols-2 gap-2">
        {answers.map((answer) => (
          <Button
            key={answer.id}
            variant={selectedAnswer === answer.id ? "default" : "outline"}
            className={`h-12 ${
              selectedAnswer === answer.id
                ? 'bg-white text-black'
                : 'bg-transparent text-gray-400 border-gray-400 hover:bg-white hover:text-black'
            }`}
            onClick={() => handleAnswerSelect(answer.id)}
          >
            {answer.text}
          </Button>
        ))}
      </div>
      <Button
        className="w-full mt-4 bg-white text-black hover:bg-gray-200 transition-colors h-12"
        onClick={handleSubmitAnswer}
        disabled={!selectedAnswer}
      >
        Submit Answer
      </Button>
    </div>
  );
};

export default AnswerSection;