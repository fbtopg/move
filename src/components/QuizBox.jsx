import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getRandomProfilePicture } from '../utils/profilePictures';

const QuizBox = ({ title, question, image, participants, activeParticipants, onClick }) => {
  return (
    <div 
      className="aspect-square mb-4 rounded-lg overflow-hidden relative cursor-pointer"
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      onClick={onClick}
    >
      <div className="absolute inset-0 flex flex-col justify-between p-6">
        <div className="flex justify-between items-start">
          <p className="text-sm text-white font-semibold mb-2">{title}</p>
          {participants && (
            <div className="flex items-center">
              <div className="flex -space-x-2 overflow-hidden mr-2">
                {participants.slice(0, 3).map((participant, index) => (
                  <Avatar key={index} className="inline-block h-6 w-6 rounded-full ring-2 ring-black">
                    <AvatarImage src={getRandomProfilePicture()} alt={participant.name} />
                    <AvatarFallback>{participant.name[0]}</AvatarFallback>
                  </Avatar>
                ))}
              </div>
              <span className="text-xs text-white">{activeParticipants} active</span>
            </div>
          )}
        </div>
        <h3 className="text-4xl font-light text-white mb-4">
          {question}
        </h3>
      </div>
    </div>
  );
};

export default QuizBox;