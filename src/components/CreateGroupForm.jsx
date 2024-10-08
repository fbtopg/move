import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X } from 'lucide-react';
import { toast } from 'sonner';

const CreateGroupForm = ({ handleCreateGroup, onClose }) => {
  const [groupName, setGroupName] = useState('');
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const isKeyboard = window.innerHeight < window.outerHeight;
      setIsKeyboardVisible(isKeyboard);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleInputChange = (e) => {
    setGroupName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (groupName.trim()) {
      try {
        const newGroup = await handleCreateGroup(groupName.trim());
        onClose();
        // Navigation to the new group's detail page will be handled in CreateGroupModal
      } catch (error) {
        toast.error("Failed to create group. Please try again.");
      }
    } else {
      toast.error("Please enter a group name");
    }
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
      <h2 className="text-3xl font-semibold mb-8 text-left roboto-medium text-gray-900 mt-16">Enter your group name</h2>
      <div className="mb-6 relative flex-grow">
        <label htmlFor="groupName" className="block text-sm roboto-thin text-black mb-2">
          Group name
        </label>
        <div className="relative">
          <Input
            id="groupName"
            name="name"
            value={groupName}
            onChange={handleInputChange}
            className="w-full text-lg border border-black rounded-md focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-300 px-3 py-2 bg-transparent text-gray-900"
          />
        </div>
      </div>
      <div className={`mt-auto border-t border-gray-200 pt-4 ${isKeyboardVisible ? 'fixed bottom-0 left-0 right-0 bg-white p-4' : ''}`}>
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