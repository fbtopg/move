import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ChallengeCard from '../components/ChallengeCard';

const DailyQuizHistory = () => {
  const navigate = useNavigate();

  const challenges = [
    { type: "Daily Quiz", date: "SEPTEMBER 2024", active: "16.5k", progress: "11/30", status: "ongoing" },
    { type: "Daily Quiz", date: "AUGUST 2024", active: "15.8k", progress: "28/31", status: "finished" },
    { type: "Daily Quiz", date: "JULY 2024", active: "14.2k", progress: "29/31", status: "finished" },
  ];

  const handleChallengeClick = (date) => {
    navigate(`/daily-quiz-challenge/${date}`);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <div className="flex-grow overflow-y-auto">
        <div className="max-w-md mx-auto p-2">
          <button onClick={() => navigate(-1)} className="mb-6">
            <ArrowLeft className="h-6 w-6" />
          </button>

          <h2 className="text-2xl font-bold mb-6">Daily Quiz History</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-xs font-semibold mb-3 text-gray-400">ONGOING</h3>
              {challenges
                .filter(challenge => challenge.status === "ongoing")
                .map((challenge, index) => (
                  <div key={index} className="mb-4" onClick={() => handleChallengeClick(challenge.date)}>
                    <ChallengeCard {...challenge} />
                  </div>
                ))
              }
            </div>

            <div className="h-px bg-gray-700 my-6"></div>

            <div>
              <h3 className="text-xs font-semibold mb-3 text-gray-400">FINISHED</h3>
              {challenges
                .filter(challenge => challenge.status === "finished")
                .map((challenge, index) => (
                  <div key={index} className="mb-4" onClick={() => handleChallengeClick(challenge.date)}>
                    <ChallengeCard {...challenge} />
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyQuizHistory;