import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Edit2, Users, Info, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import GroupInfo from '../components/GroupInfo';
import GroupMembers from '../components/GroupMembers';
import EditGroupInfo from '../components/EditGroupInfo';
import EditGroupMembers from '../components/EditGroupMembers';

const GroupDetails = () => {
  const navigate = useNavigate();
  const { groupId } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [group, setGroup] = useState({
    id: groupId,
    name: 'Group Name',
    image: 'https://example.com/group-image.jpg', // This should be the uploaded image URL
    banner: 'https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/group/Frame%20427319178.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvZ3JvdXAvRnJhbWUgNDI3MzE5MTc4LnBuZyIsImlhdCI6MTcyODE4MDM2MSwiZXhwIjoxNzU5NzE2MzYxfQ.PSxa6BBMUuxAdVHsXlJCivWEUNE3HXjGcIl3EkfUmFA&t=2024-10-06T02%3A06%3A02.233Z',
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

  const handleEdit = () => setIsEditing(!isEditing);
  const handleSave = (updatedGroup) => {
    setGroup(updatedGroup);
    setIsEditing(false);
  };
  const handleRemoveMember = (memberId) => {
    setGroup(prevGroup => ({
      ...prevGroup,
      members: prevGroup.members.filter(member => member.id !== memberId)
    }));
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <GroupHeader group={group} onEdit={handleEdit} onBack={() => navigate(-1)} isEditing={isEditing} />
      <GroupContent
        group={group}
        isEditing={isEditing}
        onSave={handleSave}
        onRemoveMember={handleRemoveMember}
      />
    </div>
  );
};

const GroupHeader = ({ group, onEdit, onBack, isEditing }) => (
  <div className="relative h-48 bg-gradient-to-r from-blue-400 to-blue-600">
    <Button
      variant="ghost"
      size="icon"
      className="absolute top-4 left-4 bg-black/50 text-white rounded-full"
      onClick={onBack}
    >
      <ArrowLeft className="h-6 w-6" />
    </Button>
    <Button
      variant="ghost"
      size="icon"
      className="absolute top-4 right-4 bg-black/50 text-white rounded-full"
      onClick={onEdit}
    >
      {isEditing ? <X className="h-6 w-6" /> : <Edit2 className="h-6 w-6" />}
    </Button>
    <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
      <Avatar className="w-32 h-32 border-4 border-background">
        <AvatarImage src={group.image} alt={group.name} />
        <AvatarFallback>{group.name.charAt(0)}</AvatarFallback>
      </Avatar>
    </div>
  </div>
);

const GroupContent = ({ group, isEditing, onSave, onRemoveMember }) => (
  <div className="flex-1 overflow-y-auto p-4 pt-20">
    <h1 className="text-2xl font-bold mb-1 text-center">{group.name}</h1>
    <span className={`text-sm block text-center ${group.isPrivate ? 'text-red-500' : 'text-green-500'}`}>
      {group.isPrivate ? 'Private' : 'Public'}
    </span>
    <Tabs defaultValue="info" className="mt-4">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="info"><Info className="w-4 h-4 mr-2" />Info</TabsTrigger>
        <TabsTrigger value="members"><Users className="w-4 h-4 mr-2" />Members</TabsTrigger>
      </TabsList>
      <TabsContent value="info">
        {isEditing ? <EditGroupInfo group={group} onSave={onSave} /> : <GroupInfo group={group} />}
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