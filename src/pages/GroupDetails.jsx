import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Info, MessageSquare } from 'lucide-react';
import GroupHeader from '../components/GroupHeader';
import GroupContentTabs from '../components/GroupContentTabs';
import { shareInvite } from '../utils/shareUtils';
import { useGroupData } from '../hooks/useGroupData';
import { useGroupActions } from '../hooks/useGroupActions';
import InviteFriends from '../components/InviteFriends';
import ActivitySection from '../components/ActivitySection';

const GroupDetails = () => {
  const navigate = useNavigate();
  const { groupId } = useParams();
  const location = useLocation();
  const [isEditing, setIsEditing] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [animateEntry, setAnimateEntry] = useState(location.state?.animateEntry || false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [activeTab, setActiveTab] = useState('info');

  const { group, editedGroup, setEditedGroup } = useGroupData(groupId, location.state);
  const { handleEdit, handleSave, handleCancel, handleConfirmCancel, handleRemoveMember, handleInputChange, handleDelete, confirmDelete, handleLeaderboard, handleJoin } = useGroupActions(group, editedGroup, setEditedGroup, setIsEditing, navigate);

  const handleInvite = () => {
    setShowInviteModal(true);
  };
  
  const handleShare = () => shareInvite(group.name);

  return (
    <AnimatePresence>
      <motion.div
        className="min-h-screen bg-gradient-to-b from-[#FEF8F3] to-[#F0E7E0] flex flex-col"
        initial={animateEntry ? { opacity: 0, y: 50 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        onAnimationComplete={() => setAnimateEntry(false)}
      >
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
        
        <motion.div 
          className="flex-1 overflow-y-auto p-4 pt-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Tabs defaultValue="info" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3 mb-4">
              <TabsTrigger value="info"><Info className="w-4 h-4 mr-2" />Info</TabsTrigger>
              <TabsTrigger value="members"><Users className="w-4 h-4 mr-2" />Members</TabsTrigger>
              <TabsTrigger value="activity"><MessageSquare className="w-4 h-4 mr-2" />Activity</TabsTrigger>
            </TabsList>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                <TabsContent value="info">
                  <GroupContentTabs
                    group={isEditing ? editedGroup : group}
                    isEditing={isEditing}
                    onInputChange={handleInputChange}
                    currentUser={group.currentUser}
                  />
                </TabsContent>
                <TabsContent value="members">
                  <GroupContentTabs
                    group={isEditing ? editedGroup : group}
                    isEditing={isEditing}
                    onInputChange={handleInputChange}
                    onRemoveMember={handleRemoveMember}
                    currentUser={group.currentUser}
                  />
                </TabsContent>
                <TabsContent value="activity">
                  <ActivitySection activities={group.activities} />
                </TabsContent>
              </motion.div>
            </AnimatePresence>
          </Tabs>
        </motion.div>

        <CancelDialog open={showCancelDialog} onOpenChange={setShowCancelDialog} onConfirm={handleConfirmCancel} />
        <DeleteDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog} onConfirm={confirmDelete} />
        <InviteFriends isOpen={showInviteModal} onClose={() => setShowInviteModal(false)} groupName={group.name} />
      </motion.div>
    </AnimatePresence>
  );
};

const CancelDialog = ({ open, onOpenChange, onConfirm }) => (
  <AlertDialog open={open} onOpenChange={onOpenChange}>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Discard changes?</AlertDialogTitle>
        <AlertDialogDescription>
          You have unsaved changes. Are you sure you want to discard them?
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Continue Editing</AlertDialogCancel>
        <AlertDialogAction onClick={onConfirm}>Discard Changes</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);

const DeleteDialog = ({ open, onOpenChange, onConfirm }) => (
  <AlertDialog open={open} onOpenChange={onOpenChange}>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Delete Group</AlertDialogTitle>
        <AlertDialogDescription>
          Are you sure you want to delete this group? This action cannot be undone.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction onClick={onConfirm} className="bg-red-500 hover:bg-red-600">Delete</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);

export default GroupDetails;