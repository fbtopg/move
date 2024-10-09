import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from 'lucide-react';

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
        className="absolute top-0 left-0 p-2"
        variant="ghost"
      >
        <ArrowLeft className="h-6 w-6" />
      </Button>
      <h2 className="text-xl font-medium mb-8 text-center roboto-medium text-gray-900 mt-16">Let's create your group. Please choose a name for your group.</h2>
      <div className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-xs relative">
          <Input
            id="groupName"
            name="name"
            value={groupName}
            onChange={handleInputChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Enter group name"
            className="w-full text-2xl border-0 border-b-2 border-gray-300 rounded-none focus:ring-0 focus:border-primary transition-colors duration-300 px-0 py-2 bg-transparent text-gray-900 text-center"
          />
          {isFocused && groupName.length === 0 && (
            <div className="absolute inset-0 pointer-events-none flex justify-center items-center">
              <div className="w-0.5 h-8 bg-gray-400 animate-pulse"></div>
            </div>
          )}
        </div>
      </div>
      <div className="mt-auto">
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