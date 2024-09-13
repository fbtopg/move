import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ChallengeCard from '../components/ChallengeCard';

const DailyWalkHistory = () => {
  const navigate = useNavigate();

  const challenges = [
    { type: "Daily Walk", date: "SEPTEMBER 2024", active: "16.5k", progress: "501/16.5K", status: "ongoing" },
    { type: "Daily Walk", date: "AUGUST 2024", active: "15.8k", progress: "1,234/15.8K", status: "finished" },
    { type: "Daily Walk", date: "JULY 2024", active: "14.2k", progress: "987/14.2K", status: "finished" },
  ];

  const handleChallengeClick = (date) => {
    navigate(`/daily-walk-challenge/${date}`);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-md mx-auto p-4">
        <button onClick={() => navigate(-1)} className="mb-6">
          <ArrowLeft className="h-6 w-6" />
        </button>

        <h2 className="text-2xl font-bold mb-6">Daily Walk History</h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">Ongoing</h3>
            {challenges
              .filter(challenge => challenge.status === "ongoing")
              .map((challenge, index) => (
                <div key={index} className="mb-4" onClick={() => handleChallengeClick(challenge.date)}>
                  <ChallengeCard {...challenge} />
                </div>
              ))
            }
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Finished</h3>
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
  );
};

export default DailyWalkHistory;