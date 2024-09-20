import React, { useState } from 'react';
import { ArrowLeft, Share, X, Check } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from 'react-router-dom';
import { shareInvite } from '../utils/shareUtils';
import { getRandomProfilePicture } from '../utils/profilePictures';
import { motion } from 'framer-motion';

const DailyWalkChallenge = () => {
  const navigate = useNavigate();
  const [showFullImage, setShowFullImage] = useState(false);

  const challengeData = {
    month: "SEPTEMBER 2024",
    title: "Daily Walk",
    rank: "501",
    totalParticipants: "16.5K",
    distance: "56.7km",
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
          <ChallengeCalendar />
          <InviteButton onInvite={shareInvite} />
        </div>
      </div>
      {showFullImage && <FullImageView onClose={() => setShowFullImage(false)} />}
    </motion.div>
  );
};

const Header = ({ title, onBack }) => (
  <div className="bg-[#DBE9FE] text-black p-4 flex justify-between items-center">
    <button onClick={onBack} className="text-black">
      <ArrowLeft className="h-6 w-6" />
    </button>
    <h1 className="text-lg font-semibold">{title}</h1>
    <div className="w-6 h-6"></div>
  </div>
);

const ChallengeHeader = ({ challengeData, onImageClick }) => (
  <div className="bg-gradient-to-b from-[#DBE9FE] to-black p-4 relative">
    <p className="text-sm text-gray-600 mb-4">{challengeData.month}</p>
    <div className="flex justify-between items-center">
      <img 
        src="https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/dailychallenge/Frame%20102.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvZGFpbHljaGFsbGVuZ2UvRnJhbWUgMTAyLnBuZyIsImlhdCI6MTcyNjI4ODYyNCwiZXhwIjoxNzU3ODI0NjI0fQ.MsMvXioJ2mxlqql64hI_aFCKVuY4qVrQHbpUG-DTkLQ&t=2024-09-14T04%3A37%3A06.339Z" 
        alt="Daily Walk Challenge" 
        className="w-24 h-24 object-cover cursor-pointer rounded-lg"
        onClick={onImageClick}
      />
      <div className="text-right">
        <div className="text-4xl font-bold text-white">
          {challengeData.rank}
          <span className="text-gray-300 text-2xl">/{challengeData.totalParticipants}</span>
        </div>
        <div className="text-sm text-gray-300">RANK</div>
      </div>
    </div>
  </div>
);

const ChallengeDuration = ({ challengeData }) => (
  <div className="grid grid-cols-3 gap-4 text-xs mb-6">
    <DurationItem label="START" value={challengeData.startDate} />
    <DurationItem label="END" value={challengeData.endDate} />
    <DurationItem label="REMAINING" value={challengeData.remainingDays} />
  </div>
);

const DurationItem = ({ label, value }) => (
  <div className="text-left">
    <p className="text-gray-400 text-[10px] mb-1">{label}</p>
    <p className="text-sm">{value}</p>
  </div>
);

const ChallengeDetails = ({ challengeData, participants }) => (
  <>
    <p className="text-xs text-gray-400 mb-4 pr-8">
      Build a routine with your friends in the Daily Walking Challenge! Walk together, share progress, and earn rewards along the way.
    </p>
    <ChallengeParticipants participants={participants} activeParticipants={challengeData.activeParticipants} />
    <div className="h-px bg-gray-700 my-6"></div>
    <h2 className="text-sm font-semibold mb-4">SUMMARY</h2>
    <div className="bg-[#212124] rounded-lg p-8 mb-6">
      <div className="flex justify-between items-center">
        <DetailItem label="DISTANCE" value={challengeData.distance} />
        <div className="h-16 w-px bg-gray-700"></div>
        <DetailItem label="LIKES" value={challengeData.likes} />
        <div className="h-16 w-px bg-gray-700"></div>
        <DetailItem label="STREAK" value={challengeData.streak} />
      </div>
    </div>
  </>
);

const DetailItem = ({ label, value }) => (
  <div className="text-center flex flex-col items-center justify-between h-full">
    <p className="text-gray-400 text-xs mb-2">{label}</p>
    <p className="text-lg">{value}</p>
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

const ChallengeCalendar = () => {
  const today = new Date();
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const completedDays = [1, 3, 5, 7, 10, 12, 15];

  return (
    <div className="mb-6">
      <h2 className="text-sm font-semibold mb-4">PROGRESS CALENDAR</h2>
      <div className="grid grid-cols-7 gap-2">
        {days.map((day, index) => (
          <div
            key={day}
            className={`w-8 h-8 flex items-center justify-center rounded-full ${
              day === today.getDate()
                ? 'border-2 border-blue-500 text-blue-500'
                : completedDays.includes(day)
                ? 'bg-white'
                : 'border border-gray-600'
            }`}
          >
            {index === days.length - 1 ? (
              <img
                src="https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/etc/Christmas%20Gift%20Box%201.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvZXRjL0NocmlzdG1hcyBHaWZ0IEJveCAxLnBuZyIsImlhdCI6MTcyNjgwMzUwNSwiZXhwIjoxNzU4MzM5NTA1fQ.7546UPrpeOz72Qlu0dzZ7wPppxwo-dC_PtLO-A-xxAA&t=2024-09-20T03%3A38%3A25.769Z"
                alt="Gift"
                className="w-6 h-6 object-contain"
              />
            ) : completedDays.includes(day) ? (
              <Check className="w-4 h-4 text-green-500" />
            ) : (
              <span className={day === today.getDate() ? 'text-blue-500' : ''}>{day}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

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
      src="https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/dailychallenge/Frame%20102.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvZGFpbHljaGFsbGVuZ2UvRnJhbWUgMTAyLnBuZyIsImlhdCI6MTcyNjI4ODYyNCwiZXhwIjoxNzU3ODI0NjI0fQ.MsMvXioJ2mxlqql64hI_aFCKVuY4qVrQHbpUG-DTkLQ&t=2024-09-14T04%3A37%3A06.339Z" 
      alt="Daily Walk Challenge" 
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

export default DailyWalkChallenge;
