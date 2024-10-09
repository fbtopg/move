import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
    <form onSubmit={handleSubmit} className="flex flex-col h-full">
      <h2 className="text-2xl font-medium mb-8 text-left roboto-medium text-gray-900 mt-4">Let's create your group. Please choose a name for your group.</h2>
      <div className="mb-8 relative">
        <label htmlFor="groupName" className="block text-sm font-medium text-gray-700 mb-2">
          Group Name
        </label>
        <div className="relative">
          <Input
            id="groupName"
            name="name"
            value={groupName}
            onChange={handleInputChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="w-full text-lg border-0 border-b-2 border-gray-300 rounded-none focus:ring-0 focus:border-primary transition-colors duration-300 px-0 py-2 bg-transparent text-gray-900 text-center"
          />
          {isFocused && groupName.length === 0 && (
            <div className="absolute inset-0 pointer-events-none flex justify-center items-center">
              <div className="w-0.5 h-6 bg-gray-400 animate-pulse"></div>
            </div>
          )}
        </div>
      </div>
      <div className="flex-grow" />
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white via-white to-transparent">
        <Button 
          type="submit" 
          className={`w-full h-12 rounded-full text-lg font-semibold transition-all duration-300 mb-4 ${
            groupName.trim() 
              ? 'bg-primary text-white hover:bg-primary/90' 
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
          disabled={!groupName.trim()}
        >
          Create Group
        </Button>
        <Button 
          type="button" 
          onClick={onClose}
          className="w-full h-12 rounded-full text-lg font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all duration-300"
        >
          Close
        </Button>
      </div>
    </form>
  );
};

export default CreateGroupForm;