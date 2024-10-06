import React from 'react';
import { ArrowLeft, Edit2, X, Camera, Check } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const GroupHeader = ({ group, onEdit, onSave, onCancel, onBack, isEditing, onImageChange, defaultBannerImage }) => (
  <div className="relative h-48">
    <div 
      className="absolute inset-0 bg-cover bg-center"
      style={{ backgroundImage: group.bannerImage.startsWith('http') ? `url(${group.bannerImage})` : group.bannerImage }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <label htmlFor="banner-upload" className={`absolute bottom-2 right-2 bg-black/50 p-2 rounded-full cursor-pointer ${isEditing ? 'visible' : 'invisible'}`}>
        <Camera className="text-white h-5 w-5" />
        <input
          id="banner-upload"
          type="file"
          className="hidden"
          onChange={(e) => onImageChange(e, 'bannerImage')}
          accept="image/*"
        />
      </label>
    </div>
    <Button
      variant="ghost"
      size="icon"
      className="absolute top-4 left-4 bg-black/50 text-white rounded-full"
      onClick={onBack}
    >
      <ArrowLeft className="h-6 w-6" />
    </Button>
    {isEditing ? (
      <div className="absolute top-4 right-4 flex space-x-2">
        <Button
          variant="ghost"
          size="icon"
          className="bg-green-500 text-white rounded-full"
          onClick={onSave}
        >
          <Check className="h-6 w-6" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="bg-red-500 text-white rounded-full"
          onClick={onCancel}
        >
          <X className="h-6 w-6" />
        </Button>
      </div>
    ) : (
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 right-4 bg-black/50 text-white rounded-full"
        onClick={onEdit}
      >
        <Edit2 className="h-6 w-6" />
      </Button>
    )}
    <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
      <div className="relative">
        <Avatar className="w-32 h-32 border-4 border-background">
          <AvatarImage src={group.image} alt={group.name} />
          <AvatarFallback>{group.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <label htmlFor="avatar-upload" className={`absolute bottom-0 right-0 bg-black/50 p-2 rounded-full cursor-pointer ${isEditing ? 'visible' : 'invisible'}`}>
          <Camera className="text-white h-5 w-5" />
          <input
            id="avatar-upload"
            type="file"
            className="hidden"
            onChange={(e) => onImageChange(e, 'image')}
            accept="image/*"
          />
        </label>
      </div>
    </div>
  </div>
);

export default GroupHeader;