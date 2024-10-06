import React from 'react';
import { Users, Info, Lock, Unlock } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import GroupInfo from './GroupInfo';
import GroupMembers from './GroupMembers';
import EditGroupMembers from './EditGroupMembers';

const GroupContentTabs = ({ group, isEditing, onInputChange, onRemoveMember, onInvite, currentUser }) => (
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
    {isEditing ? (
      <div className="flex items-center justify-center space-x-2 mb-4">
        <Switch
          id="group-visibility"
          name="isPrivate"
          checked={group.isPrivate}
          onCheckedChange={(checked) => onInputChange({ target: { name: 'isPrivate', type: 'checkbox', checked } })}
        />
        <label htmlFor="group-visibility" className="text-sm font-medium">
          {group.isPrivate ? (
            <>
              <Lock className="inline-block mr-1 h-4 w-4" />
              Private
            </>
          ) : (
            <>
              <Unlock className="inline-block mr-1 h-4 w-4" />
              Public
            </>
          )}
        </label>
      </div>
    ) : (
      <span className={`text-sm block text-center ${group.isPrivate ? 'text-red-500' : 'text-green-500'}`}>
        {group.isPrivate ? 'Private' : 'Public'}
      </span>
    )}
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
          <GroupMembers members={group.members} currentUser={currentUser} onInvite={onInvite} />
        )}
      </TabsContent>
    </Tabs>
  </div>
);

export default GroupContentTabs;