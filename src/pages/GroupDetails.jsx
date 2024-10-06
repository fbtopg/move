import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import GroupHeader from '../components/GroupHeader';
import GroupContentTabs from '../components/GroupContentTabs';
import { shareInvite } from '../utils/shareUtils';
import { Button } from "@/components/ui/button";

const GroupDetails = () => {
  const navigate = useNavigate();
  const { groupId } = useParams();
  const location = useLocation();
  const [isEditing, setIsEditing] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [animateEntry, setAnimateEntry] = useState(location.state?.animateEntry || false);
  const [group, setGroup] = useState(location.state || {});
  const [editedGroup, setEditedGroup] = useState({ ...group });

  useEffect(() => {
    if (location.state) {
      setGroup(prevGroup => ({
        ...prevGroup,
        ...location.state,
        members: location.state.members || [],
        challenges: location.state.challenges || [],
        activities: location.state.activities || [],
      }));
      setEditedGroup(prevGroup => ({
        ...prevGroup,
        ...location.state,
        members: location.state.members || [],
        challenges: location.state.challenges || [],
        activities: location.state.activities || [],
      }));
    }
  }, [location.state]);

  const handleEdit = () => setIsEditing(true);
  const handleSave = () => {
    setGroup(editedGroup);
    setIsEditing(false);
  };
  const handleCancel = () => {
    if (JSON.stringify(group) !== JSON.stringify(editedGroup)) {
      setShowCancelDialog(true);
    } else {
      setIsEditing(false);
    }
  };
  const handleConfirmCancel = () => {
    setEditedGroup({ ...group });
    setIsEditing(false);
    setShowCancelDialog(false);
  };
  const handleDelete = () => setShowDeleteDialog(true);
  const confirmDelete = () => {
    console.log('Group deleted');
    navigate('/groups');
  };
  const handleJoin = () => {
    console.log('Joined group');
    // Implement join logic here
  };

  return (
    <AnimatePresence>
      <motion.div
        className="min-h-screen bg-background flex flex-col"
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
          onInvite={shareInvite}
          onDelete={handleDelete}
          isDiscoverable={group.isDiscoverable}
        />
        {group.isDiscoverable && (
          <div className="px-4 py-2">
            <Button onClick={handleJoin} className="w-full bg-blue-500 hover:bg-blue-600 text-white">
              Join Group
            </Button>
          </div>
        )}
        <GroupContentTabs
          group={isEditing ? editedGroup : group}
          isEditing={isEditing}
          onInputChange={(e) => setEditedGroup(prev => ({ ...prev, [e.target.name]: e.target.value }))}
          onRemoveMember={(memberId) => setEditedGroup(prev => ({ ...prev, members: prev.members.filter(m => m.id !== memberId) }))}
          onInvite={shareInvite}
          currentUser={{ id: 'current-user-id', name: 'Current User', avatar: 'https://example.com/current-user-avatar.jpg' }}
        />
        <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Discard changes?</AlertDialogTitle>
              <AlertDialogDescription>
                You have unsaved changes. Are you sure you want to discard them?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Continue Editing</AlertDialogCancel>
              <AlertDialogAction onClick={handleConfirmCancel}>Discard Changes</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Group</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete this group? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={confirmDelete} className="bg-red-500 hover:bg-red-600">Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </motion.div>
    </AnimatePresence>
  );
};

export default GroupDetails;