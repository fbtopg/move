import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getRandomProfilePicture } from '../utils/profilePictures';
import { Button } from "@/components/ui/button";

const QuizBox = ({ title, question, image, participants, activeParticipants, timer }) => {
  return (
    <div 
      className="aspect-square mb-4 rounded-lg overflow-hidden relative"
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
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
        <div className="space-y-2">
          <Button
            variant="outline"
            className="w-full bg-white/20 text-white border-white/40 hover:bg-white/30 hover:text-white"
          >
            Answer Option 1
          </Button>
          <Button
            variant="outline"
            className="w-full bg-white/20 text-white border-white/40 hover:bg-white/30 hover:text-white"
          >
            Answer Option 2
          </Button>
        </div>
      </div>
      {timer && (
        <div className="absolute top-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-sm">
          {timer}
        </div>
      )}
    </div>
  );
};

export default QuizBox;