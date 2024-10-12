import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Bell, Lock, Eye, Volume2, Moon, Smartphone, Globe, Sun } from 'lucide-react';
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useTheme } from 'next-themes';

const SettingItem = ({ icon: Icon, label, children }) => (
  <div className="flex items-center justify-between py-4">
    <div className="flex items-center">
      <Icon className="w-5 h-5 mr-3 text-gray-500 dark:text-gray-400" />
      <span>{label}</span>
    </div>
    {children}
  </div>
);

const Settings = () => {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FEF8F3] via-[#F0E7E0] to-[#E6D0C5] dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 text-foreground">
      <div className="max-w-md mx-auto p-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center mb-6"
        >
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="mr-2">
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-2xl font-bold">Settings</h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
        >
          <SettingItem icon={Bell} label="Notifications">
            <Switch />
          </SettingItem>
          <Separator />
          <SettingItem icon={Lock} label="Privacy">
            <Button variant="ghost" size="sm">Manage</Button>
          </SettingItem>
          <Separator />
          <SettingItem icon={theme === 'dark' ? Sun : Moon} label="Dark Mode">
            <Switch checked={theme === 'dark'} onCheckedChange={toggleTheme} />
          </SettingItem>
          <Separator />
          <SettingItem icon={Volume2} label="Sound">
            <Switch />
          </SettingItem>
          <Separator />
          <SettingItem icon={Moon} label="Do Not Disturb">
            <Switch />
          </SettingItem>
          <Separator />
          <SettingItem icon={Smartphone} label="App Permissions">
            <Button variant="ghost" size="sm">View</Button>
          </SettingItem>
          <Separator />
          <SettingItem icon={Globe} label="Language">
            <Button variant="ghost" size="sm">English</Button>
          </SettingItem>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-6"
        >
          <Button variant="outline" className="w-full">Log Out</Button>
        </motion.div>
      </div>
    </div>
  );
};

export default Settings;