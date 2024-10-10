import React, { useEffect, useRef } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { ArrowLeft, Share, Users, Camera } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useGroupData } from '../hooks/useGroupData';
import { useGroupActions } from '../hooks/useGroupActions';
import { uploadGroupImage, updateGroupImageUrl } from '../utils/supabaseStorageUtils';
import { toast } from 'sonner';

const GroupDetails = () => {
  const navigate = useNavigate();
  const { groupId } = useParams();
  const location = useLocation();
  const initialGroupData = location.state?.group;
  const fileInputRef = useRef(null);

  const { group, setGroup, loading } = useGroupData(groupId, initialGroupData);
  const { handleJoin } = useGroupActions(group, setGroup, navigate);

  useEffect(() => {
    // Add meta tag to prevent zooming
    const metaTag = document.createElement('meta');
    metaTag.name = 'viewport';
    metaTag.content = 'width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover';
    document.head.appendChild(metaTag);

    // Remove meta tag when component unmounts
    return () => {
      document.head.removeChild(metaTag);
    };
  }, []);

  const handleBack = () => navigate(-1);
  const handleShare = () => {
    console.log('Share group');
    // Implement share functionality
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const imageUrl = await uploadGroupImage(file, groupId);
        await updateGroupImageUrl(groupId, imageUrl);
        setGroup(prevGroup => ({ ...prevGroup, image: imageUrl }));
        toast.success('Group image updated successfully');
      } catch (error) {
        console.error('Error uploading image:', error);
        toast.error('Failed to update group image. Please try again.');
      }
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  if (loading) {
    return <div className="full-screen flex items-center justify-center">Loading...</div>;
  }

  if (!group) {
    return <div className="full-screen flex items-center justify-center">Group not found</div>;
  }

  return (
    <div className="full-screen flex flex-col bg-background text-foreground">
      <div className="relative h-48 bg-gray-200">
        {group.image ? (
          <img src={group.image} alt={group.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-gray-400">No image available</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-safe left-4 bg-white/80 rounded-full"
          onClick={handleBack}
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-safe right-4 bg-white/80 rounded-full"
          onClick={handleShare}
        >
          <Share className="h-6 w-6" />
        </Button>
        {!group.image && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full"
            onClick={triggerFileInput}
          >
            <Camera className="h-6 w-6" />
          </Button>
        )}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageUpload}
          accept="image/*"
          className="hidden"
        />
      </div>
      
      <div className="flex-1 p-4 overflow-y-auto pt-safe">
        <h1 className="text-2xl font-bold mb-1">{group.name}</h1>
        <p className="text-sm text-muted-foreground mb-2">
          <Users className="inline-block w-4 h-4 mr-1" />
          {group.members?.length || 0} Members
        </p>
        <p className="text-sm text-muted-foreground mb-4">{group.description}</p>
        {group.isPrivate && (
          <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
            Private
          </span>
        )}
      </div>

      <div className="p-4 border-t pb-safe">
        <Button
          className="w-full bg-black text-white hover:bg-black/90"
          onClick={handleJoin}
        >
          Join now
        </Button>
      </div>
    </div>
  );
};

export default GroupDetails;