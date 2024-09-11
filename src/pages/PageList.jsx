import React from 'react';

const PageList = () => {
  const pages = [
    "Achievements",
    "Board",
    "DailyQuizChallenge",
    "DailyQuizHistory",
    "DailyWalkChallenge",
    "DailyWalkHistory",
    "Follow",
    "Friends",
    "Index",
    "Me",
    "Profile",
    "Quiz",
    "Rewards",
    "Walk"
  ];

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <h1 className="text-2xl font-bold mb-4">List of Pages</h1>
      <ul className="list-disc pl-5">
        {pages.map((page, index) => (
          <li key={index} className="mb-2">{page}</li>
        ))}
      </ul>
    </div>
  );
};

export default PageList;