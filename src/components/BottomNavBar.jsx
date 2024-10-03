import React, { useState } from 'react';
import { Globe, Users, Flame, LayoutGrid } from 'lucide-react';
import { cn } from "@/lib/utils";
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import QuickstartMenu from './QuickstartMenu';

const BottomNavBar = ({ activeTab, setActiveTab, backgroundColor = '#212124' }) => {
  const navigate = useNavigate();
  const [showQuickstartMenu, setShowQuickstartMenu] = useState(false);
  const navItems = [
    { id: 'community', icon: Globe, label: 'Community', route: '/' },
    { id: 'group', icon: Users, label: 'Group', route: '/group' },
    { id: 'upcoming', icon: Flame, label: 'Upcoming', route: '/board' },
    { id: 'profile', icon: Avatar, label: 'Profile', route: '/profile' },
  ];

  const handleNavigation = (item) => {
    if (item.route) {
      setActiveTab(item.id);
      navigate(item.route);
    }
  };

  return (
    <>
      <nav className={`fixed bottom-0 left-0 right-0 text-white h-20`} style={{ backgroundColor, borderTop: backgroundColor === '#212124' ? '1px solid #424245' : 'none' }}>
        <ul className="flex justify-around items-start h-full relative pt-2">
          {navItems.map((item, index) => (
            <li key={item.id} className={cn(
              "flex-1",
              index === 1 ? "mr-6" : "",
              index === 2 ? "ml-6" : ""
            )}>
              <button
                onClick={() => handleNavigation(item)}
                className={cn(
                  "w-full h-full flex flex-col items-center justify-start pt-1",
                  activeTab === item.id ? "text-white" : "text-gray-400"
                )}
              >
                {item.id === 'profile' ? (
                  <Avatar className="h-6 w-6 mb-1">
                    <AvatarImage src="https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/pfp/small.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvcGZwL3NtYWxsLnBuZyIsImlhdCI6MTcyNTY5MjI1MywiZXhwIjoxNzU3MjI4MjUzfQ.N4lp3_t2Jjjxnaf5iVkUa67tVjxrYnuAzl5NEE5j65w&t=2024-09-07T06%3A57%3A33.339Z" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                ) : (
                  <item.icon className="h-6 w-6 mb-1 stroke-1" />
                )}
                <span className="text-xs">{item.label}</span>
              </button>
            </li>
          ))}
          <li className="absolute left-1/2 transform -translate-x-1/2 -top-6">
            <button
              onClick={() => setShowQuickstartMenu(true)}
              className="bg-blue-500 rounded-full w-16 h-16 shadow-lg flex items-center justify-center"
            >
              <Flame className="h-8 w-8 text-white stroke-2" />
            </button>
          </li>
        </ul>
      </nav>
      {showQuickstartMenu && <QuickstartMenu onClose={() => setShowQuickstartMenu(false)} />}
    </>
  );
};

export default BottomNavBar;