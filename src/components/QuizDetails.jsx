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
          className="w-full bg-cover bg-center relative"
          style={{ 
            backgroundImage: `url(https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/quiz/Frame%2095.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvcXVpei9GcmFtZSA5NS5wbmciLCJpYXQiOjE3MjU5NDMwNjAsImV4cCI6MTc1NzQ3OTA2MH0.j_tghbLb6fbMACrek7Eu4cye3YYIdKhgVLC4ct2u-zU&t=2024-09-10T04%3A37%3A40.433Z)`,
            marginLeft: 0,
            marginRight: 0,
            height: '50vh'
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
          <div className="absolute inset-0 flex flex-col justify-center p-6">
            <div className="text-left">
              <p className="text-sm font-semibold mb-2">Quiz #089</p>
              <h2 className="text-4xl font-light text-white">{quiz.question}</h2>
            </div>
          </div>
        </div>
        
        <div className="flex-1 p-4">
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