import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Share2 } from 'lucide-react';

const CommunityPost = ({ post, onUserClick }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="flex items-center mb-2">
        <Avatar className="h-10 w-10 mr-2 cursor-pointer" onClick={() => onUserClick(post.user)}>
          <AvatarImage src={post.user.avatar} alt={post.user.name} />
          <AvatarFallback>{post.user.name[0]}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-semibold">{post.user.name}</h3>
          <p className="text-sm text-gray-500">{post.timestamp}</p>
        </div>
      </div>
      <p className="mb-4">{post.content}</p>
      <div className="flex justify-between items-center">
        <Button variant="ghost" size="sm">
          <Heart className="h-5 w-5 mr-1" />
          {post.likes}
        </Button>
        <Button variant="ghost" size="sm">
          <MessageCircle className="h-5 w-5 mr-1" />
          {post.comments}
        </Button>
        <Button variant="ghost" size="sm">
          <Share2 className="h-5 w-5 mr-1" />
          Share
        </Button>
      </div>
    </div>
  );
};

export default CommunityPost;