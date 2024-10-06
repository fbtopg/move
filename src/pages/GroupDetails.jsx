import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { handleImageUpload } from '../utils/imageUtils';
import GroupHeader from '../components/GroupHeader';
import GroupContentTabs from '../components/GroupContentTabs';
import { shareInvite } from '../utils/shareUtils';
import { UserPlus } from 'lucide-react';

const GroupDetails = () => {
  const navigate = useNavigate();
  const { groupId } = useParams();
  const location = useLocation();
  const [isEditing, setIsEditing] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [animateEntry, setAnimateEntry] = useState(location.state?.animateEntry || false);

  const [group, setGroup] = useState({
    id: groupId,
    name: 'Loading...',
    image: 'https://example.com/default-group-image.jpg',
    bannerImage: 'https://example.com/default-banner-image.jpg',
    description: 'Loading...',
    isPrivate: false,
    members: [],
    challenges: [],
    activities: [],
  });

  const [editedGroup, setEditedGroup] = useState({ ...group });

  useEffect(() => {
    if (location.state) {
      setGroup(prevGroup => ({
        ...prevGroup,
        ...location.state,
        challenges: location.state.challenges || [],
        activities: location.state.activities || [],
      }));
      setEditedGroup(prevGroup => ({
        ...prevGroup,
        ...location.state,
        challenges: location.state.challenges || [],
        activities: location.state.activities || [],
      }));
    }
  }, [location.state]);

  const handleEdit = () => setIsEditing(!isEditing);
  
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
          onEdit={handleEdit}
          onSave={handleSave}
          onCancel={handleCancel}
          onBack={() => navigate(-1)}
          isEditing={isEditing}
          onImageChange={handleImageChange}
        />
        <div className="flex justify-end px-4 mt-2">
          <Button onClick={handleInvite} className="bg-primary text-primary-foreground">
            <UserPlus className="mr-2 h-4 w-4" />
            Invite
          </Button>
        </div>
        <GroupContentTabs
          group={isEditing ? editedGroup : group}
          isEditing={isEditing}
          onInputChange={handleInputChange}
          onRemoveMember={handleRemoveMember}
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
      </motion.div>
    </AnimatePresence>
  );
};

export default GroupDetails;
