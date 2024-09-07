import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Share, X, Plus, Check } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getRandomProfilePicture } from '../utils/profilePictures';
import { cn } from "@/lib/utils";

const users = [
  { id: 1, name: "John" },
  { id: 2, name: "Tate" },
  { id: 3, name: "Aquafina" },
  { id: 4, name: "Geonu" },
  { id: 5, name: "Astrid" },
  { id: 6, name: "Fitra" },
  { id: 7, name: "Rissa" },
  { id: 8, name: "Emma" },
  { id: 9, name: "Sarah" },
  { id: 10, name: "Mike" },
];

const getGradient = (name) => {
  const charCode = name.charCodeAt(0);
  const hue1 = (charCode * 7) % 360;
  const hue2 = (hue1 + 60) % 360;
  return `linear-gradient(135deg, hsl(${hue1}, 70%, 60%), hsl(${hue2}, 70%, 60%))`;
};

const UserSearchResult = ({ user, onInvite, isInvited }) => {
  const profilePicture = Math.random() > 0.3 ? getRandomProfilePicture() : null;

  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center">
        <Avatar className="w-10 h-10 mr-3">
          {profilePicture ? (
            <AvatarImage src={profilePicture} alt={user.name} />
          ) : (
            <AvatarFallback style={{ background: getGradient(user.name) }} className="text-white font-semibold">
              {user.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          )}
        </Avatar>
        <span className="text-white">{user.name}</span>
      </div>
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={() => onInvite(user.id)}
        className={cn(
          "transition-colors duration-200",
          isInvited ? "text-green-500" : "text-white"
        )}
      >
        {isInvited ? <Check className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
      </Button>
    </div>
  );
};

const InviteFriends = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [invitedUsers, setInvitedUsers] = useState(new Set());

  useEffect(() => {
    if (searchTerm.trim() !== '') {
      const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(filteredUsers);
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  const handleShareLink = async () => {
    const shareUrl = 'https://move.gptengineer.run/';
    const shareTitle = "Move - connect with your friends";
    const shareText = "Join the quiz today and share your thoughts with me!";
    const shareImage = "https://cdn.discordapp.com/attachments/1057996608261869689/1281511084993544192/jellywalk_Move_logo_friendly_--ar_21_--v_6.1_10c32b8a-4761-40f7-b822-cc7814692207_0.png?ex=66dbfbb3&is=66daaa33&hm=57b8a67c02b8ed7326ebaa7c9417df79a6ca930697a1e8ccc70605f1d0173345&";
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl,
        });
        console.log('Content shared successfully');
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(`${shareTitle}\n\n${shareText}\n\n${shareUrl}\n\nImage: ${shareImage}`);
        alert('Invitation text, link, and image URL copied to clipboard!');
      } catch (err) {
        console.error('Failed to copy link:', err);
      }
    }
  };

  const handleInvite = (userId) => {
    setInvitedUsers(prevInvited => {
      const newInvited = new Set(prevInvited);
      if (newInvited.has(userId)) {
        newInvited.delete(userId);
      } else {
        newInvited.add(userId);
      }
      return newInvited;
    });
  };

  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: isOpen ? 0 : "100%" }}
      transition={{ type: "spring", damping: 30, stiffness: 300 }}
      className="fixed inset-0 bg-black text-white z-50 overflow-y-auto"
    >
      <div className="p-4 flex flex-col h-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Search Community</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-6 w-6" />
          </Button>
        </div>
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            className="pl-10 bg-gray-800 border-gray-700 text-white"
            placeholder="Search username"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex-grow overflow-y-auto mb-6">
          {searchResults.length > 0 ? (
            searchResults.map(user => (
              <UserSearchResult 
                key={user.id} 
                user={user} 
                onInvite={handleInvite}
                isInvited={invitedUsers.has(user.id)}
              />
            ))
          ) : searchTerm.trim() !== '' && (
            <p className="text-gray-400">No results found</p>
          )}
        </div>
        <div className="mt-auto pb-6">
          <Button 
            className="w-full bg-transparent text-white border border-white hover:bg-white hover:text-black transition-colors h-16 rounded-full flex items-center justify-center"
            onClick={handleShareLink}
          >
            <Share className="mr-2 h-5 w-5" /> Invite Friends
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default InviteFriends;