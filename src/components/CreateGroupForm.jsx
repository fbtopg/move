import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const CreateGroupForm = ({ handleCreateGroup, onClose }) => {
  const [groupName, setGroupName] = useState('');

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
    <form onSubmit={handleSubmit} className="flex flex-col h-full pt-16">
      <h2 className="text-3xl font-bold mb-8 text-left libre-baskerville-bold text-white">Create Your Group</h2>
      <div className="mb-8">
        <label htmlFor="groupName" className="block text-sm font-medium text-white mb-2">
          Group Name
        </label>
        <Input
          id="groupName"
          name="name"
          placeholder="Enter a unique name for your group"
          value={groupName}
          onChange={handleInputChange}
          className="w-full text-lg border-0 border-b-2 border-white rounded-none focus:ring-0 focus:border-primary transition-colors duration-300 px-0 py-2 bg-transparent text-white placeholder-white/70"
        />
      </div>
      <div className="flex-grow" />
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/50 via-black/30 to-transparent">
        <Button 
          type="submit" 
          className={`w-full h-12 rounded-full text-lg font-semibold transition-all duration-300 mb-4 ${
            groupName.trim() 
              ? 'bg-primary text-white hover:bg-primary/90' 
              : 'bg-gray-400/50 text-gray-200 cursor-not-allowed'
          }`}
          disabled={!groupName.trim()}
        >
          Create Group
        </Button>
        <Button 
          type="button" 
          onClick={onClose}
          className="w-full h-12 rounded-full text-lg font-semibold bg-white/20 text-white hover:bg-white/30 transition-all duration-300"
        >
          Close
        </Button>
      </div>
    </form>
  );
};

export default CreateGroupForm;