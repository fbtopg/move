import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ChallengeCard = ({ type, date, active, progress }) => {
  const isWalk = type === 'Daily Walks';
  const bgImage = isWalk ? '/daily-walks-bg.jpg' : '/daily-quiz-bg.jpg';

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="relative h-48 overflow-hidden">
        <img src={bgImage} alt={type} className="absolute inset-0 w-full h-full object-cover" />
        <CardTitle className="relative z-10 text-white text-2xl font-bold">
          {date}
          <br />
          {type}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full bg-blue-500"></span>
            <span className="w-3 h-3 rounded-full bg-green-500"></span>
            <span className="w-3 h-3 rounded-full bg-red-500"></span>
          </div>
          <span className="text-sm text-gray-600">{active} active</span>
        </div>
        <div className="mt-4">
          <p className="text-2xl font-bold">{progress}</p>
          <p className="text-sm text-gray-600">{isWalk ? 'RANK' : ''}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChallengeCard;