import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { initialGroupData, validateForm } from '../utils/createGroupUtils.jsx';
import { useNavigate } from 'react-router-dom';
import CreateGroupForm from './CreateGroupForm';

const CreateGroupModal = ({ isOpen, onClose }) => {
  const [groupData, setGroupData] = useState(initialGroupData);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const y = useMotionValue(0);
  const opacity = useTransform(y, [0, 200], [1, 0]);

  const handleCreateGroup = () => {
    const newErrors = validateForm(groupData);
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      const newGroupId = Date.now().toString();
      navigate(`/group/${newGroupId}`, { 
        state: { 
          groupImage: groupData.image,
          groupName: groupData.name,
          groupDescription: groupData.description,
          isPrivate: groupData.isPrivate,
          animateEntry: true
        } 
      });
      onClose();
    }
  };

  const handleDragEnd = (_, info) => {
    if (info.offset.y > 100) {
      onClose();
    }
  };

  const modalVariants = {
    hidden: { y: "100%", opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring",
        damping: 30,
        stiffness: 300
      }
    },
    exit: { 
      y: "100%", 
      opacity: 0,
      transition: { 
        type: "spring",
        damping: 30,
        stiffness: 300
      }
    }
  };

  const backgroundImageUrl = "https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/group/Frame%20427319179.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvZ3JvdXAvRnJhbWUgNDI3MzE5MTc5LnBuZyIsImlhdCI6MTcyODI4OTY4NywiZXhwIjoxNzU5ODI1Njg3fQ.DpCu4UnA89z3qhs6M3U5fJRGC9Fs28cs0SeIXB5E5CY&t=2024-10-07T08%3A28%3A07.691Z";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="modal"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={modalVariants}
          drag="y"
          dragConstraints={{ top: 0, bottom: 0 }}
          onDragEnd={handleDragEnd}
          style={{ y, opacity }}
          className="fixed inset-0 text-white z-50 overflow-y-auto"
        >
          <div 
            className="min-h-screen p-6 flex flex-col"
            style={{
              backgroundImage: `url(${backgroundImageUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            <h2 className="text-lg font-light text-center mb-4">Create Group</h2>

            <CreateGroupForm
              groupData={groupData}
              setGroupData={setGroupData}
              errors={errors}
              setErrors={setErrors}
              handleCreateGroup={handleCreateGroup}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CreateGroupModal;