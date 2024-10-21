import React from 'react';
import { Globe } from 'lucide-react';
import { cn } from "@/lib/utils";
import { useNavigate, useLocation } from 'react-router-dom';
import ChallengeIcon from './icons/ChallengeIcon';

const BottomNavBar = ({ activeTab: propActiveTab, setActiveTab: propSetActiveTab }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const navItems = [
    { id: 'community', icon: Globe, route: '/' },
    { id: 'challenge', icon: ChallengeIcon, route: '/board' },
  ];

  const handleNavigation = (item) => {
    if (item.route) {
      if (typeof propSetActiveTab === 'function') {
        propSetActiveTab(item.id);
      }
      navigate(item.route);
    }
  };

  const getCurrentActiveTab = () => {
    if (propActiveTab) return propActiveTab;
    if (location.pathname === '/') return 'community';
    if (location.pathname === '/board') return 'challenge';
    return '';
  };

  const currentActiveTab = getCurrentActiveTab();

  return (
    <nav className="fixed bottom-0 left-0 right-0 text-foreground h-20 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.1)]" style={{ borderTop: '1px solid var(--border)' }}>
      <ul className="flex justify-around items-center h-full">
        {navItems.map((item) => (
          <li key={item.id} className="flex-1">
            <button
              onClick={() => handleNavigation(item)}
              className={cn(
                "w-full h-full flex items-center justify-center",
                currentActiveTab === item.id ? "text-primary" : "text-muted-foreground"
              )}
            >
              <item.icon className="h-6 w-6 stroke-1" />
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default BottomNavBar;