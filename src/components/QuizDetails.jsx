import React from 'react';
import { X, Heart, MessageCircle, Share2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getRandomProfilePicture } from '../utils/profilePictures';
import { shareInvite } from '../utils/shareUtils';

const Comment = ({ author, content, timestamp }) => (
  <div className="flex items-start space-x-2 mb-4">
    <Avatar className="w-8 h-8">
      <AvatarImage src={getRandomProfilePicture()} alt={author} />
      <AvatarFallback>{author[0]}</AvatarFallback>
    </Avatar>
    <div className="flex-1">
      <p className="text-sm font-semibold">{author}</p>
      <p className="text-sm text-gray-300">{content}</p>
      <p className="text-xs text-gray-400 mt-1">{timestamp}</p>
    </div>
  </div>
);

const QuizDetails = ({ quiz, onClose, handleLike, toggleComments }) => {
  return (
    <div className="fixed inset-0 bg-black z-50 overflow-y-auto">
      <div className="relative h-screen flex flex-col">
        <div 
          className="w-full h-screen bg-cover bg-center relative"
          style={{ 
            backgroundImage: `url(${quiz.image})`,
            marginLeft: 0,
            marginRight: 0,
          }}
        >
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 left-4 text-white"
            onClick={onClose}
          >
            <X className="h-6 w-6" />
          </Button>
          <div className="absolute inset-0 flex flex-col justify-between p-6">
            <div className="flex justify-between items-start">
              <p className="text-sm text-white font-semibold mb-2">Quiz #{quiz.id || '000'}</p>
              {quiz.participants && (
                <div className="flex items-center">
                  <div className="flex -space-x-2 overflow-hidden mr-2">
                    {quiz.participants.slice(0, 3).map((participant, index) => (
                      <Avatar key={index} className="inline-block h-6 w-6 rounded-full ring-2 ring-black">
                        <AvatarImage src={getRandomProfilePicture()} alt={participant.name} />
                        <AvatarFallback>{participant.name[0]}</AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                  <span className="text-xs text-white">{quiz.activeParticipants} active</span>
                </div>
              )}
            </div>
            <h3 className="text-4xl font-light text-white mb-4">
              {quiz.question}
            </h3>
          </div>
        </div>
        
        <div className="flex-1 p-4 bg-black">
          <div className="flex justify-start items-center mb-4">
            <Button 
              variant="ghost" 
              className={`flex items-center ${quiz.isLiked ? 'text-white' : 'text-gray-400'} hover:text-white mr-4 p-1`}
              onClick={() => handleLike('quiz')}
            >
              <Heart className={`w-4 h-4 mr-1 ${quiz.isLiked ? 'fill-red-500 text-red-500' : ''}`} />
              <span className="text-xs">{quiz.likes} Likes</span>
            </Button>
            <Button 
              variant="ghost" 
              className={`flex items-center ${quiz.isCommentsOpen ? 'text-white' : 'text-gray-400'} hover:text-white mr-4 p-1`}
              onClick={() => toggleComments('quiz')}
            >
              <MessageCircle className="w-4 h-4 mr-1" />
              <span className="text-xs">{quiz.comments} Comments</span>
            </Button>
            <Button variant="ghost" className="flex items-center text-gray-400 hover:text-white p-1" onClick={shareInvite}>
              <Share2 className="w-4 h-4" />
            </Button>
          </div>

          {quiz.isCommentsOpen && (
            <div className="mt-4">
              <h4 className="text-sm font-semibold mb-2">Comments</h4>
              {[
                { author: "Alice", content: "Great question!", timestamp: "2h ago" },
                { author: "Bob", content: "I think I know the answer.", timestamp: "1h ago" },
                { author: "Charlie", content: "This one's tricky!", timestamp: "30m ago" },
              ].map((comment, index) => (
                <Comment key={index} {...comment} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizDetails;