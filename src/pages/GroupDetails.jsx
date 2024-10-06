import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
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
  const [group, setGroup] = useState({
    id: groupId,
    name: location.state?.groupName || 'Group Name',
    image: location.state?.groupImage || 'https://example.com/default-group-image.jpg',
    description: location.state?.groupDescription || 'This is a group description.',
    isPrivate: location.state?.isPrivate || false,
    members: [
      { id: 1, name: 'John Doe', avatar: 'https://example.com/avatar1.jpg' },
      { id: 2, name: 'Jane Smith', avatar: 'https://example.com/avatar2.jpg' },
    ],
    challenges: [
      { id: 1, name: 'Daily Walk Challenge', participants: 5 },
      { id: 2, name: 'Weekly Quiz', participants: 8 },
    ],
    activities: [
      { id: 1, user: 'John Doe', action: 'completed a challenge', time: '2 hours ago' },
      { id: 2, user: 'Jane Smith', action: 'joined the group', time: '1 day ago' },
    ],
  });

  const [editedGroup, setEditedGroup] = useState({ ...group });

  useEffect(() => {
    // This effect will run when the component mounts and whenever location.state changes
    if (location.state) {
      setGroup(prevGroup => ({
        ...prevGroup,
        name: location.state.groupName || prevGroup.name,
        description: location.state.groupDescription || prevGroup.description,
        isPrivate: location.state.isPrivate || prevGroup.isPrivate,
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
    <div className="min-h-screen bg-background flex flex-col">
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
    </div>
  );
};

export default GroupDetails;