import React, { useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { ArrowLeft, Edit2, Users, Info, X, Camera, Check } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import GroupInfo from '../components/GroupInfo';
import GroupMembers from '../components/GroupMembers';
import EditGroupMembers from '../components/EditGroupMembers';
import { handleImageUpload } from '../utils/imageUtils';

const GroupDetails = () => {
  const navigate = useNavigate();
  const { groupId } = useParams();
  const location = useLocation();
  const [isEditing, setIsEditing] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [group, setGroup] = useState({
    id: groupId,
    name: 'Group Name',
    image: location.state?.groupImage || 'https://example.com/default-group-image.jpg',
    description: 'This is a group description.',
    isPrivate: false,
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
    const { name, value } = e.target;
    setEditedGroup(prev => ({ ...prev, [name]: value }));
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
      <GroupContent
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

const GroupHeader = ({ group, onEdit, onSave, onCancel, onBack, isEditing, onImageChange }) => (
  <div className="relative h-48">
    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600">
      <label htmlFor="banner-upload" className={`absolute bottom-2 right-2 bg-black/50 p-2 rounded-full cursor-pointer ${isEditing ? 'visible' : 'invisible'}`}>
        <Camera className="text-white h-5 w-5" />
        <input
          id="banner-upload"
          type="file"
          className="hidden"
          onChange={(e) => onImageChange(e, 'image')}
          accept="image/*"
        />
      </label>
    </div>
    <Button
      variant="ghost"
      size="icon"
      className="absolute top-4 left-4 bg-black/50 text-white rounded-full"
      onClick={onBack}
    >
      <ArrowLeft className="h-6 w-6" />
    </Button>
    {isEditing ? (
      <div className="absolute top-4 right-4 flex space-x-2">
        <Button
          variant="ghost"
          size="icon"
          className="bg-green-500 text-white rounded-full"
          onClick={onSave}
        >
          <Check className="h-6 w-6" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="bg-red-500 text-white rounded-full"
          onClick={onCancel}
        >
          <X className="h-6 w-6" />
        </Button>
      </div>
    ) : (
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 right-4 bg-black/50 text-white rounded-full"
        onClick={onEdit}
      >
        <Edit2 className="h-6 w-6" />
      </Button>
    )}
    <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
      <div className="relative">
        <Avatar className="w-32 h-32 border-4 border-background">
          <AvatarImage src={group.image} alt={group.name} />
          <AvatarFallback>{group.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <label htmlFor="avatar-upload" className={`absolute bottom-0 right-0 bg-black/50 p-2 rounded-full cursor-pointer ${isEditing ? 'visible' : 'invisible'}`}>
          <Camera className="text-white h-5 w-5" />
          <input
            id="avatar-upload"
            type="file"
            className="hidden"
            onChange={(e) => onImageChange(e, 'image')}
            accept="image/*"
          />
        </label>
      </div>
    </div>
  </div>
);

const GroupContent = ({ group, isEditing, onInputChange, onRemoveMember }) => (
  <div className="flex-1 overflow-y-auto p-4 pt-20">
    {isEditing ? (
      <Input
        name="name"
        value={group.name}
        onChange={onInputChange}
        className="text-2xl font-bold mb-1 text-center"
      />
    ) : (
      <h1 className="text-2xl font-bold mb-1 text-center">{group.name}</h1>
    )}
    <span className={`text-sm block text-center ${group.isPrivate ? 'text-red-500' : 'text-green-500'}`}>
      {group.isPrivate ? 'Private' : 'Public'}
    </span>
    <Tabs defaultValue="info" className="mt-4">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="info"><Info className="w-4 h-4 mr-2" />Info</TabsTrigger>
        <TabsTrigger value="members"><Users className="w-4 h-4 mr-2" />Members</TabsTrigger>
      </TabsList>
      <TabsContent value="info">
        {isEditing ? (
          <Textarea
            name="description"
            value={group.description}
            onChange={onInputChange}
            className="mt-2"
            rows={4}
          />
        ) : (
          <GroupInfo group={group} />
        )}
      </TabsContent>
      <TabsContent value="members">
        {isEditing ? (
          <EditGroupMembers members={group.members} onRemoveMember={onRemoveMember} />
        ) : (
          <GroupMembers members={group.members} />
        )}
      </TabsContent>
    </Tabs>
  </div>
);

export default GroupDetails;