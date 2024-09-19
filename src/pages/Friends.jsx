import React, { useState, useRef, useEffect } from 'react';
import { motion } from "framer-motion";
import ChallengeCard from '../components/ChallengeCard';
import FriendActivity from '../components/FriendActivity';
import { getRandomProfilePicture } from '../utils/profilePictures';
import UserProfilePopup from '../components/UserProfilePopup';
import { Plus, ChevronLeft, ChevronRight } from 'lucide-react';

const Friends = () => {
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const scrollContainerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const challenges = [
    { type: "Daily Walk", date: "SEPTEMBER 2024", active: "16.5k", progress: "501/16.5K" },
    { type: "Daily Quiz", date: "SEPTEMBER 2024", active: "16.5k", progress: "11/30" },
  ];

  const groupBoxes = [
    { id: 1, name: "Family", members: 3 },
    { id: 2, name: "Work Friends", members: 4 },
    { id: 3, name: "Gym Buddies", members: 5 },
    { id: 4, name: "Book Club", members: 6 },
    { id: 5, name: "Neighbors", members: 3 },
    { id: 6, name: "College Alumni", members: 4 },
  ];

  const activities = {
    today: [
      { name: "Emma", activity: "finished walking 1.2km and completed daily walk • just now", type: "walk" },
      { name: "John", activity: "solved the quiz today and completed daily quiz • just now", type: "quiz" },
      { name: "Sarah", activity: "finished walking 800m and completed daily walk • just now", type: "walk" },
    ],
    thisMonth: [
      { name: "Geonu", activity: "finished walking 750m and completed daily walk • 2d", type: "walk" },
      { name: "Astrid", activity: "finished walking 2km and completed daily walk • 5d", type: "walk" },
    ],
    earlier: [
      { name: "Rissa", activity: "solved the quiz today and completed daily quiz • 2w", type: "quiz" },
      { name: "John", activity: "finished walking 1.5km and completed daily walk • 3w", type: "walk" },
    ],
  };

  const handleSwipe = (index) => setCurrentChallenge(index);

  const handleUserClick = (user) => {
    setSelectedUser({
      username: user.name,
      handle: `@${user.name.toLowerCase()}`,
      avatarUrl: getRandomProfilePicture(),
      followers: Math.floor(Math.random() * 1000),
      following: Math.floor(Math.random() * 1000),
    });
  };

  const renderActivitySection = (title, activities) => (
    <>
      <h2 className="text-xs font-semibold mb-3 text-gray-400">{title}</h2>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <FriendActivity
            key={index}
            name={activity.name}
            activity={activity.activity}
            type={activity.type}
            profilePicture={Math.random() > 0.3 ? getRandomProfilePicture() : null}
            onUserClick={() => handleUserClick(activity)}
          />
        ))}
      </div>
    </>
  );

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
      handleScroll();
    }
    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  const scrollGroupBoxes = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.div
        className="overflow-hidden"
        onPanEnd={(e, { offset, velocity }) => {
          if (Math.abs(velocity.x) > 500 || Math.abs(offset.x) > 50) {
            handleSwipe(currentChallenge === 0 ? 1 : 0);
          }
        }}
      >
        <motion.div
          className="flex"
          animate={{ x: `${-currentChallenge * 100}%` }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {challenges.map((challenge, index) => (
            <div key={index} className="flex-shrink-0 w-full">
              <div className="mb-4">
                <ChallengeCard {...challenge} />
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      <div className="flex justify-center space-x-2 mb-4">
        {challenges.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full ${
              index === currentChallenge ? 'bg-white' : 'bg-gray-500'
            }`}
            onClick={() => handleSwipe(index)}
          />
        ))}
      </div>

      <div className="relative w-screen left-1/2 -translate-x-1/2 h-2 bg-[#212124] my-6" />

      <div className="relative mb-6">
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto scrollbar-hide space-x-2 px-4"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          <div className="flex-shrink-0 w-20 h-20 bg-[#212124] rounded-lg flex flex-col items-center justify-center scroll-snap-align-start">
            <Plus className="w-8 h-8 text-white mb-2" />
            <span className="text-xs text-white">Create group</span>
          </div>
          {groupBoxes.map((group) => (
            <div key={group.id} className="flex-shrink-0 w-20 scroll-snap-align-start">
              <div 
                className={`h-20 bg-[#212124] rounded-lg p-2 cursor-pointer ${selectedGroup === group.id ? 'ring-2 ring-[#F7C100]' : ''}`}
                onClick={() => setSelectedGroup(group.id)}
              >
                <div className="grid grid-cols-2 gap-1">
                  {[...Array(Math.min(3, group.members))].map((_, index) => (
                    <div key={index} className="w-8 h-8 bg-gray-600 rounded-sm overflow-hidden">
                      <img
                        src={getRandomProfilePicture()}
                        alt={`Member ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                  {group.members > 3 && (
                    <div className="w-8 h-8 bg-gray-600 rounded-sm overflow-hidden flex items-center justify-center text-white text-xs font-bold">
                      +{group.members - 3}
                    </div>
                  )}
                </div>
              </div>
              <p className="text-xs text-center mt-1 truncate" title={group.name}>
                {group.name.length > 10 ? group.name.slice(0, 10) + '..' : group.name}
              </p>
            </div>
          ))}
        </div>
        {showLeftArrow && (
          <button 
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 rounded-full p-1"
            onClick={() => scrollGroupBoxes('left')}
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
        )}
        {showRightArrow && (
          <button 
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 rounded-full p-1"
            onClick={() => scrollGroupBoxes('right')}
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        )}
      </div>

      <section className="mt-4 pb-20 space-y-6">
        {Object.entries(activities).map(([title, acts]) => (
          <React.Fragment key={title}>
            {renderActivitySection(title.toUpperCase(), acts)}
            {title !== 'earlier' && <div className="h-px bg-[#424245]" />}
          </React.Fragment>
        ))}
      </section>

      {selectedUser && (
        <UserProfilePopup
          isOpen={!!selectedUser}
          onClose={() => setSelectedUser(null)}
          user={selectedUser}
        />
      )}
    </>
  );
};

export default Friends;
