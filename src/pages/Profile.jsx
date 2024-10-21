import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Settings, Star, Users, Flag, FileText, LogOut, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import BottomNavBar from '../components/BottomNavBar';
import { useSupabaseAuth } from '../integrations/supabase/auth';

const ProfileItem = ({ icon: Icon, label, onClick }) => (
  <Button
    variant="ghost"
    className="w-full justify-start text-left font-normal"
    onClick={onClick}
  >
    <Icon className="mr-2 h-4 w-4" />
    <span>{label}</span>
  </Button>
);

const Profile = () => {
  const [activeTab, setActiveTab] = React.useState('profile');
  const navigate = useNavigate();
  const { session } = useSupabaseAuth();

  const userAvatarUrl = session?.user?.user_metadata?.avatar_url;
  const displayName = session?.user?.user_metadata?.full_name || session?.user?.email?.split('@')[0] || "User";
  const memberSince = new Date(session?.user?.created_at).getFullYear().toString() || "2023";

  const profileItems = [
    { icon: FileText, label: "Summary", route: "/profile/summary" },
    { icon: Users, label: "Groups", route: "/profile/groups" },
    { icon: Flag, label: "Challenges", route: "/profile/challenges" },
    { icon: Star, label: "Rewards", route: "/rewards" },
  ];

  return (
    <div className="min-h-screen bg-[#FBFCFC] text-foreground flex flex-col">
      <div className="flex-grow overflow-y-auto pb-20">
        <div className="max-w-md mx-auto p-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-between items-center mb-6"
          >
            <h1 className="text-2xl font-bold">Profile</h1>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => navigate('/settings')}
              className="text-gray-600 hover:text-gray-900 transition-colors duration-300"
            >
              <Settings className="h-6 w-6" />
            </Button>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="mb-6">
              <CardContent className="flex items-center p-6">
                <Avatar className="w-20 h-20 mr-4">
                  <AvatarImage src={userAvatarUrl} alt={displayName} />
                  <AvatarFallback>
                    <User className="h-10 w-10" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-xl font-semibold">{displayName}</h2>
                  <p className="text-sm text-gray-500">Member since {memberSince}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="space-y-2"
          >
            {profileItems.map((item, index) => (
              <ProfileItem
                key={index}
                icon={item.icon}
                label={item.label}
                onClick={() => navigate(item.route)}
              />
            ))}
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-6"
          >
            <Button variant="outline" className="w-full" onClick={() => navigate('/login')}>
              <LogOut className="mr-2 h-4 w-4" />
              Log Out
            </Button>
          </motion.div>
        </div>
      </div>
      <BottomNavBar activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default Profile;