import React from 'react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Lock, Unlock } from 'lucide-react';
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import ChallengeItem from './ChallengeItem';
import GroupImages from './GroupImages';

const GroupInfo = ({ group, isEditing, onInputChange }) => {
  return (
    <div className="space-y-6">
      {isEditing ? (
        <Input
          name="name"
          value={group.name}
          onChange={onInputChange}
          className="text-2xl font-bold mb-1 text-center"
        />
      ) : (
        <h2 className="text-2xl font-bold mb-1 text-center">{group.name}</h2>
      )}

      <div className="flex items-center justify-center space-x-2">
        {isEditing ? (
          <Switch
            name="isPrivate"
            checked={group.isPrivate}
            onCheckedChange={(checked) => onInputChange({ target: { name: 'isPrivate', value: checked } })}
          />
        ) : group.isPrivate ? (
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
          className="mt-2 mb-4"
          rows={4}
        />
      ) : (
        <p className="text-sm text-muted-foreground mt-2 mb-4">{group.description}</p>
      )}

      <Separator className="my-4" />

      <div className="space-y-4">
        <h3 className="font-semibold">Active Challenges</h3>
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

      <Separator className="my-4" />

      <GroupImages />
    </div>
  );
};

export default GroupInfo;