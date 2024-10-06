import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from 'lucide-react';

const GroupImagesGrid = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();

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
    <div className="min-h-screen bg-[#FEF8F3] p-4">
      <Button
        variant="ghost"
        onClick={() => navigate(`/group/${groupId}`)}
        className="mb-4"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Group
      </Button>
      <h1 className="text-2xl font-bold mb-4">Group Images</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {groupImages.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Group image ${index + 1}`}
            className="w-full aspect-square object-cover rounded-lg"
          />
        ))}
      </div>
    </div>
  );
};

export default GroupImagesGrid;
