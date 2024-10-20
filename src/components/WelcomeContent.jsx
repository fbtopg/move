import React from 'react';
import { motion } from 'framer-motion';
import { Plus } from "lucide-react";
import ChallengeCardPreview from "./ChallengeCardPreview";

const WelcomeContent = ({ onAction, actionLabel }) => (
  <>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="w-full max-w-sm mx-auto mb-4"
    >
      <ChallengeCardPreview />
    </motion.div>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="flex flex-col items-center justify-center flex-grow mb-8"
    >
      <img
        src="https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/app/illustration2.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvYXBwL2lsbHVzdHJhdGlvbjIucG5nIiwiaWF0IjoxNzI5MDg5MTAzLCJleHAiOjE3NjA2MjUxMDN9.jnvRMKmghK9GY5JX-3tBuEkW0zUV__A4JEA_hLN0ikM&t=2024-10-16T14%3A31%3A44.880Z"
        alt="Welcome illustration"
        className="w-48 h-48 object-contain mb-4"
      />
      <p className="text-lg font-bold text-center mb-2">
        Create groups and invite friends
      </p>
      <p className="text-sm font-light text-center mb-8">
        Connect, share, challenge, and more
      </p>
      <button
        className="w-12 h-12 bg-blue-500 rounded-[35%] shadow-lg flex items-center justify-center"
        onClick={onAction}
      >
        <Plus className="text-white" size={24} />
      </button>
    </motion.div>
  </>
);

export default WelcomeContent;