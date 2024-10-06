import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Edit2, Users, Info } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const GroupDetails = () => {
  const navigate = useNavigate();
  const { groupId } = useParams();
  const [group, setGroup] = useState({
    id: groupId,
    name: 'Group Name',
    image: 'https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/group/Frame%20427319178.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvZ3JvdXAvRnJhbWUgNDI3MzE5MTc4LnBuZyIsImlhdCI6MTcyODE4MDM2MSwiZXhwIjoxNzU5NzE2MzYxfQ.PSxa6BBMUuxAdVHsXlJCivWEUNE3HXjGcIl3EkfUmFA&t=2024-10-06T02%3A06%3A02.233Z',
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

  const handleEdit = () => {
    // Implement edit functionality
    console.log('Edit group');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="relative h-64">
        <img src={group.image} alt={group.name} className="w-full h-full object-cover" />
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 left-4 bg-black/50 text-white rounded-full"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 bg-black/50 text-white rounded-full"
          onClick={handleEdit}
        >
          <Edit2 className="h-6 w-6" />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <h1 className="text-2xl font-bold mb-1">{group.name}</h1>
        <span className={`text-sm ${group.isPrivate ? 'text-red-500' : 'text-green-500'}`}>
          {group.isPrivate ? 'Private' : 'Public'}
        </span>

        <Tabs defaultValue="info" className="mt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="info">
              <Info className="w-4 h-4 mr-2" />
              Info
            </TabsTrigger>
            <TabsTrigger value="members">
              <Users className="w-4 h-4 mr-2" />
              Members
            </TabsTrigger>
          </TabsList>
          <TabsContent value="info">
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">{group.description}</p>
              
              <h3 className="font-semibold">Active Challenges</h3>
              <ul className="space-y-2">
                {group.challenges.map(challenge => (
                  <li key={challenge.id} className="text-sm">
                    {challenge.name} - {challenge.participants} participants
                  </li>
                ))}
              </ul>

              <h3 className="font-semibold">Recent Activities</h3>
              <ul className="space-y-2">
                {group.activities.map(activity => (
                  <li key={activity.id} className="text-sm">
                    <span className="font-medium">{activity.user}</span> {activity.action} - {activity.time}
                  </li>
                ))}
              </ul>
            </div>
          </TabsContent>
          <TabsContent value="members">
            <ul className="space-y-4">
              {group.members.map(member => (
                <li key={member.id} className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span>{member.name}</span>
                </li>
              ))}
            </ul>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default GroupDetails;