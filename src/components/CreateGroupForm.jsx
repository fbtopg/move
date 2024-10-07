import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Lock, Sparkles, Camera } from 'lucide-react';
import Cropper from 'react-easy-crop';

const CreateGroupForm = ({ groupData, errors, handleInputChange, handleImageChange, crop, setCrop, zoom, setZoom, onCropComplete }) => (
  <form onSubmit={(e) => { e.preventDefault(); }}>
    <Input
      name="name"
      placeholder="Group Name"
      value={groupData.name}
      onChange={handleInputChange}
      className={`mb-1 ${errors.name ? 'border-red-500' : ''}`}
    />
    {errors.name && <p className="text-red-500 text-xs mb-4">{errors.name}</p>}

    <div className="relative mb-1 h-60">
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
        id="groupImageUpload"
      />
      {groupData.image ? (
        <Cropper
          image={groupData.image}
          crop={crop}
          zoom={zoom}
          aspect={1}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      ) : (
        <label
          htmlFor="groupImageUpload"
          className={`flex items-center justify-center w-full h-full border-2 border-dashed rounded-lg cursor-pointer hover:border-primary transition-colors ${errors.image ? 'border-red-500' : 'border-input'}`}
        >
          <div className="text-center">
            <Camera className="mx-auto h-12 w-12 text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground">Upload Group Image</p>
          </div>
        </label>
      )}
    </div>
    {errors.image && <p className="text-red-500 text-xs mb-4">{errors.image}</p>}

    <Textarea
      name="description"
      placeholder="Group Description"
      value={groupData.description}
      onChange={handleInputChange}
      rows={4}
      className="mb-4"
    />

    <div className="flex items-center space-x-2 mb-6">
      <Switch
        id="private-mode"
        name="isPrivate"
        checked={groupData.isPrivate}
        onCheckedChange={(checked) => handleInputChange({ target: { name: 'isPrivate', type: 'checkbox', checked } })}
      />
      <label htmlFor="private-mode" className="text-sm font-medium leading-none">
        <Lock className="inline-block mr-2 h-4 w-4" />
        Private Group
      </label>
    </div>

    <Button type="submit" className="w-full">
      Create Group <Sparkles className="ml-2 h-4 w-4" />
    </Button>
  </form>
);

export default CreateGroupForm;