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
      <div className="relative w-48 h-48 mx-auto bg-white rounded-lg overflow-hidden shadow-md">
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
            <Camera className="h-12 w-12 text-gray-400" />
          </label>
        )}
      </div>

      <Input
        name="name"
        placeholder="Group Name"
        value={groupData.name}
        onChange={handleInputChange}
        className={`mb-1 bg-white text-foreground placeholder-gray-400 border border-gray-200 rounded-lg ${errors.name ? 'border-red-500' : ''}`}
      />
      {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}

      <Textarea
        name="description"
        placeholder="Description"
        value={groupData.description}
        onChange={handleInputChange}
        rows={4}
        className="bg-white text-foreground placeholder-gray-400 border border-gray-200 rounded-lg resize-none"
      />

      <div className="flex items-center justify-between bg-white p-3 rounded-lg border border-gray-200">
        <div className="flex items-center">
          <Globe className="text-gray-500 h-5 w-5 mr-2" />
          <span className="text-foreground">Visibility</span>
        </div>
        <Select
          value={groupData.isPrivate ? 'private' : 'public'}
          onValueChange={(value) => setGroupData(prev => ({ ...prev, isPrivate: value === 'private' }))}
        >
          <SelectTrigger className="bg-transparent border-none text-foreground w-24">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="public">Public</SelectItem>
            <SelectItem value="private">Private</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button 
        type="submit" 
        className="w-full bg-[#3B72EC] hover:bg-[#3B72EC]/90 text-white rounded-lg shadow-md transition-all duration-300 ease-in-out"
      >
        Create Group
      </Button>
    </form>
  );
};

export default CreateGroupForm;