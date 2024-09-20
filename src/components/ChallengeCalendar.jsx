import React from 'react';
import { Check } from 'lucide-react';

const ChallengeCalendar = ({ challengeType }) => {
  const today = new Date();
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const completedDays = [1, 3, 5, 7, 10, 12, 15];

  const borderColor = challengeType === 'walk' ? 'border-blue-500' : 'border-green-500';
  const textColor = challengeType === 'walk' ? 'text-blue-500' : 'text-green-500';

  return (
    <div className="mb-6">
      <h2 className="text-sm font-semibold mb-4">PROGRESS CALENDAR</h2>
      <div className="grid grid-cols-7 gap-2">
        {days.map((day) => (
          <div key={day} className="relative">
            <div
              className={`w-8 h-8 flex items-center justify-center rounded-full ${
                day === today.getDate()
                  ? `border-2 ${borderColor} ${textColor}`
                  : completedDays.includes(day)
                  ? 'bg-white'
                  : 'border border-gray-600'
              }`}
            >
              {completedDays.includes(day) ? (
                <Check className="w-4 h-4 text-green-500" />
              ) : (
                <span className={day === today.getDate() ? textColor : ''}>{day}</span>
              )}
            </div>
            {day === daysInMonth && (
              <img
                src="https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/etc/Christmas%20Gift%20Box%201.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvZXRjL0NocmlzdG1hcyBHaWZ0IEJveCAxLnBuZyIsImlhdCI6MTcyNjgwMzUwNSwiZXhwIjoxNzU4MzM5NTA1fQ.7546UPrpeOz72Qlu0dzZ7wPppxwo-dC_PtLO-A-xxAA&t=2024-09-20T03%3A38%3A25.769Z"
                alt="Gift"
                className="w-4 h-4 object-contain absolute top-0 right-0"
              />
            )}
          </div>
        ))}
      </div>
      <div className="mt-6 relative w-screen left-1/2 -translate-x-1/2 bg-gray-800 py-4 px-4">
        <ul className="text-xs text-gray-300 space-y-2">
          <li>• Rewards can be claimed at the end of the challenge.</li>
          <li>• Your final summary will determine the reward you receive.</li>
          <li>• You can also check available rewards to claim on your profile page.</li>
        </ul>
      </div>
    </div>
  );
};

export default ChallengeCalendar;
