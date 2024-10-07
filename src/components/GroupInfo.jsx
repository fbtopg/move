import React from 'react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Lock, Unlock, Users, Calendar, Trophy } from 'lucide-react';
import { Separator } from "@/components/ui/separator";
import ChallengeItem from './ChallengeItem';
import GroupImages from './GroupImages';

const GroupInfo = ({ group, isEditing, onInputChange }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {group.isPrivate ? (
            <Lock className="w-4 h-4 text-red-500" />
          ) : (
            <Unlock className="w-4 h-4 text-green-500" />
          )}
          <span className="text-sm font-medium">
            {group.isPrivate ? 'Private Group' : 'Public Group'}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <Users className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-500">{group.members.length} members</span>
        </div>
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
        <h3 className="font-semibold flex items-center">
          <Trophy className="w-5 h-5 mr-2 text-yellow-500" />
          Active Challenges
        </h3>
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

      <div className="space-y-4">
        <h3 className="font-semibold flex items-center">
          <Calendar className="w-5 h-5 mr-2 text-blue-500" />
          Upcoming Events
        </h3>
        {group.events && group.events.length > 0 ? (
          <div className="space-y-2">
            {group.events.map(event => (
              <div key={event.id} className="bg-white p-3 rounded-lg shadow-sm">
                <h4 className="font-medium">{event.title}</h4>
                <p className="text-sm text-gray-500">{event.date}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">No upcoming events</p>
        )}
      </div>

      <Separator className="my-4" />

      <GroupImages />
    </div>
  );
};

export default GroupInfo;