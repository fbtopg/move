import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const Quiz = () => {
  const navigate = useNavigate();

  const quizzes = [
    { title: "Today's Quiz", question: "What is the capital of Indonesia?", image: "https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/quiz/Frame%2095%20(1).png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvcXVpei9GcmFtZSA5NSAoMSkucG5nIiwiaWF0IjoxNzI1OTM2MjUwLCJleHAiOjE3NTc0NzIyNTB9.kn7-2IZsbyj28fZxa2AFPlf8HgTv_b8s2GqS3W_qw2M&t=2024-09-10T02%3A44%3A10.934Z" },
    { title: "Yesterday's Quiz", question: "Which planet is known as the Red Planet?", image: "https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/quiz/Frame%2095%20(2).png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvcXVpei9GcmFtZSA5NSAoMikucG5nIiwiaWF0IjoxNzI1OTM2MjgwLCJleHAiOjE3NTc0NzIyODB9.vhfWwRXNNVGGLZVVhOmV7GyRyBZwMwVmOEp1yfLBdQY&t=2024-09-10T02%3A44%3A40.422Z" },
    { title: "Finished Quiz", question: "What is the largest mammal on Earth?", image: "https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/quiz/Frame%2095.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvcXVpei9GcmFtZSA5NS5wbmciLCJpYXQiOjE3MjU5MzYyMjMsImV4cCI6MTc1NzQ3MjIyM30.7AQFM0V8Yl3KkXBPzBOz3KqJfZZoNpOypLo34nXNRVY&t=2024-09-10T02%3A43%3A43.355Z" },
  ];

  const getBackgroundStyle = (index) => {
    if (index === 1) { // Yesterday's Quiz
      return {
        background: 'linear-gradient(135deg, #4a90e2, #8e44ad)',
      };
    } else if (index === 2) { // Finished Quiz
      return {
        background: 'linear-gradient(135deg, #2ecc71, #3498db)',
      };
    }
    return {}; // Default (no gradient for Today's Quiz)
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <div className="p-4">
        <button onClick={() => navigate(-1)} className="mb-4">
          <ArrowLeft className="h-6 w-6" />
        </button>
        <h1 className="text-2xl font-bold mb-6">Quiz</h1>
      </div>
      <div className="flex-grow overflow-y-auto pb-20">
        <div className="max-w-md mx-auto p-4">
          {quizzes.map((quiz, index) => (
            <div key={index} className="mb-8">
              <h2 className="text-xl font-bold mb-4">{quiz.title}</h2>
              <div 
                className="aspect-square mb-4 rounded-lg overflow-hidden relative"
                style={getBackgroundStyle(index)}
              >
                <img 
                  src={quiz.image}
                  alt={quiz.title}
                  className="w-full h-full object-cover"
                />
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