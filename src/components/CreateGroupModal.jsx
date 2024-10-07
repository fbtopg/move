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
          className="fixed inset-0 z-50 overflow-y-auto bg-gradient-to-b from-[#FEF8F3] to-[#F0E7E0]"
        >
          <div className="min-h-screen p-6 flex flex-col">
            <h2 className="text-lg font-light text-center mb-4 text-gray-800">Create Group</h2>

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