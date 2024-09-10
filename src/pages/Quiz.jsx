import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getRandomProfilePicture } from '../utils/profilePictures';

const Quiz = () => {
  const navigate = useNavigate();

  const quizzes = [
    { 
      title: "Today's Quiz", 
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
      status: "active"
    },
    { 
      title: "Yesterday's Quiz", 
      question: "Which planet is known as the Red Planet?", 
      image: "https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/quiz/Frame%2096.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvcXVpei9GcmFtZSA5Ni5wbmciLCJpYXQiOjE3MjU5Mzg1OTMsImV4cCI6MTc1NzQ3NDU5M30.F0bZeKm1pv_2ciSkNqRSnp-MyncY9zmrWCsniCG5iZo&t=2024-09-10T03%3A23%3A13.842Z",
      status: "active"
    },
    { 
      title: "Finished Quiz", 
      question: "What is the largest mammal on Earth?", 
      image: "https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/quiz/Frame%2097.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvcXVpei9GcmFtZSA5Ny5wbmciLCJpYXQiOjE3MjU5Mzg2MTAsImV4cCI6MTc1NzQ3NDYxMH0.-tBzfXj83KjZJmrJWN4UL18P13kZ4Bt6Fwv7n-6E53s&t=2024-09-10T03%3A23%3A31.080Z",
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
          <h1 className="text-2xl font-bold mb-6">Quiz</h1>
        </div>
      </div>
      <div className="flex-grow overflow-y-auto pb-20">
        <div className="max-w-md mx-auto p-2">
          {quizzes.map((quiz, index) => (
            <React.Fragment key={index}>
              {index > 0 && <div className="h-px bg-gray-700 my-8"></div>}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-sm text-gray-400">{quiz.title.toUpperCase()}</h2>
                  {quiz.participants && (
                    <div className="flex items-center">
                      <div className="flex -space-x-2 overflow-hidden mr-2">
                        {quiz.participants.slice(0, 3).map((participant) => (
                          <Avatar key={participant.id} className="inline-block h-6 w-6 rounded-full ring-2 ring-black">
                            <AvatarImage src={getRandomProfilePicture()} alt={participant.name} />
                            <AvatarFallback>{participant.name[0]}</AvatarFallback>
                          </Avatar>
                        ))}
                      </div>
                      <span className="text-xs text-gray-400">{quiz.activeParticipants} active</span>
                    </div>
                  )}
                </div>
                <div 
                  className="aspect-square mb-4 rounded-lg overflow-hidden relative cursor-pointer"
                  style={{
                    backgroundImage: `url(${quiz.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                  onClick={() => console.log(`Participate in ${quiz.title}`)}
                >
                  <div className="absolute inset-0 flex flex-col justify-center p-6">
                    <div className="text-left">
                      <p className="text-sm font-semibold mb-2">Quiz #{index + 1}</p>
                      <h3 className="text-4xl font-light text-white mb-4">
                        {quiz.question}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Quiz;