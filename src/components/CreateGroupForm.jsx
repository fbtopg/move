import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Image, Plus } from 'lucide-react';

const CreateGroupForm = ({ handleCreateGroup }) => {
  const [groupData, setGroupData] = useState({
    name: '',
    description: '',
    isPrivate: false,
    capacity: 'unlimited',
    image: null
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setGroupData(prev => ({ ...prev, [name]: value }));
  };

  const handleCapacityChange = (value) => {
    setGroupData(prev => ({ ...prev, capacity: value }));
  };

  const handlePrivacyChange = (value) => {
    setGroupData(prev => ({ ...prev, isPrivate: value === 'private' }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setGroupData(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const isFormValid = groupData.name.trim() !== '';

  return (
    <form onSubmit={(e) => { e.preventDefault(); if (isFormValid) handleCreateGroup(groupData); }} className="space-y-6">
      <div>
        <Select
          value={groupData.isPrivate ? 'private' : 'public'}
          onValueChange={handlePrivacyChange}
        >
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Privacy" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="public">Public</SelectItem>
            <SelectItem value="private">Private</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Capacity</h3>
        <div className="flex space-x-2">
          {['unlimited', '2', '3', '4', '5'].map((value) => (
            <Button
              key={value}
              type="button"
              variant={groupData.capacity === value ? 'default' : 'outline'}
              className={`rounded-full w-12 h-12 ${value === 'unlimited' ? 'text-2xl' : ''}`}
              onClick={() => handleCapacityChange(value)}
            >
              {value === 'unlimited' ? '∞' : value}
            </Button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Detail</h3>
        <div className="bg-gray-100 rounded-lg p-4 flex items-center justify-center h-40">
          {groupData.image ? (
            <img src={groupData.image} alt="Group" className="max-h-full max-w-full object-contain" />
          ) : (
            <label htmlFor="groupImageUpload" className="cursor-pointer">
              <div className="flex flex-col items-center">
                <Image className="h-8 w-8 text-gray-400 mb-2" />
                <Plus className="h-6 w-6 text-gray-400" />
              </div>
            </label>
          )}
          <input
            id="groupImageUpload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </div>
      </div>

      <Input
        name="name"
        placeholder="Group Name"
        value={groupData.name}
        onChange={handleInputChange}
        className="w-full"
      />

      <Textarea
        name="description"
        placeholder="Description"
        value={groupData.description}
        onChange={handleInputChange}
        rows={3}
        className="w-full"
      />

      <Button 
        type="submit" 
        className="w-full bg-black text-white"
        disabled={!isFormValid}
      >
        Create Group
      </Button>
    </form>
  );
};

export default CreateGroupForm;