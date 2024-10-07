import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

const GroupImages = ({ groupId }) => {
  const navigate = useNavigate();
  const groupImages = [
    "https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/etc/post.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvZXRjL3Bvc3QucG5nIiwiaWF0IjoxNzI4MjY3OTUwLCJleHAiOjE3NTk4MDM5NTB9.Lzd9qjY7y7nqN-hjyZaYLQTm8aS4-9nLaePOWgBe5_c&t=2024-10-07T02%3A25%3A51.211Z",
    "https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/group/groupimage/KakaoTalk_20241006_170019686_02.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvZ3JvdXAvZ3JvdXBpbWFnZS9LYWthb1RhbGtfMjAyNDEwMDZfMTcwMDE5Njg2XzAyLnBuZyIsImlhdCI6MTcyODIwMTc0MCwiZXhwIjoxNzU5NzM3NzQwfQ.9g3jxRi7TvLP9JqtrygRspEn3W-N6CFA9sNHScB753M&t=2024-10-06T08%3A02%3A21.066Z",
    "https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/group/groupimage/KakaoTalk_20241006_170019686_03.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvZ3JvdXAvZ3JvdXBpbWFnZS9LYWthb1RhbGtfMjAyNDEwMDZfMTcwMDE5Njg2XzAzLnBuZyIsImlhdCI6MTcyODIwMTc0OCwiZXhwIjoxNzU5NzM3NzQ4fQ.2EW-qLrPY46yHh3QLz6KIqxP7rbBvWgRsRewAsSopWA&t=2024-10-06T08%3A02%3A29.210Z",
    "https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/group/groupimage/KakaoTalk_20241006_170019686_04.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvZ3JvdXAvZ3JvdXBpbWFnZS9LYWthb1RhbGtfMjAyNDEwMDZfMTcwMDE5Njg2XzA0LnBuZyIsImlhdCI6MTcyODIwMTc1NSwiZXhwIjoxNzU5NzM3NzU1fQ.weayy67d9YQsRs_2I7w3QW5Bq0xF3i75HUYgzgsKEMk&t=2024-10-06T08%3A02%3A36.657Z",
    "https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/group/groupimage/KakaoTalk_20241006_170019686_05.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvZ3JvdXAvZ3JvdXBpbWFnZS9LYWthb1RhbGtfMjAyNDEwMDZfMTcwMDE5Njg2XzA1LnBuZyIsImlhdCI6MTcyODIwMTc2MywiZXhwIjoxNzU5NzM3NzYzfQ.okuLL0fuRPOg49fsjrHJkUcowTUURIAIikLO1nWRCsY&t=2024-10-06T08%3A02%3A44.412Z",
    "https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/group/groupimage/KakaoTalk_20241006_170019686_06.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvZ3JvdXAvZ3JvdXBpbWFnZS9LYWthb1RhbGtfMjAyNDEwMDZfMTcwMDE5Njg2XzA2LnBuZyIsImlhdCI6MTcyODIwMTc2OSwiZXhwIjoxNzU5NzM3NzY5fQ.hqNDVlSR_RowgFXQCUGfKorzhi2g6032mWtOXhWmK9k&t=2024-10-06T08%3A02%3A50.289Z",
    "https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/group/groupimage/KakaoTalk_20241006_170019686_07.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvZ3JvdXAvZ3JvdXBpbWFnZS9LYWthb1RhbGtfMjAyNDEwMDZfMTcwMDE5Njg2XzA3LnBuZyIsImlhdCI6MTcyODIwMTc3NSwiZXhwIjoxNzU5NzM3Nzc1fQ.tWtO-PLCF3TUhS6d-F2oBXRRaTdNp8TOZ7zZnWjU23c&t=2024-10-06T08%3A02%3A56.608Z",
    "https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/group/groupimage/KakaoTalk_20241006_170019686_08.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvZ3JvdXAvZ3JvdXBpbWFnZS9LYWthb1RhbGtfMjAyNDEwMDZfMTcwMDE5Njg2XzA4LnBuZyIsImlhdCI6MTcyODIwMTc4MywiZXhwIjoxNzU5NzM3NzgzfQ.zXhFEozmm52S1z_73srqaVrF4-LqyVtQ9QVXOf5zdxo&t=2024-10-06T08%3A03%3A04.361Z",
    "https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/group/groupimage/KakaoTalk_20241006_170019686.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvZ3JvdXAvZ3JvdXBpbWFnZS9LYWthb1RhbGtfMjAyNDEwMDZfMTcwMDE5Njg2LnBuZyIsImlhdCI6MTcyODIwMTc4OCwiZXhwIjoxNzU5NzM3Nzg4fQ.0uzkuZcTKuBSGS4Jjm6DcTFKI9QxIFKAe-bVT13wdME&t=2024-10-06T08%3A03%3A09.896Z"
  ];

  const handleViewAll = () => {
    navigate(`/group/${groupId}/images`);
  };

  return (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold">Images</h3>
        <Button variant="link" onClick={handleViewAll}>View All</Button>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {groupImages.slice(0, 6).map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Group image ${index + 1}`}
            className="w-full h-24 object-cover rounded-lg"
          />
        ))}
      </div>
    </div>
  );
};

export default GroupImages;
