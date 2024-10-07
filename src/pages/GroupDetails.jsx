import React, { useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Info, MessageSquare, Sparkles, Camera, Share2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { shareInvite } from '../utils/shareUtils';
import { useGroupData } from '../hooks/useGroupData';
import { useGroupActions } from '../hooks/useGroupActions';
import InviteFriends from '../components/InviteFriends';
import ActivitySection from '../components/ActivitySection';
import GroupInfo from '../components/GroupInfo';
import GroupMembers from '../components/GroupMembers';

const GroupDetails = () => {
  const navigate = useNavigate();
  const { groupId } = useParams();
  const location = useLocation();
  const [isEditing, setIsEditing] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [activeTab, setActiveTab] = useState('info');

  const { group, setGroup, editedGroup, setEditedGroup } = useGroupData(groupId, location.state);
  const { handleEdit, handleSave, handleCancel, handleRemoveMember, handleInputChange, handleDelete, handleLeaderboard, handleJoin } = useGroupActions(group, editedGroup, setEditedGroup, setGroup, setIsEditing, navigate);

  const handleInvite = () => setShowInviteModal(true);
  const handleShare = () => shareInvite(group.name);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FEF8F3] via-[#F0E7E0] to-[#E6D0C5] flex flex-col">
      <div className="relative h-64 bg-gradient-to-r from-blue-400 to-purple-500">
        <img src={group.bannerImage} alt={group.name} className="w-full h-full object-cover opacity-50" />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-end p-6">
          <div className="flex items-center space-x-4">
            <Avatar className="w-24 h-24 border-4 border-white">
              <AvatarImage src={group.image} alt={group.name} />
              <AvatarFallback>{group.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold text-white">{group.name}</h1>
              <p className="text-sm text-white opacity-80">{group.members.length} members</p>
            </div>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 left-4 bg-black/50 text-white rounded-full"
          onClick={() => navigate(-1)}
        >
          <Camera className="h-6 w-6" />
        </Button>
        <div className="absolute top-4 right-4 flex space-x-2">
          <Button
            variant="ghost"
            size="icon"
            className="bg-black/50 text-white rounded-full"
            onClick={handleShare}
          >
            <Share2 className="h-6 w-6" />
          </Button>
          {!group.isJoined ? (
            <Button
              variant="primary"
              className="bg-[#3B72EC] hover:bg-[#3B72EC]/90 text-white rounded-full"
              onClick={handleJoin}
            >
              Join
            </Button>
          ) : (
            <Button
              variant="ghost"
              className="bg-black/50 text-white rounded-full"
              onClick={handleInvite}
            >
              Invite
            </Button>
          )}
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4">
        <Tabs defaultValue="info" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 mb-6 bg-white/30 backdrop-blur-sm rounded-full p-1">
            <TabsTrigger value="info" className="data-[state=active]:bg-white rounded-full transition-all duration-300">
              <Info className="w-4 h-4 mr-2" />Info
            </TabsTrigger>
            <TabsTrigger value="members" className="data-[state=active]:bg-white rounded-full transition-all duration-300">
              <Users className="w-4 h-4 mr-2" />Members
            </TabsTrigger>
            <TabsTrigger value="activity" className="data-[state=active]:bg-white rounded-full transition-all duration-300">
              <MessageSquare className="w-4 h-4 mr-2" />Activity
            </TabsTrigger>
          </TabsList>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="bg-white/70 backdrop-blur-md rounded-3xl p-6 shadow-lg"
            >
              <TabsContent value="info">
                <GroupInfo group={isEditing ? editedGroup : group} isEditing={isEditing} onInputChange={handleInputChange} />
              </TabsContent>
              <TabsContent value="members">
                <GroupMembers 
                  members={group.members} 
                  currentUser={group.currentUser}
                  onInvite={handleInvite}
                />
              </TabsContent>
              <TabsContent value="activity">
                <ActivitySection activities={group.activities} />
              </TabsContent>
            </motion.div>
          </AnimatePresence>
        </Tabs>
      </div>

      <motion.div
        className="fixed bottom-4 right-4"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: 'spring' }}
      >
        <Button
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
          onClick={handleLeaderboard}
        >
          <Sparkles className="w-5 h-5" />
          <span>Leaderboard</span>
        </Button>
      </motion.div>

      <InviteFriends isOpen={showInviteModal} onClose={() => setShowInviteModal(false)} groupName={group.name} />
    </div>
  );
};

export default GroupDetails;