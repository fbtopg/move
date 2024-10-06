import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { handleImageUpload } from '../utils/imageUtils';
import GroupHeader from '../components/GroupHeader';
import GroupContentTabs from '../components/GroupContentTabs';
import { shareInvite } from '../utils/shareUtils';

const GroupDetails = () => {
  const navigate = useNavigate();
  const { groupId } = useParams();
  const location = useLocation();
  const [isEditing, setIsEditing] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [animateEntry, setAnimateEntry] = useState(location.state?.animateEntry || false);

  const defaultBannerImage = 'linear-gradient(to right, #2193b0, #6dd5ed)';

  // Mock current user data (replace with actual user data in a real app)
  const currentUser = {
    id: 'current-user-id',
    name: 'Current User',
    avatar: 'https://example.com/current-user-avatar.jpg'
  };

  // Sample members data
  const sampleMembers = [
    { id: '1', name: 'Alice Johnson', avatar: 'https://example.com/alice-avatar.jpg', username: 'alice_j' },
    { id: '2', name: 'Bob Smith', avatar: 'https://example.com/bob-avatar.jpg', username: 'bob_smith' },
    { id: '3', name: 'Carol White', avatar: 'https://example.com/carol-avatar.jpg', username: 'carol_w' },
    { id: '4', name: 'David Brown', avatar: 'https://example.com/david-avatar.jpg', username: 'david_b' },
  ];

  const [group, setGroup] = useState({
    id: groupId,
    name: location.state?.groupName || 'Loading...',
    image: location.state?.groupImage || 'https://example.com/default-group-image.jpg',
    bannerImage: location.state?.bannerImage || defaultBannerImage,
    description: location.state?.groupDescription || 'Loading...',
    isPrivate: location.state?.isPrivate || false,
    members: sampleMembers, // Initialize with sample members
    challenges: [],
    activities: [],
  });

  const [editedGroup, setEditedGroup] = useState({ ...group });

  useEffect(() => {
    if (location.state) {
      setGroup(prevGroup => ({
        ...prevGroup,
        ...location.state,
        members: sampleMembers, // Always use sample members for this example
        challenges: location.state.challenges || [],
        activities: location.state.activities || [],
      }));
      setEditedGroup(prevGroup => ({
        ...prevGroup,
        ...location.state,
        members: sampleMembers, // Always use sample members for this example
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

  const handleRemoveMember = (memberId) => {
    setGroup(prevGroup => ({
      ...prevGroup,
      members: prevGroup.members.filter(member => member.id !== memberId)
    }));
    setEditedGroup(prevGroup => ({
      ...prevGroup,
      members: prevGroup.members.filter(member => member.id !== memberId)
    }));
  };

  const handleImageChange = async (e, type) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const imageUrl = await handleImageUpload(file);
        setEditedGroup(prev => ({ ...prev, [type]: imageUrl }));
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditedGroup(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleInvite = () => {
    shareInvite(group.name);
  };

  const handleDelete = () => {
    setShowDeleteDialog(true);
  };

  const confirmDelete = () => {
    // Implement group deletion logic here
    console.log('Group deleted');
    navigate('/groups');
  };

  const handleLeaderboard = () => {
    // Implement leaderboard navigation or display logic here
    console.log('Navigate to leaderboard');
    // For example, you could navigate to a leaderboard page:
    // navigate(`/groups/${groupId}/leaderboard`);
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
          onInvite={handleInvite}
          onDelete={handleDelete}
          onLeaderboard={handleLeaderboard}
        />
        <GroupContentTabs
          group={isEditing ? editedGroup : group}
          isEditing={isEditing}
          onInputChange={handleInputChange}
          onRemoveMember={handleRemoveMember}
          onInvite={handleInvite}
          currentUser={currentUser}
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