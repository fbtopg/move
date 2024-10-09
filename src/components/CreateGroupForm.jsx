import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X } from 'lucide-react';

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
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col h-full relative">
      <Button
        type="button"
        onClick={onClose}
        className="absolute top-4 left-4 p-2 bg-gray-200 rounded-full"
        variant="ghost"
      >
        <X className="h-6 w-6 text-gray-600" />
      </Button>
      <h2 className="text-2xl font-semibold mb-8 text-left roboto-medium text-gray-900 mt-16">Enter your group name</h2>
      <div className="mb-6 relative flex-grow">
        <label htmlFor="groupName" className="block text-sm font-medium text-gray-700 mb-2">
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
          className={`w-full h-12 rounded-full text-lg font-semibold transition-all duration-300 ${
            groupName.trim() 
              ? 'bg-primary text-white hover:bg-primary/90' 
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
          disabled={!groupName.trim()}
        >
          Create Group
        </Button>
      </div>
    </form>
  );
};

export default CreateGroupForm;