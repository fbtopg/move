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

  const isFormValid = groupData.image && groupData.name.trim() !== '';

  const glassmorphicStyle = "bg-white/10 backdrop-filter backdrop-blur-lg rounded-lg border border-white/20";
  const inputStyle = "bg-transparent text-gray-800 placeholder:text-gray-600";

  return (
    <form onSubmit={(e) => { e.preventDefault(); if (isFormValid) handleCreateGroup(); }} className="flex flex-col h-full">
      <div className="space-y-4 flex-grow overflow-y-auto pb-6">
        <div className={`relative w-48 h-48 mx-auto overflow-hidden ${glassmorphicStyle} mb-6`}>
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
              <Camera className="h-12 w-12 text-gray-600" />
            </label>
          )}
        </div>

        <div className={`${glassmorphicStyle} p-2`}>
          <Input
            name="name"
            placeholder="Group Name"
            value={groupData.name}
            onChange={handleInputChange}
            className={`mb-1 ${inputStyle} border-none text-lg font-bold h-12 ${errors.name ? 'border-red-500' : ''}`}
          />
        </div>
        {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}

        <div className={`${glassmorphicStyle} p-2`}>
          <Textarea
            name="description"
            placeholder="Describe your group"
            value={groupData.description}
            onChange={handleInputChange}
            rows={3}
            className={`${inputStyle} border-none resize-none text-base h-24`}
          />
        </div>

        <Separator className="my-6 bg-gray-400/20" />

        <div className="space-y-4">
          <h3 className="text-gray-800 text-base">Advanced Options</h3>
          <div className={`flex items-center justify-between p-3 ${glassmorphicStyle}`}>
            <div className="flex items-center">
              <Globe className="text-gray-600 h-4 w-4 mr-2" />
              <span className="text-gray-800 text-sm">Visibility</span>
            </div>
            <Select
              value={groupData.isPrivate ? 'private' : 'public'}
              onValueChange={(value) => setGroupData(prev => ({ ...prev, isPrivate: value === 'private' }))}
            >
              <SelectTrigger className={`${inputStyle} border-none w-24 h-10`}>
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
          className={`w-full rounded-lg transition-all duration-300 ease-in-out h-12 text-base ${
            isFormValid 
              ? 'bg-[#3B72EC] text-white hover:bg-[#3B72EC]/90' 
              : `${glassmorphicStyle} text-gray-500 opacity-50 cursor-not-allowed`
          }`}
          disabled={!isFormValid}
        >
          Create Group
        </Button>
      </div>
    </form>
  );
};

export default CreateGroupForm;