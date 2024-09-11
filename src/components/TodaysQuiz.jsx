import React from 'react';
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Share2 } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { shareInvite } from '../utils/shareUtils';

const TodaysQuiz = ({ quiz, onQuizClick, onLike, onComment, timer }) => (
  <>
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-xl font-bold">Today's Quiz</h2>
      <div className="flex items-center">
        <div className="flex -space-x-2 overflow-hidden mr-2">
          {quiz.participants.slice(0, 3).map((participant) => (
            <Avatar key={participant.id} className="inline-block h-6 w-6 rounded-full ring-2 ring-black">
              <AvatarImage src={participant.avatar} alt={participant.name} />
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
        <div className="text-left">
          <p className="text-sm font-semibold mb-2">Quiz #089</p>
          <h3 className="text-4xl font-light text-white mb-4">
            {quiz.question}
          </h3>
        </div>
      </div>
      <div className="absolute bottom-4 right-4 flex space-x-1">
        {timer.split(':').map((digit, index) => (
          <React.Fragment key={index}>
            <div className="bg-gray-800 rounded-md flex items-center justify-center text-white w-7 h-8">
              <span className="font-mono text-lg font-bold">{digit[0]}</span>
            </div>
            <div className="bg-gray-800 rounded-md flex items-center justify-center text-white w-7 h-8">
              <span className="font-mono text-lg font-bold">{digit[1]}</span>
            </div>
            {index < 2 && <span className="text-white font-mono text-lg font-bold">:</span>}
          </React.Fragment>
        ))}
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