import React from 'react';
import { Globe, Users, Trophy, Bell, User } from 'lucide-react';
import { cn } from "@/lib/utils";
import { useNavigate } from 'react-router-dom';

const BottomNavBar = ({ activeTab, setActiveTab, backgroundColor = 'bg-background' }) => {
  const navigate = useNavigate();
  
  const navItems = [
    { id: 'community', icon: Globe, label: 'Community', route: '/' },
    { id: 'group', icon: Users, label: 'Group', route: '/group' },
    { id: 'challenge', icon: Trophy, label: 'Challenge', route: '/board' },
    { id: 'notification', icon: Bell, label: 'Notification', route: '/notifications' },
    { id: 'me', icon: User, label: 'Me', route: '/me' },
  ];

  const handleNavigation = (item) => {
    if (item.route) {
      setActiveTab(item.id);
      navigate(item.route);
    }
  };

  return (
    <nav className={`fixed bottom-0 left-0 right-0 text-foreground h-20 ${backgroundColor}`} style={{ borderTop: '1px solid var(--border)' }}>
      <ul className="flex justify-around items-start h-full relative pt-2">
        {navItems.map((item) => (
          <li key={item.id} className="flex-1">
            <button
              onClick={() => handleNavigation(item)}
              className={cn(
                "w-full h-full flex flex-col items-center justify-start pt-1",
                activeTab === item.id ? "text-primary" : "text-muted-foreground"
              )}
            >
              <item.icon className="h-6 w-6 mb-1 stroke-1" />
              <span className="text-xs">{item.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default BottomNavBar;