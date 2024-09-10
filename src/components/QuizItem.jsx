import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Share2 } from 'lucide-react';
import { getRandomProfilePicture } from '../utils/profilePictures';
import { shareInvite } from '../utils/shareUtils';

const QuizItem = ({ quiz, onLike, isSmall = false }) => {
  return (
    <div className={`mb-${isSmall ? '0' : '8'}`}>
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
        className={`${isSmall ? 'aspect-square' : 'aspect-[4/3]'} mb-4 rounded-lg overflow-hidden relative cursor-pointer`}
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
      </div>
      {!isSmall && quiz.status !== 'finished' && (
        <div className="flex justify-start items-center">
          <Button 
            variant="ghost" 
            className={`flex items-center ${quiz.isLiked ? 'text-white' : 'text-gray-400'} hover:text-white mr-4 p-1`}
            onClick={() => onLike(quiz.id)}
          >
            <Heart className={`w-4 h-4 mr-1 ${quiz.isLiked ? 'fill-red-500 text-red-500' : ''}`} />
            <span className="text-xs">{quiz.likes} Likes</span>
          </Button>
          <Button 
            variant="ghost" 
            className="flex items-center text-gray-400 hover:text-white mr-4 p-1"
          >
            <MessageCircle className="w-4 h-4 mr-1" />
            <span className="text-xs">{quiz.comments} Comments</span>
          </Button>
          <Button 
            variant="ghost" 
            className="flex items-center text-gray-400 hover:text-white p-1"
            onClick={shareInvite}
          >
            <Share2 className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default QuizItem;