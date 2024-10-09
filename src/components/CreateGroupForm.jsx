import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X } from 'lucide-react';
import { toast } from 'sonner';

const CreateGroupForm = ({ handleCreateGroup, onClose }) => {
  const [groupName, setGroupName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!groupName.trim()) {
      toast.error("Please enter a group name");
      return;
    }
    await handleCreateGroup({ name: groupName });
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
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          className="w-full text-lg border border-black rounded-md focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-300 px-3 py-2 bg-transparent text-gray-900"
        />
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