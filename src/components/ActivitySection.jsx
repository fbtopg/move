import React from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Share2 } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSupabaseAuth } from '../integrations/supabase/auth';

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

const EmptyState = ({ onLoginRequired }) => {
  const { session } = useSupabaseAuth();

  const handleGetStarted = () => {
    if (!session && onLoginRequired) {
      onLoginRequired();
    }
  };

  return (
    <>
      <h3 className="text-lg font-semibold mb-2">Stay in touch with a swipe</h3>
      <p className="text-sm font-light text-center mb-8">
        Discover your friends' latest moments. Swipe right to like their recent activities and make them feel appreciated.
      </p>
      <img 
        src="https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/app/Group%20289236%20(1).png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvYXBwL0dyb3VwIDI4OTIzNiAoMSkucG5nIiwiaWF0IjoxNzI5ODM4NjQxLCJleHAiOjE3NjEzNzQ2NDF9.M1tbMZdFCzKb6phePakvCamR9wifQJSLdNIB95bDXEE&t=2024-10-25T06%3A44%3A04.048Z"
        alt="No activities"
        className="w-64 h-auto mb-8"
      />
      <Button 
        variant="default" 
        className="bg-blue-500 hover:bg-blue-600 text-white w-full max-w-xs rounded-full"
        onClick={handleGetStarted}
      >
        Get Started
      </Button>
    </>
  );
};

const ActivitySection = ({ activities, onLoginRequired }) => {
  return (
    <div className="space-y-4 mb-6">
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="w-full grid grid-cols-3 border-b border-gray-200 bg-transparent">
          <TabsTrigger 
            value="all" 
            className="text-sm text-gray-500 data-[state=active]:text-black data-[state=active]:border-b-2 data-[state=active]:border-black pb-2 bg-transparent hover:bg-transparent"
          >
            All
          </TabsTrigger>
          <TabsTrigger 
            value="favorite" 
            className="text-sm text-gray-500 data-[state=active]:text-black data-[state=active]:border-b-2 data-[state=active]:border-black pb-2 bg-transparent hover:bg-transparent"
          >
            Favorite
          </TabsTrigger>
          <TabsTrigger 
            value="me" 
            className="text-sm text-gray-500 data-[state=active]:text-black data-[state=active]:border-b-2 data-[state=active]:border-black pb-2 bg-transparent hover:bg-transparent"
          >
            Me
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          {activities && activities.length > 0 ? (
            activities.map((activity, index) => (
              <ActivityItem key={activity.id} activity={activity} index={index} />
            ))
          ) : (
            <div className="flex flex-col items-center text-center px-4 py-8">
              <EmptyState onLoginRequired={onLoginRequired} />
            </div>
          )}
        </TabsContent>
        <TabsContent value="favorite">
          <div className="flex flex-col items-center text-center px-4 py-8">
            <EmptyState onLoginRequired={onLoginRequired} />
          </div>
        </TabsContent>
        <TabsContent value="me">
          <div className="flex flex-col items-center text-center px-4 py-8">
            <EmptyState onLoginRequired={onLoginRequired} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ActivitySection;
