import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const TodaysQuiz = ({ quiz, onQuizClick, timer }) => (
  <>
    <h2 className="text-lg font-bold mb-4">Today's Quiz</h2>
    <div 
      className="aspect-square mb-4 rounded-lg overflow-hidden relative cursor-pointer"
      onClick={onQuizClick}
    >
      <img 
        src={quiz.image}
        alt="Today's Quiz" 
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 flex flex-col justify-between p-6">
        <div className="text-left">
          <p className="text-sm font-semibold mb-2">Quiz #089</p>
          <h3 className="text-4xl font-light text-white mb-2">
            {quiz.question}
          </h3>
          <div className="flex items-center">
            <div className="flex -space-x-2 overflow-hidden mr-2">
              {quiz.participants.slice(0, 3).map((participant) => (
                <Avatar key={participant.id} className="inline-block h-6 w-6 rounded-full ring-2 ring-black">
                  <AvatarImage src={participant.avatar} alt={participant.name} />
                  <AvatarFallback>{participant.name[0]}</AvatarFallback>
                </Avatar>
              ))}
            </div>
            <span className="text-xs text-white">{quiz.activeParticipants} active</span>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-xs text-gray-400 mb-1">Ends in</span>
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
      </div>
    </div>
  </>
);

export default TodaysQuiz;