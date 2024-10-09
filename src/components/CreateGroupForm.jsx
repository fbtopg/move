import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { X, Upload } from 'lucide-react';
import { toast } from 'sonner';

const CreateGroupForm = ({ handleCreateGroup, onClose }) => {
  const [groupData, setGroupData] = useState({
    name: '',
    description: '',
    isPrivate: false,
    image: null
  });
  const [imageFile, setImageFile] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setGroupData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImageFile(e.target.files[0]);
      setGroupData(prev => ({ ...prev, image: URL.createObjectURL(e.target.files[0]) }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!groupData.name.trim()) {
      toast.error("Please enter a group name");
      return;
    }
    await handleCreateGroup({ ...groupData, imageFile });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col h-full relative">
      <Button
        type="button"
        onClick={onClose}
        className="absolute top-0 left-0 p-2 bg-gray-200 hover:bg-gray-300 rounded-full"
        variant="ghost"
      >
        <X className="h-6 w-6 text-gray-600" />
      </Button>
      <h2 className="text-3xl font-semibold mb-8 text-left roboto-medium text-gray-900 mt-16">Create a new group</h2>
      
      <div className="mb-4">
        <label htmlFor="groupName" className="block text-sm roboto-thin text-black mb-2">
          Group name
        </label>
        <Input
          id="groupName"
          name="name"
          value={groupData.name}
          onChange={handleInputChange}
          className="w-full text-lg border border-black rounded-md focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-300 px-3 py-2 bg-transparent text-gray-900"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="groupDescription" className="block text-sm roboto-thin text-black mb-2">
          Description
        </label>
        <Textarea
          id="groupDescription"
          name="description"
          value={groupData.description}
          onChange={handleInputChange}
          className="w-full text-lg border border-black rounded-md focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-300 px-3 py-2 bg-transparent text-gray-900"
          rows={4}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="groupImage" className="block text-sm roboto-thin text-black mb-2">
          Group Image
        </label>
        <div className="flex items-center space-x-2">
          <Button
            type="button"
            onClick={() => document.getElementById('groupImage').click()}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700"
          >
            <Upload className="mr-2 h-4 w-4" /> Upload Image
          </Button>
          {groupData.image && <img src={groupData.image} alt="Group" className="h-10 w-10 object-cover rounded" />}
        </div>
        <input
          type="file"
          id="groupImage"
          onChange={handleImageChange}
          className="hidden"
          accept="image/*"
        />
      </div>

      <div className="mb-4 flex items-center space-x-2">
        <Switch
          id="isPrivate"
          name="isPrivate"
          checked={groupData.isPrivate}
          onCheckedChange={(checked) => setGroupData(prev => ({ ...prev, isPrivate: checked }))}
        />
        <label htmlFor="isPrivate" className="text-sm roboto-thin text-black">
          Private Group
        </label>
      </div>

      <div className="mt-auto">
        <Button 
          type="submit" 
          className="w-full h-12 rounded-full text-lg font-light transition-all duration-300 bg-[#3B72EC] text-white hover:bg-[#3B72EC]/90"
        >
          Create Group
        </Button>
      </div>
    </form>
  );
};

export default CreateGroupForm;