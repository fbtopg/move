import React from 'react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Lock, Unlock } from 'lucide-react';
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import ChallengeItem from './ChallengeItem';
import GroupImages from './GroupImages';

const GroupInfo = ({ group, onInputChange }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Switch
            checked={group.isPrivate}
            onCheckedChange={(checked) => onInputChange('isPrivate', checked)}
          />
          {group.isPrivate ? (
            <Lock className="w-4 h-4 text-red-500" />
          ) : (
            <Unlock className="w-4 h-4 text-green-500" />
          )}
          <span className="text-sm font-medium">
            {group.isPrivate ? 'Private Group' : 'Public Group'}
          </span>
        </div>
      </div>

      <Textarea
        value={group.description}
        onChange={(e) => onInputChange('description', e.target.value)}
        className="mt-2 mb-4"
        rows={4}
        placeholder="Group Description"
      />

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

      <GroupImages groupId={group.id} />
    </div>
  );
};

export default GroupInfo;