import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Camera, Globe } from 'lucide-react';

const CreateGroupForm = ({ groupData, setGroupData, errors, setErrors, handleCreateGroup }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setGroupData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setGroupData(prev => ({ ...prev, image: reader.result }));
        if (errors.image) setErrors(prev => ({ ...prev, image: '' }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); handleCreateGroup(); }} className="space-y-6 flex-grow">
      <div className="relative w-40 h-40 mx-auto bg-[#A0522D] rounded-lg overflow-hidden">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
          id="groupImageUpload"
        />
        {groupData.image ? (
          <img src={groupData.image} alt="Group" className="w-full h-full object-cover" />
        ) : (
          <label
            htmlFor="groupImageUpload"
            className="flex items-center justify-center w-full h-full cursor-pointer"
          >
            <div className="text-center">
              <Camera className="mx-auto h-8 w-8 text-white mb-2" />
              <p className="text-xs text-white">Upload Image</p>
            </div>
          </label>
        )}
      </div>

      <Input
        name="name"
        placeholder="Group Name"
        value={groupData.name}
        onChange={handleInputChange}
        className={`mb-1 bg-[#A0522D] text-white placeholder-gray-300 border-none rounded-lg ${errors.name ? 'border-red-500' : ''}`}
      />
      {errors.name && <p className="text-red-300 text-xs">{errors.name}</p>}

      <Textarea
        name="description"
        placeholder="Description"
        value={groupData.description}
        onChange={handleInputChange}
        rows={4}
        className="bg-[#A0522D] text-white placeholder-gray-300 border-none rounded-lg resize-none"
      />

      <div className="flex items-center space-x-2 bg-[#A0522D] p-3 rounded-lg">
        <Globe className="text-white h-5 w-5" />
        <Select
          value={groupData.isPrivate ? 'private' : 'public'}
          onValueChange={(value) => setGroupData(prev => ({ ...prev, isPrivate: value === 'private' }))}
        >
          <SelectTrigger className="bg-transparent border-none text-white">
            <SelectValue placeholder="Visibility" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="public">Public</SelectItem>
            <SelectItem value="private">Private</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button 
        type="submit" 
        className="w-full bg-[#D2691E] hover:bg-[#CD853F] text-white rounded-lg shadow-md transition-all duration-300 ease-in-out"
      >
        Create Group
      </Button>
    </form>
  );
};

export default CreateGroupForm;