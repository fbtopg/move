import React from 'react';
import { Globe } from 'lucide-react';
import { cn } from "@/lib/utils";
import { useNavigate, useLocation } from 'react-router-dom';
import QuickstartMenu from './QuickstartMenu';
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

  const currentActiveTab = propActiveTab || location.pathname === '/' ? 'community' : 'challenge';

  return (
    <nav className="fixed bottom-0 left-0 right-0 text-foreground h-20 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.1)]" style={{ borderTop: '1px solid var(--border)' }}>
      <ul className="flex justify-around items-center h-full relative">
        {navItems.map((item, index) => (
          <li key={item.id} className={cn(
            "flex-1",
            index === 0 ? "mr-12" : "ml-12"
          )}>
            <button
              onClick={() => handleNavigation(item)}
              className={cn(
                "w-full h-full flex items-center justify-center",
                currentActiveTab === item.id ? "text-primary" : "text-muted-foreground",
                "pb-4"
              )}
            >
              <item.icon className="h-6 w-6 stroke-1" />
            </button>
          </li>
        ))}
        <li className="absolute left-1/2 transform -translate-x-1/2 -top-6">
          <QuickstartMenu />
        </li>
      </ul>
    </nav>
  );
};

export default BottomNavBar;