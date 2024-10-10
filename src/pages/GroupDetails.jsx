import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from "@/components/ui/button";
import { ArrowLeft, Camera } from 'lucide-react';
import { uploadGroupImage, updateGroupImageUrl } from '../utils/supabaseStorageUtils';
import { supabase } from '../integrations/supabase/supabase';

const GroupDetails = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isUploading, setIsUploading] = useState(false);

  const { data: group, isLoading, error } = useQuery({
    queryKey: ['group', groupId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('groups')
        .select('*')
        .eq('id', groupId)
        .single();
      if (error) throw error;
      return data;
    },
  });

  const uploadMutation = useMutation({
    mutationFn: async (file) => {
      setIsUploading(true);
      const imageUrl = await uploadGroupImage(file, groupId);
      await updateGroupImageUrl(groupId, imageUrl);
      return imageUrl;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['group', groupId]);
      setIsUploading(false);
    },
    onError: (error) => {
      console.error('Error uploading image:', error);
      setIsUploading(false);
    },
  });

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      uploadMutation.mutate(file);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading group details</div>;

  return (
    <div className="min-h-screen bg-[#FEF8F3] p-4">
      <Button
        variant="ghost"
        onClick={() => navigate(-1)}
        className="mb-4"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>
      <div className="relative mb-4">
        <img
          src={group.image || 'https://via.placeholder.com/400x200'}
          alt={group.name}
          className="w-full h-48 object-cover rounded-lg"
        />
        <label htmlFor="imageUpload" className="absolute bottom-2 right-2 cursor-pointer">
          <div className="bg-black bg-opacity-50 text-white p-2 rounded-full">
            <Camera className="h-6 w-6" />
          </div>
          <input
            id="imageUpload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
            disabled={isUploading}
          />
        </label>
      </div>
      <h1 className="text-2xl font-bold mb-2">{group.name}</h1>
      <p className="text-gray-600 mb-4">{group.description}</p>
      {/* Add more group details here */}
    </div>
  );
};

export default GroupDetails;