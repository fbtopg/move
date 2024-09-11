import React from 'react';
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Share2 } from 'lucide-react';
import { shareInvite } from '../utils/shareUtils';

const NewsItems = ({ items, onLike, onComment }) => (
  <>
    <h2 className="text-lg font-bold mb-4">News</h2>
    {items.map((item) => (
      <div key={item.id} className="bg-[#111111] text-white rounded-lg p-4 mb-4">
        <p className="text-sm text-gray-400 mb-2">{item.date}</p>
        <h3 className="text-lg font-semibold mb-2">{item.headline}</h3>
        <div className="flex items-center text-sm text-gray-400">
          <Button 
            variant="ghost" 
            className={`flex items-center ${item.isLiked ? 'text-white' : 'text-gray-400'} hover:text-white mr-4 p-0`}
            onClick={() => onLike('news', item.id)}
          >
            <Heart className={`w-4 h-4 mr-1 ${item.isLiked ? 'fill-red-500 text-red-500' : ''}`} />
            <span className="text-xs">{item.likes} Likes</span>
          </Button>
          <Button 
            variant="ghost" 
            className={`flex items-center ${item.isCommentsOpen ? 'text-white' : 'text-gray-400'} hover:text-white mr-4 p-0`}
            onClick={() => onComment('news', item.id)}
          >
            <MessageCircle className="w-4 h-4 mr-1" />
            <span className="text-xs">{item.comments} Comments</span>
          </Button>
          <Button variant="ghost" className="flex items-center text-gray-400 hover:text-white p-0" onClick={shareInvite}>
            <Share2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    ))}
  </>
);

export default NewsItems;