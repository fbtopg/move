import React, { useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Info, MessageSquare, Sparkles } from 'lucide-react';
import GroupHeader from '../components/GroupHeader';
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
      <GroupHeader
        group={isEditing ? editedGroup : group}
        isEditing={isEditing}
        onEdit={handleEdit}
        onSave={handleSave}
        onCancel={handleCancel}
        onBack={() => navigate(-1)}
        onInvite={handleInvite}
        onDelete={handleDelete}
        onLeaderboard={handleLeaderboard}
        onJoin={handleJoin}
        onShare={handleShare}
      />
      
      <div className="flex-1 overflow-y-auto p-4 pt-20">
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
                <GroupInfo group={isEditing ? editedGroup : group} />
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
        <button
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
          onClick={handleLeaderboard}
        >
          <Sparkles className="w-5 h-5" />
          <span>Leaderboard</span>
        </button>
      </motion.div>

      <InviteFriends isOpen={showInviteModal} onClose={() => setShowInviteModal(false)} groupName={group.name} />
    </div>
  );
};

export default GroupDetails;