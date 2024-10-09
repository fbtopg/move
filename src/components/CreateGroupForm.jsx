import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X } from 'lucide-react';
import { toast } from 'sonner';

const CreateGroupForm = ({ handleCreateGroup, onClose }) => {
  const [groupName, setGroupName] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleInputChange = (e) => {
    setGroupName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (groupName.trim()) {
      handleCreateGroup({ name: groupName.trim() });
    } else {
      toast.error("Please enter a group name");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col h-full relative">
      <Button
        type="button"
        onClick={onClose}
        className="absolute top-4 left-0 p-2 bg-gray-200 hover:bg-gray-300 rounded-full"
        variant="ghost"
      >
        <X className="h-6 w-6 text-gray-600" />
      </Button>
      <h2 className="text-3xl font-semibold mb-8 text-left roboto-medium text-gray-900 mt-16">Enter your group name</h2>
      <div className="mb-6 relative flex-grow">
        <label htmlFor="groupName" className="block text-sm font-light text-gray-400 mb-2">
          Group name
        </label>
        <div className="relative">
          <Input
            id="groupName"
            name="name"
            value={groupName}
            onChange={handleInputChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="w-full text-lg border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-300 px-3 py-2 bg-transparent text-gray-900"
          />
          {isFocused && groupName.length === 0 && (
            <div className="absolute inset-0 pointer-events-none flex justify-center items-center">
              <div className="w-0.5 h-8 bg-gray-400 animate-pulse"></div>
            </div>
          )}
        </div>
      </div>
      <div className="mt-auto pb-6">
        <Button 
          type="submit" 
          className="w-full h-12 rounded-full text-lg font-light transition-all duration-300 bg-[#3B72EC] text-white hover:bg-[#3B72EC]/90"
        >
          Create
        </Button>
      </div>
    </form>
  );
};

export default CreateGroupForm;