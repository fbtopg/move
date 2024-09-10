import React, { useState, useEffect } from 'react';
import { X, Heart, MessageCircle, Share2, ArrowLeft, Send } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { shareInvite } from '../utils/shareUtils';
import AnswerSection from './AnswerSection';
import CommentsSection from './CommentsSection';

const QuizDetails = ({ quiz, onClose, handleLike, toggleComments }) => {
  const [newComment, setNewComment] = useState('');
  const [isCommentFocused, setIsCommentFocused] = useState(false);
  const [comments, setComments] = useState([
    { id: 1, author: "Alice", content: "Great question!", timestamp: "2h ago", likes: 5 },
    { id: 2, author: "Bob", content: "I think I know the answer.", timestamp: "1h ago", likes: 3 },
    { id: 3, author: "Charlie", content: "This one's tricky!", timestamp: "30m ago", likes: 2 },
  ]);

  const handleCommentLike = (commentId) => {
    setComments(comments.map(comment => 
      comment.id === commentId ? { ...comment, likes: comment.likes + 1 } : comment
    ));
  };

  const handleCommentReply = (commentId) => {
    console.log('Reply to comment:', commentId);
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      const newCommentObj = {
        id: comments.length + 1,
        author: "You",
        content: newComment.trim(),
        timestamp: "Just now",
        likes: 0
      };
      setComments([newCommentObj, ...comments]);
      setNewComment('');
    }
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black z-50 overflow-y-auto">
      <div className="relative min-h-screen flex flex-col">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 left-4 text-white z-10"
          onClick={onClose}
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <div 
          className="w-full aspect-square bg-cover bg-center relative"
          style={{ 
            backgroundImage: `url(https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/quiz/Frame%2095.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvcXVpei9GcmFtZSA5NS5wbmciLCJpYXQiOjE3MjU5NDMwNjAsImV4cCI6MTc1NzQ3OTA2MH0.j_tghBkpc92hU749PoU_fV_q0HSHBg4SZw8FVeNDsa8J0&t=2024-09-10T04%3A37%3A40.433Z)`,
          }}
        >
          <div className="absolute inset-0 flex flex-col justify-center p-6">
            <div className="text-left">
              <p className="text-sm font-semibold mb-2">Quiz #089</p>
              <h2 className="text-4xl font-light text-white">{quiz.question}</h2>
            </div>
          </div>
        </div>
        
        <div className="flex-1 p-4 pb-20">
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
              <Share2 className="w-4 w-4" />
            </Button>
          </div>

          <AnswerSection />

          <CommentsSection 
            comments={comments}
            handleCommentLike={handleCommentLike}
            handleCommentReply={handleCommentReply}
          />
        </div>

        <div className="fixed bottom-0 left-0 right-0 bg-black p-4">
          <div className="flex items-center space-x-2">
            <Avatar className="w-8 h-8">
              <AvatarImage src="https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/pfp/medium.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvcGZwL21lZGl1bS5wbmciLCJpYXQiOjE3MjU2OTIyMDksImV4cCI6MTc1NzIyODIwOX0.cFZt_zQaj6vJZgVMK7kYXDyIStZQtZzFOHzZFhzJdKA&t=2024-09-07T06%3A56%3A48.637Z" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div className="flex-grow relative">
              <Input
                type="text"
                placeholder="Write a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onFocus={() => setIsCommentFocused(true)}
                onBlur={() => setIsCommentFocused(false)}
                className="flex-grow bg-gray-800 border-gray-700 text-white pr-10"
              />
              {(isCommentFocused || newComment) && (
                <Button 
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  onClick={handleAddComment}
                  disabled={!newComment.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizDetails;