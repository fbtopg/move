import React from 'react';
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Share2 } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getRandomProfilePicture } from '../utils/profilePictures';
import { shareInvite } from '../utils/shareUtils';

const TodaysQuiz = ({ quiz, onQuizClick, onLike, onComment, timer }) => (
  <>
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-xl font-bold">Today's Quiz</h2>
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
    </div>
    <div 
      className="aspect-square mb-4 rounded-lg overflow-hidden relative cursor-pointer"
      onClick={onQuizClick}
    >
      <img 
        src={quiz.image}
        alt="Today's Quiz" 
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 flex flex-col justify-center p-6">
        <div className="flex flex-col items-start">
          <p className="text-sm font-semibold mb-2">Quiz #089</p>
          <h3 className="text-4xl font-light text-white mb-4 text-left">
            {quiz.question}
          </h3>
        </div>
      </div>
      <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 px-2 py-1 rounded">
        <span className="text-white text-sm">{timer}</span>
      </div>
    </div>
    <div className="flex justify-start items-center mb-6">
      <Button 
        variant="ghost" 
        className={`flex items-center ${quiz.isLiked ? 'text-white' : 'text-gray-400'} hover:text-white mr-4 p-1`}
        onClick={onLike}
      >
        <Heart className={`w-4 h-4 mr-1 ${quiz.isLiked ? 'fill-red-500 text-red-500' : ''}`} />
        <span className="text-xs">{quiz.likes} Likes</span>
      </Button>
      <Button 
        variant="ghost" 
        className={`flex items-center ${quiz.isCommentsOpen ? 'text-white' : 'text-gray-400'} hover:text-white mr-4 p-1`}
        onClick={onComment}
      >
        <MessageCircle className="w-4 h-4 mr-1" />
        <span className="text-xs">{quiz.comments} Comments</span>
      </Button>
      <Button variant="ghost" className="flex items-center text-gray-400 hover:text-white p-1" onClick={shareInvite}>
        <Share2 className="w-4 h-4" />
      </Button>
    </div>
  </>
);

export default TodaysQuiz;