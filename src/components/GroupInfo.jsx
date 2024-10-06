import React from 'react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Lock, Unlock } from 'lucide-react';
import ChallengeItem from './ChallengeItem';
import GroupImages from './GroupImages';

const GroupInfo = ({ group, isEditing, onInputChange }) => {
  return (
    <div className="space-y-8">
      {/* Block 1: Group Name, Visibility, and Description */}
      <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow">
        {isEditing ? (
          <Input
            name="name"
            value={group.name}
            onChange={onInputChange}
            className="text-2xl font-bold mb-2 text-center"
          />
        ) : (
          <h2 className="text-2xl font-bold mb-2 text-center">{group.name}</h2>
        )}

        <div className="flex items-center justify-center space-x-2 mb-4">
          {group.isPrivate ? (
            <Lock className="w-4 h-4 text-red-500" />
          ) : (
            <Unlock className="w-4 h-4 text-green-500" />
          )}
          <span className="text-sm font-medium">
            {group.isPrivate ? 'Private Group' : 'Public Group'}
          </span>
        </div>

        {isEditing ? (
          <Textarea
            name="description"
            value={group.description}
            onChange={onInputChange}
            className="mt-2"
            rows={4}
          />
        ) : (
          <p className="text-sm text-muted-foreground mt-2">{group.description}</p>
        )}
      </div>

      {/* Block 2: Active Challenges */}
      <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow">
        <h3 className="font-semibold mb-4">Active Challenges</h3>
        {group.challenges && group.challenges.length > 0 ? (
          <div className="space-y-2">
            {group.challenges.map(challenge => (
              <ChallengeItem key={challenge.id} challenge={challenge} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">No active challenges</p>
        )}
      </div>

      {/* Block 3: Group Images */}
      <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow">
        <GroupImages />
      </div>
    </div>
  );
};

export default GroupInfo;