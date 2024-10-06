import { useState } from 'react';

export const useGroupActions = (group, editedGroup, setEditedGroup, setGroup, setIsEditing, navigate) => {
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

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
    setEditedGroup(prevGroup => ({
      ...prevGroup,
      members: prevGroup.members.filter(member => member.id !== memberId)
    }));
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditedGroup(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleDelete = () => setShowDeleteDialog(true);

  const confirmDelete = () => {
    console.log('Group deleted');
    navigate('/groups');
  };

  const handleLeaderboard = () => {
    console.log('Navigate to leaderboard');
  };

  const handleJoin = () => {
    setEditedGroup(prevGroup => ({ ...prevGroup, isJoined: true }));
    console.log('Joined group:', group.id);
  };

  return {
    handleEdit,
    handleSave,
    handleCancel,
    handleConfirmCancel,
    handleRemoveMember,
    handleInputChange,
    handleDelete,
    confirmDelete,
    handleLeaderboard,
    handleJoin,
    showCancelDialog,
    setShowCancelDialog,
    showDeleteDialog,
    setShowDeleteDialog
  };
};