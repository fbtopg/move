import React, { useState } from 'react';
import { ArrowLeft, Share, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from 'react-router-dom';
import { shareInvite } from '../utils/shareUtils';
import { getRandomProfilePicture } from '../utils/profilePictures';
import { motion } from 'framer-motion';
import ChallengeCalendar from '../components/ChallengeCalendar';

const DailyQuizChallenge = () => {
  const navigate = useNavigate();
  const [showFullImage, setShowFullImage] = useState(false);

  const challengeData = {
    month: "SEPTEMBER 2024",
    title: "Daily Quiz",
    progress: "11/30",
    answers: "11",
    likes: "124",
    streak: "7",
    activeParticipants: "16.5k",
    startDate: "Sep 1",
    endDate: "Sep 30",
    remainingDays: "24 days",
  };

  const participants = [
    { id: 1, name: "John" },
    { id: 2, name: "Emma" },
    { id: 3, name: "Alex" },
    { id: 4, name: "Sarah" },
    { id: 5, name: "Mike" },
  ];

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'tween', ease: 'easeInOut', duration: 0.3 }}
      className="fixed inset-0 bg-black text-white flex flex-col z-50"
    >
      <Header title={challengeData.title} onBack={() => navigate(-1)} />
      <div className="flex-grow overflow-y-auto">
        <ChallengeHeader challengeData={challengeData} onImageClick={() => setShowFullImage(true)} />
        <div className="max-w-md mx-auto p-4">
          <ChallengeDuration challengeData={challengeData} />
          <ChallengeDetails challengeData={challengeData} participants={participants} />
          <ChallengeCalendar challengeType="quiz" />
          <InviteButton onInvite={shareInvite} />
        </div>
      </div>
      {showFullImage && <FullImageView onClose={() => setShowFullImage(false)} />}
    </motion.div>
  );
};

const Header = ({ title, onBack }) => (
  <div className="bg-[#DCFCE7] text-black p-4 flex justify-between items-center">
    <button onClick={onBack} className="text-black">
      <ArrowLeft className="h-6 w-6" />
    </button>
    <h1 className="text-lg font-semibold">{title}</h1>
    <div className="w-6 h-6"></div>
  </div>
);

const ChallengeHeader = ({ challengeData, onImageClick }) => (
  <div className="bg-gradient-to-b from-[#DCFCE7] to-black p-4 relative">
    <p className="text-sm text-gray-600 mb-4">{challengeData.month}</p>
    <div className="flex justify-between items-center">
      <img 
        src="https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/dailychallenge/Frame%20104.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvZGFpbHljaGFsbGVuZ2UvRnJhbWUgMTA0LnBuZyIsImlhdCI6MTcyNjI4ODY3MCwiZXhwIjoxNzU3ODI0NjcwfQ.TdGTOMcfEw-wL-0ixshR_ckOzdkla8FJaSOymB8zA0M&t=2024-09-14T04%3A37%3A51.908Z" 
        alt="Daily Quiz Challenge" 
        className="w-24 h-24 object-cover cursor-pointer rounded-lg"
        onClick={onImageClick}
      />
      <div className="text-right">
        <div className="text-4xl font-bold text-white">
          {challengeData.progress}
        </div>
        <div className="text-sm text-gray-300">PROGRESS</div>
      </div>
    </div>
  </div>
);

const ChallengeDuration = ({ challengeData }) => (
  <div className="flex justify-start space-x-8 mb-6">
    <DurationItem label="START" value={challengeData.startDate} />
    <DurationItem label="END" value={challengeData.endDate} />
    <DurationItem label="REMAINING" value={challengeData.remainingDays} />
  </div>
);

const DurationItem = ({ label, value }) => (
  <div className="text-left">
    <p className="text-gray-400 text-[10px] mb-1">{label}</p>
    <p className="text-xs">{value}</p>
  </div>
);

const ChallengeDetails = ({ challengeData, participants }) => (
  <>
    <p className="text-xs text-gray-400 mb-4 pr-8">
      Engage your friends with the Daily Quiz Challenge! Compete, share answers, and earn rewards together as you tackle everyday quiz.
    </p>
    <ChallengeParticipants participants={participants} activeParticipants={challengeData.activeParticipants} />
    <div className="h-px bg-gray-700 my-6"></div>
    <h2 className="text-sm font-semibold mb-4">SUMMARY</h2>
    <div className="bg-gradient-to-br from-green-900 to-green-700 rounded-lg p-6 mb-6 shadow-lg">
      <div className="grid grid-cols-3 gap-4">
        <DetailItem label="ANSWERS" value={challengeData.answers} icon="🧠" />
        <DetailItem label="LIKES" value={challengeData.likes} icon="❤️" />
        <DetailItem label="STREAK" value={challengeData.streak} icon="🔥" />
      </div>
    </div>
  </>
);

const DetailItem = ({ label, value, icon }) => (
  <div className="text-center flex flex-col items-center justify-between">
    <div className="text-2xl mb-2">{icon}</div>
    <p className="text-lg font-bold">{value}</p>
    <p className="text-xs text-gray-300 mt-1">{label}</p>
  </div>
);

const ChallengeParticipants = ({ participants, activeParticipants }) => (
  <div className="flex items-center mt-4 mb-2">
    <div className="flex flex-shrink-0">
      {participants.map((participant) => (
        <Avatar key={participant.id} className="w-8 h-8 -ml-2 first:ml-0 border-2 border-black">
          <AvatarImage src={getRandomProfilePicture()} />
          <AvatarFallback>{participant.name[0]}</AvatarFallback>
        </Avatar>
      ))}
    </div>
    <div className="ml-2 text-sm text-gray-400">
      {activeParticipants} active
    </div>
  </div>
);

const InviteButton = ({ onInvite }) => (
  <Button 
    className="w-full bg-transparent text-white border border-white hover:bg-white hover:text-black transition-colors h-16 rounded-full mt-6"
    onClick={onInvite}
  >
    <Share className="mr-2 h-5 w-5" />
    Invite Friends
  </Button>
);

const FullImageView = ({ onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50" onClick={onClose}>
    <img 
      src="https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/dailychallenge/Frame%20104.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvZGFpbHljaGFsbGVuZ2UvRnJhbWUgMTA0LnBuZyIsImlhdCI6MTcyNjI4ODY3MCwiZXhwIjoxNzU3ODI0NjcwfQ.TdGTOMcfEw-wL-0ixshR_ckOzdkla8FJaSOymB8zA0M&t=2024-09-14T04%3A37%3A51.908Z" 
      alt="Daily Quiz Challenge" 
      className="max-w-full max-h-full object-contain"
    />
    <button 
      className="absolute top-4 right-4 text-white"
      onClick={onClose}
    >
      <X className="h-6 w-6" />
    </button>
  </div>
);

export default DailyQuizChallenge;
