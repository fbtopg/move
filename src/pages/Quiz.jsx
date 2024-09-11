import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import QuizItem from '../components/QuizItem';

const Quiz = () => {
  const navigate = useNavigate();
  const [timer, setTimer] = useState('23:59:59');

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date().toLocaleString('en-US', { timeZone: 'Asia/Seoul' });
      const kstNow = new Date(now);
      const hours = 23 - kstNow.getHours();
      const minutes = 59 - kstNow.getMinutes();
      const seconds = 59 - kstNow.getSeconds();

      setTimer(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
    };

    const timerInterval = setInterval(updateTimer, 1000);

    return () => clearInterval(timerInterval);
  }, []);

  const participantProfiles = [
    "https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/pfp/image-1.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvcGZwL2ltYWdlLTEucG5nIiwiaWF0IjoxNzI1NzE3Mjg1LCJleHAiOjE3NTcyNTMyODV9.qVjtzjCu_bW-iEyzul3BjNeCwoMS6prEcNFETCCBzrs&t=2024-09-07T13%3A54%3A44.233Z",
    "https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/pfp/image-2.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvcGZwL2ltYWdlLTIucG5nIiwiaWF0IjoxNzI1NzE3Mjk1LCJleHAiOjE3NTcyNTMyOTV9.ZggcfcQRRTSdDHtyXr8Opujx6iGlBEISYrW-scvSMik&t=2024-09-07T13%3A54%3A54.988Z",
    "https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/pfp/image-3.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvcGZwL2ltYWdlLTMucG5nIiwiaWF0IjoxNzI1NzE3MzExLCJleHAiOjE3NTcyNTMzMTF9.ghhBkpc92hU749PoU_fV_q0HSHBg4SZw8FVeNDsa8J0&t=2024-09-07T13%3A55%3A10.841Z",
    "https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/pfp/image-4.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvcGZwL2ltYWdlLTQucG5nIiwiaWF0IjoxNzI1NzE3MzE4LCJleHAiOjE3NTcyNTMzMTh9.UcjJ_L92gDVmyvTu_i6hyw0kgw1Y9PUTj4kQrgid-Lg&t=2024-09-07T13%3A55%3A17.985Z",
    "https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/pfp/image-5.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvcGZwL2ltYWdlLTUucG5nIiwiaWF0IjoxNzI1NzE3MzI1LCJleHAiOjE3NTcyNTMzMjV9.e5H4nq1qEjoOIcShw-3CyS_5GieWWhI4cp85LjjW2vo&t=2024-09-07T13%3A55%3A25.054Z",
  ];

  const quizzes = [
    { 
      id: 1,
      title: "ACTIVE", 
      question: "What is the capital of Indonesia?", 
      image: "https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/quiz/Frame%2095.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvcXVpei9GcmFtZSA5NS5wbmciLCJpYXQiOjE3MjU5Mzg1NzMsImV4cCI6MTc1NzQ3NDU3M30.i7Qjnq4mYr_VgnhL9CkNXXdCIFCLsLKp2lIaZ0ijWmo&t=2024-09-10T03%3A22%3A54.207Z",
      participants: [
        { id: 1, name: "John", avatar: participantProfiles[0] },
        { id: 2, name: "Emma", avatar: participantProfiles[1] },
        { id: 3, name: "Alex", avatar: participantProfiles[2] },
        { id: 4, name: "Sarah", avatar: participantProfiles[3] },
        { id: 5, name: "Mike", avatar: participantProfiles[4] },
      ],
      activeParticipants: "16.5k",
      status: "active"
    },
    { 
      id: 2,
      title: "FINISHED", 
      question: "Which planet is known as the Red Planet?", 
      image: "https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/quiz/Frame%2096.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvcXVpei9GcmFtZSA5Ni5wbmciLCJpYXQiOjE3MjU5Mzg1OTMsImV4cCI6MTc1NzQ3NDU5M30.F0bZeKm1pv_2ciSkNqRSnp-MyncY9zmrWCsniCG5iZo&t=2024-09-10T03%3A23%3A13.842Z",
      participants: [
        { id: 1, name: "Alice", avatar: participantProfiles[0] },
        { id: 2, name: "Bob", avatar: participantProfiles[1] },
        { id: 3, name: "Charlie", avatar: participantProfiles[2] },
        { id: 4, name: "Diana", avatar: participantProfiles[3] },
        { id: 5, name: "Ethan", avatar: participantProfiles[4] },
      ],
      activeParticipants: "15.8k",
      status: "finished"
    },
    { 
      id: 3,
      title: "FINISHED", 
      question: "What is the largest mammal on Earth?", 
      image: "https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/quiz/Frame%2097.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvcXVpei9GcmFtZSA5Ny5wbmciLCJpYXQiOjE3MjU5Mzg2MTAsImV4cCI6MTc1NzQ3NDYxMH0.-tBzfXj83KjZJmrJWN4UL18P13kZ4Bt6Fwv7n-6E53s&t=2024-09-10T03%3A23%3A31.080Z",
      participants: [
        { id: 1, name: "Frank", avatar: participantProfiles[0] },
        { id: 2, name: "Grace", avatar: participantProfiles[1] },
        { id: 3, name: "Henry", avatar: participantProfiles[2] },
        { id: 4, name: "Ivy", avatar: participantProfiles[3] },
        { id: 5, name: "Jack", avatar: participantProfiles[4] },
      ],
      activeParticipants: "14.2k",
      status: "finished"
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <div className="p-2">
        <div className="max-w-md mx-auto">
          <button onClick={() => navigate(-1)} className="mb-4">
            <ArrowLeft className="h-6 w-6" />
          </button>
          <h1 className="text-2xl font-bold mb-6">Daily Quiz</h1>
        </div>
      </div>
      <div className="flex-grow overflow-y-auto pb-20">
        <div className="max-w-md mx-auto p-2">
          <QuizItem quiz={quizzes[0]} isSquare={true} timer={timer} />

          <h2 className="text-xs font-semibold mb-3 mt-6 text-gray-400">FINISHED</h2>
          {quizzes.slice(1).map((quiz) => (
            <QuizItem key={quiz.id} quiz={quiz} isSquare={true} isSmall={true} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Quiz;