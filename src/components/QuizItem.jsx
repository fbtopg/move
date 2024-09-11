import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getRandomProfilePicture } from '../utils/profilePictures';

const QuizItem = ({ quiz, isSmall = false, isSquare = false, timer }) => {
  return (
    <div className={`mb-${isSmall ? '4' : '8'}`}>
      {!isSmall && (
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-sm text-gray-400">{quiz.title.toUpperCase()}</h2>
          {quiz.participants && (
            <div className="flex items-center">
              <div className="flex -space-x-2 overflow-hidden mr-2">
                {quiz.participants.slice(0, 3).map((participant) => (
                  <Avatar key={participant.id} className="inline-block h-6 w-6 rounded-full ring-2 ring-black">
                    <AvatarImage src={getRandomProfilePicture()} alt={participant.name} />
                    <AvatarFallback>{participant.name[0]}</AvatarFallback>
                  </Avatar>
                ))}
              </div>
              <span className="text-xs text-gray-400">{quiz.activeParticipants} active</span>
            </div>
          )}
        </div>
      )}
      <div 
        className={`${isSmall ? 'aspect-[4/2]' : (isSquare ? 'aspect-square' : 'aspect-[4/3]')} mb-4 rounded-lg overflow-hidden relative cursor-pointer`}
        style={{
          backgroundImage: `url(${quiz.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        onClick={() => quiz.status !== 'finished' && console.log(`Participate in ${quiz.title}`)}
      >
        <div className="absolute inset-0 flex flex-col justify-center p-6">
          <div className="text-left">
            {!isSmall && <p className="text-sm font-semibold mb-2">Quiz #{quiz.id}</p>}
            <h3 className={`${isSmall ? 'text-base' : 'text-4xl'} font-light text-white mb-4`}>
              {quiz.question}
            </h3>
          </div>
        </div>
        {timer && (
          <div className="absolute bottom-4 right-4 flex flex-col items-end">
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
        )}
      </div>
    </div>
  );
};

export default QuizItem;