import React, { useState } from 'react';
import { Globe, Users, Trophy, Bell, Zap } from 'lucide-react';
import { cn } from "@/lib/utils";
import { useNavigate } from 'react-router-dom';
import QuickstartMenu from './QuickstartMenu';

const BottomNavBar = ({ activeTab, setActiveTab, backgroundColor = 'bg-background' }) => {
  const navigate = useNavigate();
  const [showQuickstartMenu, setShowQuickstartMenu] = useState(false);
  const navItems = [
    { id: 'community', icon: Globe, label: 'Community', route: '/' },
    { id: 'group', icon: Users, label: 'Group', route: '/group' },
    { id: 'challenge', icon: Trophy, label: 'Challenge', route: '/board' },
    { id: 'notification', icon: Bell, label: 'Notification', route: '/notifications' },
  ];

  const handleNavigation = (item) => {
    if (item.route) {
      setActiveTab(item.id);
      navigate(item.route);
    }
  };

  const toggleQuickstartMenu = () => {
    setShowQuickstartMenu(!showQuickstartMenu);
  };

  return (
    <>
      <nav className={`fixed bottom-0 left-0 right-0 text-foreground h-20 ${backgroundColor}`} style={{ borderTop: '1px solid var(--border)' }}>
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
                  activeTab === item.id ? "text-primary" : "text-muted-foreground"
                )}
              >
                <item.icon className="h-6 w-6 mb-1 stroke-1" />
                <span className="text-xs">{item.label}</span>
              </button>
            </li>
          ))}
          <li className="absolute left-1/2 transform -translate-x-1/2 -top-6">
            <button
              onClick={toggleQuickstartMenu}
              className="bg-primary rounded-full w-16 h-16 shadow-lg flex items-center justify-center"
            >
              <Zap className="h-8 w-8 text-primary-foreground stroke-2" />
            </button>
          </li>
        </ul>
      </nav>
      {showQuickstartMenu && <QuickstartMenu onClose={() => setShowQuickstartMenu(false)} />}
    </>
  );
};

export default BottomNavBar;