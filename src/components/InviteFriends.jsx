import React, { useState } from 'react';
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Share, X } from "lucide-react";

const InviteFriends = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: isOpen ? 0 : "100%" }}
      transition={{ type: "spring", damping: 30, stiffness: 300 }}
      className="fixed inset-0 bg-black text-white z-50 overflow-y-auto"
    >
      <div className="p-4 flex flex-col h-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Invite Friends</h2>
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
        <div className="flex-grow">
          {/* Add search results here */}
        </div>
        <Button className="w-full mt-4" onClick={onClose}>
          <Share className="mr-2 h-5 w-5" /> Invite Friends
        </Button>
      </div>
    </motion.div>
  );
};

export default InviteFriends;