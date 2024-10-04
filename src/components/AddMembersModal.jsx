import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { X, Search, Plus, Check } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getRandomProfilePicture } from '../utils/profilePictures';

const users = [
  { id: 1, username: "john_doe", displayName: "John Doe" },
  { id: 2, username: "jane_smith", displayName: "Jane Smith" },
  { id: 3, username: "bob_johnson", displayName: "Bob Johnson" },
  // Add more sample users as needed
];

const AddMembersModal = ({ isOpen, onClose, onMembersSelected, selectedMembers }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState(new Set(selectedMembers.map(m => m.id)));

  useEffect(() => {
    if (searchTerm.trim() !== '') {
      const filteredUsers = users.filter(user =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.displayName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(filteredUsers);
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  const handleToggleUser = (user) => {
    setSelectedUsers(prev => {
      const newSet = new Set(prev);
      if (newSet.has(user.id)) {
        newSet.delete(user.id);
      } else {
        newSet.add(user.id);
      }
      return newSet;
    });
  };

  const handleDone = () => {
    const selectedMembersList = users.filter(user => selectedUsers.has(user.id));
    onMembersSelected(selectedMembersList);
  };

  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: isOpen ? 0 : "100%" }}
      exit={{ y: "100%" }}
      transition={{ type: "spring", damping: 30, stiffness: 300 }}
      className="fixed inset-0 bg-background text-foreground z-50 overflow-y-auto"
    >
      <div className="p-4 flex flex-col h-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Add Members</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-6 w-6" />
          </Button>
        </div>
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            className="pl-10 bg-input"
            placeholder="Search username"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex-grow overflow-y-auto">
          {searchResults.map(user => (
            <div key={user.id} className="flex items-center justify-between py-2 border-b border-border">
              <div className="flex items-center">
                <Avatar className="w-10 h-10 mr-3">
                  <AvatarImage src={getRandomProfilePicture()} alt={user.displayName} />
                  <AvatarFallback>{user.displayName.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{user.displayName}</p>
                  <p className="text-sm text-muted-foreground">@{user.username}</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleToggleUser(user)}
                className={selectedUsers.has(user.id) ? "text-primary" : "text-muted-foreground"}
              >
                {selectedUsers.has(user.id) ? <Check className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
              </Button>
            </div>
          ))}
        </div>
        <Button className="mt-4" onClick={handleDone}>Done</Button>
      </div>
    </motion.div>
  );
};

export default AddMembersModal;