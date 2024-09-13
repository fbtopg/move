import React, { useState, useRef } from 'react';
import ChallengeCard from '../components/ChallengeCard';
import FriendActivity from '../components/FriendActivity';

const Me = () => {
  const [currentChallenge, setCurrentChallenge] = useState('walks');
  const touchStartX = useRef(null);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;

    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (Math.abs(diff) > 50) {
      if (diff > 0 && currentChallenge === 'walks') {
        setCurrentChallenge('quiz');
      } else if (diff < 0 && currentChallenge === 'quiz') {
        setCurrentChallenge('walks');
      }
    }

    touchStartX.current = null;
  };

  const todayActivities = [
    { name: "You", activity: "finished walking 1km and completed daily walks challenge • 3m", type: "walk" },
    { name: "You", activity: "solved the quiz today and completed daily quiz challenge • 1h", type: "quiz" },
  ];

  const thisMonthActivities = [
    { name: "You", activity: "finished walking 750m and completed daily walks challenge • 2d", type: "walk" },
    { name: "You", activity: "solved the quiz today and completed daily quiz challenge • 5d", type: "quiz" },
  ];

  const earlierActivities = [
    { name: "You", activity: "finished walking 2km and completed daily walks challenge • 2w", type: "walk" },
    { name: "You", activity: "solved the quiz today and completed daily quiz challenge • 1m", type: "quiz" },
  ];

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
          />
        ))}
      </div>
    </>
  );

  return (
    <>
      <div
        className="overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(${currentChallenge === 'walks' ? '0%' : '-50%'})` }}
        >
          <div className="flex-shrink-0 w-full">
            <div className="mb-4">
              <ChallengeCard
                type="Daily Walks"
                date="SEPTEMBER 2024"
                active="16.5k"
                progress="501/16.5K"
              />
            </div>
          </div>
          <div className="flex-shrink-0 w-full">
            <div className="mb-4">
              <ChallengeCard
                type="Daily Quiz"
                date="SEPTEMBER 2024"
                active="16.5k"
                progress="11/30"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="h-px bg-gray-700 my-4"></div>

      <section className="mt-4 pb-20 space-y-6">
        {renderActivitySection("TODAY", todayActivities)}
        <div className="h-px bg-gray-700"></div>
        {renderActivitySection("THIS MONTH", thisMonthActivities)}
        <div className="h-px bg-gray-700"></div>
        {renderActivitySection("EARLIER", earlierActivities)}
      </section>
    </>
  );
};

export default Me;