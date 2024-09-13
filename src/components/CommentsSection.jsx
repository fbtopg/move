import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle } from 'lucide-react';

const Comment = ({ author, content, timestamp, likes, onLike, onReply, userProfilePicture, username }) => {
  return (
    <div className="flex items-start space-x-2 mb-4">
      <Avatar className="w-8 h-8">
        <AvatarImage src={userProfilePicture} alt={author} />
        <AvatarFallback>{author[0]}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-semibold">{author}</p>
          <p className="text-xs text-gray-400">@{username}</p>
          <p className="text-xs text-gray-400">• {timestamp}</p>
        </div>
        <p className="text-sm text-gray-300">{content}</p>
        <div className="flex items-center space-x-4 mt-1">
          <Button variant="ghost" size="sm" onClick={onLike} className="p-0 h-auto text-gray-400">
            <Heart className="h-4 w-4 mr-1" />
            <span className="text-xs">{likes}</span>
          </Button>
          <Button variant="ghost" size="sm" onClick={onReply} className="p-0 h-auto text-gray-400">
            <MessageCircle className="h-4 w-4 mr-1" />
            <span className="text-xs">Reply</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

const CommentsSection = ({ comments, handleCommentLike, handleCommentReply, userProfilePicture, username }) => {
  return (
    <div className="mt-6 mb-20">
      <h4 className="text-sm font-semibold mb-2">Comments</h4>
      {comments.map((comment) => (
        <Comment
          key={comment.id}
          {...comment}
          onLike={() => handleCommentLike(comment.id)}
          onReply={() => handleCommentReply(comment.id)}
          userProfilePicture={userProfilePicture}
          username={username}
        />
      ))}
    </div>
  );
};

export default CommentsSection;