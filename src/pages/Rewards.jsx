import React from 'react';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Rewards = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <div className="flex-grow overflow-y-auto">
        <div className="max-w-md mx-auto p-2">
          <button onClick={() => navigate(-1)} className="mb-6">
            <ArrowLeft className="h-6 w-6" />
          </button>

          <h1 className="text-2xl font-bold mb-2">Rewards</h1>
          <div className="flex items-center mb-6">
            <p className="text-sm text-gray-400 mr-2">Phone number verified</p>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-400">No rewards to claim</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rewards;