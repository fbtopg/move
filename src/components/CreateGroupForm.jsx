import React, { useState, useRef } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Image, Lock, Globe } from 'lucide-react';

const CreateGroupForm = ({ handleCreateGroup }) => {
  const [groupData, setGroupData] = useState({
    name: '',
    description: '',
    isPrivate: false,
    capacity: 'unlimited',
    image: null
  });
  const [selectedCapacity, setSelectedCapacity] = useState('∞');
  const capacityRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setGroupData(prev => ({ ...prev, [name]: value }));
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

  const handleCapacityChange = (capacity) => {
    setSelectedCapacity(capacity);
    setGroupData(prev => ({ ...prev, capacity: capacity === '∞' ? 'unlimited' : capacity }));
  };

  const isFormValid = groupData.name.trim() !== '';

  const capacityOptions = ['∞', ...Array.from({ length: 99 }, (_, i) => (i + 2).toString())];

  return (
    <form onSubmit={(e) => { e.preventDefault(); if (isFormValid) handleCreateGroup(groupData); }} className="space-y-6">
      <div className="bg-muted rounded-lg p-4 flex items-center justify-center h-40 mb-6">
        {groupData.image ? (
          <img src={groupData.image} alt="Group" className="max-h-full max-w-full object-contain rounded-lg" />
        ) : (
          <label htmlFor="groupImageUpload" className="cursor-pointer flex flex-col items-center">
            <div className="bg-background rounded-full p-3 mb-2">
              <Image className="h-8 w-8 text-primary" />
            </div>
            <span className="text-sm text-muted-foreground">Add group image</span>
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

      <Input
        name="name"
        placeholder="Group Name"
        value={groupData.name}
        onChange={handleInputChange}
        className="w-full text-lg"
      />

      <Textarea
        name="description"
        placeholder="Description (optional)"
        value={groupData.description}
        onChange={handleInputChange}
        rows={3}
        className="w-full resize-none"
      />

      <div className="flex justify-between items-center">
        <Select
          value={groupData.isPrivate ? 'private' : 'public'}
          onValueChange={handlePrivacyChange}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Privacy" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="public">
              <div className="flex items-center">
                <Globe className="mr-2 h-4 w-4" />
                Public
              </div>
            </SelectItem>
            <SelectItem value="private">
              <div className="flex items-center">
                <Lock className="mr-2 h-4 w-4" />
                Private
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <h3 className="text-sm font-medium text-muted-foreground mb-2">Group Capacity</h3>
        <div 
          ref={capacityRef}
          className="flex overflow-x-auto pb-4 scrollbar-hide"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {capacityOptions.map((capacity) => (
            <div
              key={capacity}
              className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center mx-2 text-sm ${
                selectedCapacity === capacity ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
              }`}
              style={{ scrollSnapAlign: 'center' }}
              onClick={() => handleCapacityChange(capacity)}
            >
              {capacity}
            </div>
          ))}
        </div>
        <p className="text-center text-sm text-muted-foreground mt-2">
          {groupData.capacity === 'unlimited' ? 'Unlimited' : `${groupData.capacity} members`}
        </p>
      </div>

      <Button 
        type="submit" 
        className="w-full bg-primary text-primary-foreground"
        disabled={!isFormValid}
      >
        Create Group
      </Button>
    </form>
  );
};

export default CreateGroupForm;
