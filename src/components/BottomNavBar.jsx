import React from 'react';
import { Globe, Zap, LayoutGrid, User } from 'lucide-react';
import { cn } from "@/lib/utils";
import { useNavigate } from 'react-router-dom';

const BottomNavBar = ({ activeTab, setActiveTab }) => {
  const navigate = useNavigate();
  const navItems = [
    { id: 'community', icon: Globe, label: 'Community', route: '/' },
    { id: 'walk', icon: Zap, label: 'Walk', route: '/daily-walk-challenge' },
    { id: 'board', icon: LayoutGrid, label: 'Board', route: '/leaderboard' },
    { id: 'profile', icon: User, label: 'Profile', route: '/profile' },
  ];

  const handleNavigation = (item) => {
    setActiveTab(item.id);
    navigate(item.route);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#111111] text-white">
      <ul className="flex justify-around items-center h-16">
        {navItems.map((item) => (
          <li key={item.id} className="flex-1">
            <button
              onClick={() => handleNavigation(item)}
              className={cn(
                "w-full h-full flex flex-col items-center justify-center",
                activeTab === item.id ? "text-white" : "text-gray-400"
              )}
            >
              <item.icon className="h-6 w-6 mb-1 stroke-1" />
              {activeTab === item.id && (
                <span className="text-xs font-light">{item.label}</span>
              )}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default BottomNavBar;