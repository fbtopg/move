import React, { useState } from 'react';
import { CheckCircle2, X } from 'lucide-react';

const TodaysQuiz = ({ quiz, timer }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold">Today's Quiz</h2>
      </div>
      <div 
        className="aspect-square mb-4 rounded-lg overflow-hidden relative"
      >
        <img 
          src={quiz.image}
          alt="Today's Quiz" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex flex-col justify-between p-6">
          <div className="flex justify-end items-center">
            <span className="text-xs text-gray-400 mr-2">Ends in</span>
            <div className="flex space-x-1">
              {timer.split(':').map((digit, index) => (
                <React.Fragment key={index}>
                  <div className="bg-gray-800 rounded-md flex items-center justify-center text-white w-5 h-6">
                    <span className="font-mono text-sm font-normal">{digit[0]}</span>
                  </div>
                  <div className="bg-gray-800 rounded-md flex items-center justify-center text-white w-5 h-6">
                    <span className="font-mono text-sm font-normal">{digit[1]}</span>
                  </div>
                  {index < 2 && <span className="text-white font-mono text-sm font-normal">:</span>}
                </React.Fragment>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold mb-2">Quiz #089</p>
            <h3 className="text-4xl font-light text-white mb-4">
              Jakarta is the capital of Indonesia?
            </h3>
            <div className="flex space-x-4">
              <button 
                className={`w-1/2 h-14 flex items-center justify-center rounded-lg text-sm font-semibold transition-colors ${
                  selectedAnswer === 'Yes' 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-700 text-white hover:bg-gray-600'
                }`}
                onClick={() => handleAnswerSelect('Yes')}
              >
                <CheckCircle2 className="h-5 w-5 mr-2" />
                Yes
              </button>
              <button 
                className={`w-1/2 h-14 flex items-center justify-center rounded-lg text-sm font-semibold transition-colors ${
                  selectedAnswer === 'No' 
                    ? 'bg-red-500 text-white' 
                    : 'bg-gray-700 text-white hover:bg-gray-600'
                }`}
                onClick={() => handleAnswerSelect('No')}
              >
                <X className="h-5 w-5 mr-2" />
                No
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TodaysQuiz;