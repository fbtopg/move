import React from 'react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Lock, Unlock } from 'lucide-react';
import ChallengeItem from './ChallengeItem';

const GroupInfo = ({ group, isEditing, onInputChange }) => {
  const groupImages = [
    "https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/group/groupimage/KakaoTalk_20241006_170019686_01.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvZ3JvdXAvZ3JvdXBpbWFnZS9LYWthb1RhbGtfMjAyNDEwMDZfMTcwMDE5Njg2XzAxLnBuZyIsImlhdCI6MTcyODIwMTczMCwiZXhwIjoxNzU5NzM3NzMwfQ.2ysY_1uubl9YPf3wIMyJDyEqVLnDz-Hv3IEvyTBsMDg&t=2024-10-06T08%3A02%3A12.141Z",
    "https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/group/groupimage/KakaoTalk_20241006_170019686_02.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvZ3JvdXAvZ3JvdXBpbWFnZS9LYWthb1RhbGtfMjAyNDEwMDZfMTcwMDE5Njg2XzAyLnBuZyIsImlhdCI6MTcyODIwMTc0MCwiZXhwIjoxNzU5NzM3NzQwfQ.9g3jxRi7TvLP9JqtrygRspEn3W-N6CFA9sNHScB753M&t=2024-10-06T08%3A02%3A21.066Z",
    "https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/group/groupimage/KakaoTalk_20241006_170019686_03.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvZ3JvdXAvZ3JvdXBpbWFnZS9LYWthb1RhbGtfMjAyNDEwMDZfMTcwMDE5Njg2XzAzLnBuZyIsImlhdCI6MTcyODIwMTc0OCwiZXhwIjoxNzU5NzM3NzQ4fQ.2EW-qLrPY46yHh3QLz6KIqxP7rbBvWgRsRewAsSopWA&t=2024-10-06T08%3A02%3A29.210Z",
    "https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/group/groupimage/KakaoTalk_20241006_170019686_04.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvZ3JvdXAvZ3JvdXBpbWFnZS9LYWthb1RhbGtfMjAyNDEwMDZfMTcwMDE5Njg2XzA0LnBuZyIsImlhdCI6MTcyODIwMTc1NSwiZXhwIjoxNzU5NzM3NzU1fQ.weayy67d9YQsRs_2I7w3QW5Bq0xF3i75HUYgzgsKEMk&t=2024-10-06T08%3A02%3A36.657Z",
    "https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/group/groupimage/KakaoTalk_20241006_170019686_05.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvZ3JvdXAvZ3JvdXBpbWFnZS9LYWthb1RhbGtfMjAyNDEwMDZfMTcwMDE5Njg2XzA1LnBuZyIsImlhdCI6MTcyODIwMTc2MywiZXhwIjoxNzU5NzM3NzYzfQ.okuLL0fuRPOg49fsjrHJkUcowTUURIAIikLO1nWRCsY&t=2024-10-06T08%3A02%3A44.412Z",
    "https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/group/groupimage/KakaoTalk_20241006_170019686_06.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvZ3JvdXAvZ3JvdXBpbWFnZS9LYWthb1RhbGtfMjAyNDEwMDZfMTcwMDE5Njg2XzA2LnBuZyIsImlhdCI6MTcyODIwMTc2OSwiZXhwIjoxNzU5NzM3NzY5fQ.hqNDVlSR_RowgFXQCUGfKorzhi2g6032mWtOXhWmK9k&t=2024-10-06T08%3A02%3A50.289Z",
    "https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/group/groupimage/KakaoTalk_20241006_170019686_07.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvZ3JvdXAvZ3JvdXBpbWFnZS9LYWthb1RhbGtfMjAyNDEwMDZfMTcwMDE5Njg2XzA3LnBuZyIsImlhdCI6MTcyODIwMTc3NSwiZXhwIjoxNzU5NzM3Nzc1fQ.tWtO-PLCF3TUhS6d-F2oBXRRaTdNp8TOZ7zZnWjU23c&t=2024-10-06T08%3A02%3A56.608Z",
    "https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/group/groupimage/KakaoTalk_20241006_170019686_08.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvZ3JvdXAvZ3JvdXBpbWFnZS9LYWthb1RhbGtfMjAyNDEwMDZfMTcwMDE5Njg2XzA4LnBuZyIsImlhdCI6MTcyODIwMTc4MywiZXhwIjoxNzU5NzM3NzgzfQ.zXhFEozmm52S1z_73srqaVrF4-LqyVtQ9QVXOf5zdxo&t=2024-10-06T08%3A03%3A04.361Z",
    "https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/group/groupimage/KakaoTalk_20241006_170019686.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvZ3JvdXAvZ3JvdXBpbWFnZS9LYWthb1RhbGtfMjAyNDEwMDZfMTcwMDE5Njg2LnBuZyIsImlhdCI6MTcyODIwMTc4OCwiZXhwIjoxNzU5NzM3Nzg4fQ.0uzkuZcTKuBSGS4Jjm6DcTFKI9QxIFKAe-bVT13wdME&t=2024-10-06T08%3A03%3A09.896Z"
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-white rounded-lg p-4 shadow-md">
        <h3 className="font-semibold mb-3">Group Details</h3>
        {isEditing ? (
          <Input
            name="name"
            value={group.name}
            onChange={onInputChange}
            className="text-xl font-bold mb-2"
          />
        ) : (
          <h2 className="text-xl font-bold mb-2">{group.name}</h2>
        )}

        <div className="flex items-center space-x-2 mb-3">
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

      <div className="bg-white rounded-lg p-4 shadow-md">
        <h3 className="font-semibold mb-3">Active Challenges</h3>
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

      <div className="bg-white rounded-lg p-4 shadow-md">
        <h3 className="font-semibold mb-3">Group Images</h3>
        <div className="grid grid-cols-3 gap-2">
          {groupImages.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Group image ${index + 1}`}
              className="w-full h-24 object-cover rounded-lg"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GroupInfo;