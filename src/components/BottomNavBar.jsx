import React from 'react';
import { Globe, Zap, Flame, LayoutGrid, Users } from 'lucide-react';
import { cn } from "@/lib/utils";
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const BottomNavBar = ({ activeTab, setActiveTab, backgroundColor = '#212124' }) => {
  const navigate = useNavigate();
  const navItems = [
    { id: 'community', icon: Globe, label: 'Community', route: '/' },
    { id: 'group', icon: Users, label: 'Group', route: '/group' },
    { id: 'upcoming', icon: Flame, label: 'Upcoming', route: '/board' },
    { id: 'profile', icon: Avatar, label: 'Profile', route: '/profile' },
  ];

  const handleNavigation = (item) => {
    setActiveTab(item.id);
    if (item.route) {
      navigate(item.route);
    }
  };

  return (
    <nav className={`fixed bottom-0 left-0 right-0 text-white`} style={{ backgroundColor, borderTop: backgroundColor === '#212124' ? '1px solid #424245' : 'none' }}>
      <ul className="flex justify-around items-start h-16 relative">
        {navItems.map((item, index) => (
          <li key={item.id} className={`flex-1 ${index === 2 ? 'flex-grow-0 w-16' : ''}`}>
            <button
              onClick={() => handleNavigation(item)}
              className={cn(
                "w-full h-full flex flex-col items-center justify-start pt-2",
                activeTab === item.id ? "text-white" : "text-gray-400"
              )}
            >
              {item.id === 'profile' ? (
                <Avatar className="h-6 w-6">
                  <AvatarImage src="https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/pfp/small.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvcGZwL3NtYWxsLnBuZyIsImlhdCI6MTcyNTY5MjI1MywiZXhwIjoxNzU3MjI4MjUzfQ.N4lp3_t2Jjjxnaf5iVkUa67tVjxrYnuAzl5NEE5j65w&t=2024-09-07T06%3A57%3A33.339Z" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              ) : (
                <item.icon className="h-6 w-6 stroke-1" />
              )}
            </button>
          </li>
        ))}
        <li className="absolute left-1/2 -translate-x-1/2 -top-8">
          <button
            onClick={() => {
              setActiveTab('walk');
              navigate('/walk');
            }}
            className={cn(
              "w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center shadow-lg",
              activeTab === 'walk' ? "bg-blue-600" : "bg-blue-500"
            )}
          >
            <Zap className="h-8 w-8 text-white" />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default BottomNavBar;