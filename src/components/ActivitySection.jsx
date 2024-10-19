import React from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Share2 } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

const getGradientColor = (index) => {
  const colors = [
    'from-blue-400 to-purple-500',
    'from-green-400 to-blue-500',
    'from-yellow-400 to-red-500',
    'from-pink-400 to-red-500',
    'from-indigo-400 to-purple-500'
  ];
  return colors[index % colors.length];
};

const ActivityItem = ({ activity, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
  >
    <Card className="mb-4 overflow-hidden">
      <CardHeader className="p-4">
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarImage src={activity.userAvatar} alt={activity.userName} />
            <AvatarFallback>{activity.userName[0]}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-semibold">{activity.userName}</p>
            <p className="text-xs text-gray-500">{activity.time}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-sm">{activity.content}</p>
        {activity.image && (
          <img src={activity.image} alt="Activity" className="mt-2 rounded-lg w-full object-cover h-48" />
        )}
      </CardContent>
      <CardFooter className="p-4 flex justify-between border-t">
        <button className="flex items-center text-gray-500 hover:text-red-500 transition-colors">
          <Heart className="w-4 h-4 mr-1" />
          <span className="text-xs">{activity.likes}</span>
        </button>
        <button className="flex items-center text-gray-500 hover:text-blue-500 transition-colors">
          <MessageCircle className="w-4 h-4 mr-1" />
          <span className="text-xs">{activity.comments}</span>
        </button>
        <button className="flex items-center text-gray-500 hover:text-green-500 transition-colors">
          <Share2 className="w-4 h-4 mr-1" />
          <span className="text-xs">Share</span>
        </button>
      </CardFooter>
    </Card>
  </motion.div>
);

const ActivitySection = ({ activities }) => {
  return (
    <div className="space-y-4 mb-8"> {/* Added mb-8 for bottom margin */}
      <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
      {activities && activities.length > 0 ? (
        activities.map((activity, index) => (
          <ActivityItem key={activity.id} activity={activity} index={index} />
        ))
      ) : (
        <Card>
          <CardContent className="p-6 text-center text-gray-500">
            No recent activities
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ActivitySection;