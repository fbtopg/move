import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from 'framer-motion';

const FriendActivity = ({ name, activity, type, profilePicture, isOwnActivity = false }) => {
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
  };

  const getActivityGradient = () => {
    switch (type) {
      case 'walk':
        return 'bg-gradient-to-br from-blue-400 to-blue-600';
      case 'quiz':
        return 'bg-gradient-to-br from-yellow-400 to-yellow-600';
      default:
        return 'bg-gradient-to-br from-gray-400 to-gray-600';
    }
  };

  const [content, timestamp] = activity.split(' • ');

  return (
    <motion.div 
      className="bg-white rounded-lg shadow-sm p-4 mb-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-start space-x-3">
        <Avatar className="w-10 h-10">
          {profilePicture ? (
            <AvatarImage src={profilePicture} alt={name} />
          ) : (
            <AvatarFallback>{name.slice(0, 2).toUpperCase()}</AvatarFallback>
          )}
        </Avatar>
        <div className="flex-grow min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-grow min-w-0 pr-2">
              <p className="text-sm font-semibold text-gray-900">{name}</p>
              <p className="text-sm text-gray-700 break-words">{content}</p>
              {timestamp && (
                <p className="text-xs text-gray-500 mt-1">{timestamp}</p>
              )}
            </div>
            <div className="flex items-center space-x-2 flex-shrink-0">
              <div 
                className={`w-8 h-8 rounded-full ${getActivityGradient()} flex items-center justify-center`}
              >
                {type === 'walk' ? '🚶' : '🧠'}
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleLike}
                className={cn(
                  "w-8 h-8 p-0",
                  liked ? "text-red-500" : "text-gray-400",
                  "bg-transparent hover:bg-transparent active:bg-transparent focus:bg-transparent"
                )}
              >
                <AnimatePresence>
                  {liked && (
                    <motion.div
                      key="heart"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{ duration: 0.2 }}
                      className="absolute"
                    >
                      <Heart className="h-5 w-5 fill-current" />
                    </motion.div>
                  )}
                </AnimatePresence>
                <Heart className={`h-5 w-5 ${liked ? "fill-current" : ""}`} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FriendActivity;