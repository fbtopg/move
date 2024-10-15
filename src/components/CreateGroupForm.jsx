import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { insertNewGroup } from '../utils/supabaseGroupUtils';
import { useSupabaseAuth } from '../integrations/supabase/auth';
import { toast } from 'sonner';

const CreateGroupForm = ({ handleCreateGroup, onClose }) => {
  const [groupName, setGroupName] = useState('');
  const inputRef = useRef(null);
  const { session } = useSupabaseAuth();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (groupName.trim()) {
      try {
        const userId = session?.user?.id;
        if (!userId) {
          toast.error('You must be logged in to create a group');
          return;
        }
        const newGroup = await insertNewGroup(groupName, userId);
        if (newGroup) {
          toast.success('Group created successfully');
          handleCreateGroup(newGroup);
          setGroupName('');
          onClose();
        }
      } catch (error) {
        console.error('Error creating group:', error);
        toast.error('Failed to create group. Please try again.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col flex-grow" autoComplete="off">
      <div className="flex-grow relative mt-4 w-full">
        <input
          ref={inputRef}
          type="text"
          id="groupName"
          name="groupName_ab12cX"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          className="block w-full px-4 pb-1 pt-5 text-lg bg-transparent border-2 border-blue-400 rounded-md outline-none focus:border-blue-600 peer"
          placeholder=" "
          autoComplete="off"
          autoCorrect="off"
          spellCheck="false"
          autoCapitalize="off"
          inputMode="text"
        />
        <label
          htmlFor="groupName"
          className="absolute left-4 top-1 -translate-y-1/2 bg-white px-1 text-xs text-gray-500 transition-all leading-none"
        >
          Group name
        </label>
      </div>
      <Button
        type="submit"
        className="w-full mt-8 bg-black text-white dark:bg-white dark:text-black py-6 rounded-full text-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
      >
        Create
      </Button>
    </form>
  );
};

export default CreateGroupForm;