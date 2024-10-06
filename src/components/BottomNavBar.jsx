import React, { useState, useEffect } from 'react';
import { Globe, Users, Trophy, Bell, Zap } from 'lucide-react';
import { cn } from "@/lib/utils";
import { useNavigate, useLocation } from 'react-router-dom';
import QuickstartMenu from './QuickstartMenu';

const BottomNavBar = ({ activeTab: propActiveTab, setActiveTab: propSetActiveTab }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [localActiveTab, setLocalActiveTab] = useState(propActiveTab || 'community');
  const [showQuickstartMenu, setShowQuickstartMenu] = useState(false);
  
  const navItems = [
    { id: 'community', icon: Globe, label: 'Community', route: '/' },
    { id: 'group', icon: Users, label: 'Group', route: '/group' },
    { id: 'challenge', icon: Trophy, label: 'Challenge', route: '/board' },
    { id: 'notification', icon: Bell, label: 'Notification', route: '/notifications' },
  ];

  useEffect(() => {
    const currentRoute = navItems.find(item => item.route === location.pathname);
    if (currentRoute) {
      if (typeof propSetActiveTab === 'function') {
        propSetActiveTab(currentRoute.id);
      } else {
        setLocalActiveTab(currentRoute.id);
      }
    }
  }, [location.pathname, propSetActiveTab]);

  const handleNavigation = (item) => {
    if (item.route) {
      if (typeof propSetActiveTab === 'function') {
        propSetActiveTab(item.id);
      } else {
        setLocalActiveTab(item.id);
      }
      navigate(item.route);
    }
  };

  const toggleQuickstartMenu = () => {
    setShowQuickstartMenu(!showQuickstartMenu);
  };

  const currentActiveTab = propActiveTab || localActiveTab;

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 text-foreground h-20 bg-white" style={{ borderTop: '1px solid var(--border)' }}>
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
                  currentActiveTab === item.id ? "text-primary" : "text-muted-foreground"
                )}
              >
                <item.icon className="h-6 w-6 mb-1 stroke-1" />
                <span className="text-xs">{item.label}</span>
              </button>
            </li>
          ))}
          <li className="absolute left-1/2 transform -translate-x-1/2 -top-6">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500 rounded-full opacity-75 animate-ping"></div>
              <div className="absolute inset-0 bg-blue-500 rounded-full opacity-75 animate-pulse"></div>
              <button
                onClick={toggleQuickstartMenu}
                className="relative bg-primary rounded-full w-16 h-16 shadow-lg flex items-center justify-center z-10"
              >
                <Zap className="h-8 w-8 text-primary-foreground stroke-2" />
              </button>
            </div>
          </li>
        </ul>
      </nav>
      {showQuickstartMenu && <QuickstartMenu onClose={() => setShowQuickstartMenu(false)} />}
    </>
  );
};

export default BottomNavBar;