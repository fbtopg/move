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

  const profilePicture = "https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/pfp/medium.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvcGZwL21lZGl1bS5wbmciLCJpYXQiOjE3MjU2OTIyMDksImV4cCI6MTc1NzIyODIwOX0.cFZt_zQaj6vJZgVMK7kYXDyIStZQtZzFOHzZFhzJdKA&t=2024-09-07T06%3A56%3A48.637Z";

  const quizzes = [
    { 
      id: 1,
      title: "ACTIVE", 
      question: "What is the capital of Indonesia?", 
      image: "https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/quiz/Frame%2095.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvcXVpei9GcmFtZSA5NS5wbmciLCJpYXQiOjE3MjU5Mzg1NzMsImV4cCI6MTc1NzQ3NDU3M30.i7Qjnq4mYr_VgnhL9CkNXXdCIFCLsLKp2lIaZ0ijWmo&t=2024-09-10T03%3A22%3A54.207Z",
      participants: [
        { id: 1, name: "John", avatar: profilePicture },
        { id: 2, name: "Emma", avatar: profilePicture },
        { id: 3, name: "Alex", avatar: profilePicture },
        { id: 4, name: "Sarah", avatar: profilePicture },
        { id: 5, name: "Mike", avatar: profilePicture },
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
        { id: 1, name: "Alice", avatar: profilePicture },
        { id: 2, name: "Bob", avatar: profilePicture },
        { id: 3, name: "Charlie", avatar: profilePicture },
        { id: 4, name: "Diana", avatar: profilePicture },
        { id: 5, name: "Ethan", avatar: profilePicture },
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
        { id: 1, name: "Frank", avatar: profilePicture },
        { id: 2, name: "Grace", avatar: profilePicture },
        { id: 3, name: "Henry", avatar: profilePicture },
        { id: 4, name: "Ivy", avatar: profilePicture },
        { id: 5, name: "Jack", avatar: profilePicture },
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