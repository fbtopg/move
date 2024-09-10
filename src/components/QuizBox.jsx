import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getRandomProfilePicture } from '../utils/profilePictures';

const QuizBox = ({ quiz, onClick }) => {
  return (
    <div 
      className="aspect-square mb-8 rounded-lg overflow-hidden relative cursor-pointer"
      onClick={onClick}
    >
      <img 
        src={quiz.image}
        alt={quiz.title} 
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 flex flex-col justify-between p-6">
        <div className="flex justify-between items-start">
          <p className="text-sm font-semibold text-white">{quiz.title}</p>
          <div className="flex items-center">
            <div className="flex -space-x-2 overflow-hidden mr-2">
              {quiz.participants.slice(0, 3).map((participant) => (
                <Avatar key={participant.id} className="inline-block h-6 w-6 rounded-full ring-2 ring-black">
                  <AvatarImage src={getRandomProfilePicture()} alt={participant.name} />
                  <AvatarFallback>{participant.name[0]}</AvatarFallback>
                </Avatar>
              ))}
            </div>
            <span className="text-xs text-white">{quiz.activeParticipants} active</span>
          </div>
        </div>
        <div className="text-left">
          <p className="text-sm font-semibold mb-2 text-white">Quiz #{quiz.number}</p>
          <h3 className="text-4xl font-light text-white">
            {quiz.question}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default QuizBox;