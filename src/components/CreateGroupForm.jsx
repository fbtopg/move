import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Camera, Globe } from 'lucide-react';
import { Separator } from "@/components/ui/separator";

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

  const glassmorphicStyle = "bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-lg";
  const placeholderStyle = "placeholder:text-white placeholder:text-opacity-60 placeholder:font-bold";

  return (
    <form onSubmit={(e) => { e.preventDefault(); handleCreateGroup(); }} className="flex flex-col h-full">
      <div className="space-y-4 flex-grow overflow-y-auto pb-6">
        <div className={`relative w-40 h-40 mx-auto overflow-hidden ${glassmorphicStyle}`}>
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
              <Camera className="h-10 w-10 text-white" />
            </label>
          )}
        </div>

        <div className={`${glassmorphicStyle} p-2`}>
          <Input
            name="name"
            placeholder="Group Name"
            value={groupData.name}
            onChange={handleInputChange}
            className={`mb-1 bg-transparent text-white ${placeholderStyle} border-none text-lg font-bold h-12 ${errors.name ? 'border-red-500' : ''}`}
          />
        </div>
        {errors.name && <p className="text-red-300 text-xs">{errors.name}</p>}

        <div className={`${glassmorphicStyle} p-2`}>
          <Textarea
            name="description"
            placeholder="Description"
            value={groupData.description}
            onChange={handleInputChange}
            rows={3}
            className={`bg-transparent text-white ${placeholderStyle} border-none resize-none text-base h-24`}
          />
        </div>

        <Separator className="my-6 bg-white bg-opacity-20" />

        <div className="space-y-4">
          <h3 className="text-white text-base">Advanced Options</h3>
          <div className={`flex items-center justify-between p-3 ${glassmorphicStyle}`}>
            <div className="flex items-center">
              <Globe className="text-white h-4 w-4 mr-2" />
              <span className="text-white text-sm">Visibility</span>
            </div>
            <Select
              value={groupData.isPrivate ? 'private' : 'public'}
              onValueChange={(value) => setGroupData(prev => ({ ...prev, isPrivate: value === 'private' }))}
            >
              <SelectTrigger className={`bg-transparent border-none text-white w-24 h-10 ${placeholderStyle}`}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="public">Public</SelectItem>
                <SelectItem value="private">Private</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="mt-auto pt-4">
        <Button 
          type="submit" 
          className={`w-full text-white rounded-lg transition-all duration-300 ease-in-out h-12 text-base ${glassmorphicStyle}`}
        >
          Create Group
        </Button>
      </div>
    </form>
  );
};

export default CreateGroupForm;