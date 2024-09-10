import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const Quiz = () => {
  const navigate = useNavigate();

  const quizzes = [
    { title: "Today's Quiz", question: "What is the capital of Indonesia?", image: "https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/quiz/Frame%2095.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvcXVpei9GcmFtZSA5NS5wbmciLCJpYXQiOjE3MjU5Mzg1NzMsImV4cCI6MTc1NzQ3NDU3M30.i7Qjnq4mYr_VgnhL9CkNXXdCIFCLsLKp2lIaZ0ijWmo&t=2024-09-10T03%3A22%3A54.207Z" },
    { title: "Yesterday's Quiz", question: "Which planet is known as the Red Planet?", image: "https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/quiz/Frame%2096.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvcXVpei9GcmFtZSA5Ni5wbmciLCJpYXQiOjE3MjU5Mzg1OTMsImV4cCI6MTc1NzQ3NDU5M30.F0bZeKm1pv_2ciSkNqRSnp-MyncY9zmrWCsniCG5iZo&t=2024-09-10T03%3A23%3A13.842Z" },
    { title: "Finished Quiz", question: "What is the largest mammal on Earth?", image: "https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/quiz/Frame%2097.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvcXVpei9GcmFtZSA5Ny5wbmciLCJpYXQiOjE3MjU5Mzg2MTAsImV4cCI6MTc1NzQ3NDYxMH0.-tBzfXj83KjZJmrJWN4UL18P13kZ4Bt6Fwv7n-6E53s&t=2024-09-10T03%3A23%3A31.080Z" },
  ];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <div className="p-2">
        <div className="max-w-md mx-auto">
          <button onClick={() => navigate(-1)} className="mb-4">
            <ArrowLeft className="h-6 w-6" />
          </button>
          <h1 className="text-2xl font-bold mb-6">Quiz</h1>
        </div>
      </div>
      <div className="flex-grow overflow-y-auto pb-20">
        <div className="max-w-md mx-auto p-2">
          {quizzes.map((quiz, index) => (
            <div key={index} className="mb-8">
              <h2 className="text-xl font-bold mb-4">{quiz.title}</h2>
              <div 
                className="aspect-square mb-4 rounded-lg overflow-hidden relative"
                style={{
                  backgroundImage: `url(${quiz.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <div className="absolute inset-0 flex flex-col justify-center p-6">
                  <p className="text-sm font-semibold mb-2">Quiz #{index + 1}</p>
                  <h3 className="text-2xl font-light text-white">
                    {quiz.question}
                  </h3>
                </div>
                <Button
                  className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-white text-black hover:bg-gray-200 transition-colors"
                  onClick={() => console.log(`Participate in ${quiz.title}`)}
                >
                  <ArrowRight className="h-6 w-6" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Quiz;