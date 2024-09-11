import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import QuizItem from '../components/QuizItem';

const Quiz = () => {
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState([
    { 
      id: 1,
      title: "Today", 
      question: "What is the capital of Indonesia?", 
      image: "https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/quiz/Frame%2095.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvcXVpei9GcmFtZSA5NS5wbmciLCJpYXQiOjE3MjU5Mzg1NzMsImV4cCI6MTc1NzQ3NDU3M30.i7Qjnq4mYr_VgnhL9CkNXXdCIFCLsLKp2lIaZ0ijWmo&t=2024-09-10T03%3A22%3A54.207Z",
      participants: [
        { id: 1, name: "John" },
        { id: 2, name: "Emma" },
        { id: 3, name: "Alex" },
        { id: 4, name: "Sarah" },
        { id: 5, name: "Mike" },
      ],
      activeParticipants: "16.5k",
      status: "active",
    },
    { 
      id: 2,
      title: "Yesterday", 
      question: "Which planet is known as the Red Planet?", 
      image: "https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/quiz/Frame%2096.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvcXVpei9GcmFtZSA5Ni5wbmciLCJpYXQiOjE3MjU5Mzg1OTMsImV4cCI6MTc1NzQ3NDU5M30.F0bZeKm1pv_2ciSkNqRSnp-MyncY9zmrWCsniCG5iZo&t=2024-09-10T03%3A23%3A13.842Z",
      participants: [
        { id: 1, name: "Alice" },
        { id: 2, name: "Bob" },
        { id: 3, name: "Charlie" },
        { id: 4, name: "Diana" },
        { id: 5, name: "Ethan" },
      ],
      activeParticipants: "15.8k",
      status: "active",
    },
    { 
      id: 3,
      title: "8 SEPTEMBER 2024", 
      question: "What is the largest mammal on Earth?", 
      image: "https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/quiz/Frame%2097.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvcXVpei9GcmFtZSA5Ny5wbmciLCJpYXQiOjE3MjU5Mzg2MTAsImV4cCI6MTc1NzQ3NDYxMH0.-tBzfXj83KjZJmrJWN4UL18P13kZ4Bt6Fwv7n-6E53s&t=2024-09-10T03%3A23%3A31.080Z",
      participants: [
        { id: 1, name: "Frank" },
        { id: 2, name: "Grace" },
        { id: 3, name: "Henry" },
        { id: 4, name: "Ivy" },
        { id: 5, name: "Jack" },
      ],
      activeParticipants: "14.2k",
      status: "active",
    },
    { 
      id: 4,
      title: "FINISHED", 
      question: "Which element has the chemical symbol 'Au'?", 
      image: "https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/quiz/Frame%2098.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvcXVpei9GcmFtZSA5OC5wbmciLCJpYXQiOjE3MjU5NTA0MTMsImV4cCI6MTc1NzQ4NjQxM30.5thHmNoEE4jAQ0d57HyF4TCdUJJclQZcy9Uq5zoLXoA&t=2024-09-10T06%3A40%3A14.106Z",
      status: "finished",
    },
    { 
      id: 5,
      title: "FINISHED", 
      question: "What is the largest organ in the human body?", 
      image: "https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/quiz/Frame%2099.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvcXVpei9GcmFtZSA5OS5wbmciLCJpYXQiOjE3MjU5NTEyNDQsImV4cCI6MTc1NzQ4NzI0NH0.-6RLuFmnmD3b6KtxPSq0qJL6OL3LaG4g69bQ_t-LAvc&t=2024-09-10T06%3A54%3A04.726Z",
      status: "finished",
    },
    { 
      id: 6,
      title: "FINISHED", 
      question: "Which country is known as the Land of the Rising Sun?", 
      image: "https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/quiz/Frame%20100.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvcXVpei9GcmFtZSAxMDAucG5nIiwiaWF0IjoxNzI1OTUxMzEzLCJleHAiOjE3NTc0ODczMTN9.r0n1rlbMRe-qIxkw8W4sVgj339oDty4Ukoxi3musQSs&t=2024-09-10T06%3A55%3A13.329Z",
      status: "finished",
    },
    { 
      id: 7,
      title: "FINISHED", 
      question: "What is the chemical formula for water?", 
      image: "https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/quiz/Frame%20101.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvcXVpei9GcmFtZSAxMDEucG5nIiwiaWF0IjoxNzI1OTUxMzI3LCJleHAiOjE3NTc0ODczMjd9.potSLcdm69nQ1YnBCqiYWFlcxoCJSbOEbSXFtMBxuGw&t=2024-09-10T06%3A55%3A28.006Z",
      status: "finished",
    },
  ]);

  const activeQuizzes = quizzes.filter(quiz => quiz.status !== "finished");
  const finishedQuizzes = quizzes.filter(quiz => quiz.status === "finished");

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
          {activeQuizzes.map((quiz, index) => (
            <React.Fragment key={quiz.id}>
              {index > 0 && <div className="h-px bg-gray-700 my-8"></div>}
              <QuizItem quiz={quiz} isSquare={index < 3} />
            </React.Fragment>
          ))}
          {finishedQuizzes.length > 0 && (
            <>
              <div className="h-px bg-gray-700 my-8"></div>
              <h2 className="text-sm text-gray-400 mb-4">FINISHED</h2>
              <div className="grid grid-cols-2 gap-2">
                {finishedQuizzes.map((quiz) => (
                  <QuizItem 
                    key={quiz.id} 
                    quiz={quiz} 
                    isSmall 
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;