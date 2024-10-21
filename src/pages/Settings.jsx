import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Bell, Moon, Volume2, Trash2, FileText, Globe, Info, LogOut, UserX } from 'lucide-react';
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useTheme } from 'next-themes';
import { useSupabaseAuth } from '../integrations/supabase/auth';
import { toast } from 'sonner';

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
  const { logout } = useSupabaseAuth();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const handleDeleteActivity = () => {
    // Implement delete activity logic here
    toast.success("Activity data deleted successfully");
  };

  const handleDeleteAccount = () => {
    // Implement delete account logic here
    toast.error("Account deletion is not implemented yet");
  };

  const handleViewDocument = (document) => {
    // Implement view document logic here
    toast.info(`Viewing ${document}`);
  };

  return (
    <div className="min-h-screen bg-[#FBFCFC] dark:bg-gray-900 text-foreground">
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
          <SettingItem icon={Volume2} label="Sound">
            <Switch />
          </SettingItem>
          <Separator />
          <SettingItem icon={Moon} label="Dark Mode">
            <Switch checked={theme === 'dark'} onCheckedChange={toggleTheme} />
          </SettingItem>
          <Separator />
          <SettingItem icon={Trash2} label="Delete My Activity Data">
            <Button variant="ghost" size="sm" onClick={handleDeleteActivity}>Delete</Button>
          </SettingItem>
          <Separator />
          <SettingItem icon={FileText} label="Terms and Conditions">
            <Button variant="ghost" size="sm" onClick={() => handleViewDocument('Terms and Conditions')}>View</Button>
          </SettingItem>
          <Separator />
          <SettingItem icon={FileText} label="Privacy Policy">
            <Button variant="ghost" size="sm" onClick={() => handleViewDocument('Privacy Policy')}>View</Button>
          </SettingItem>
          <Separator />
          <SettingItem icon={Globe} label="Language">
            <Button variant="ghost" size="sm">English</Button>
          </SettingItem>
          <Separator />
          <SettingItem icon={Info} label="App Version">
            <span className="text-sm text-gray-500">v1.0.1</span>
          </SettingItem>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-6 space-y-4"
        >
          <Button variant="outline" className="w-full" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Log Out
          </Button>
          <Button variant="destructive" className="w-full" onClick={handleDeleteAccount}>
            <UserX className="w-4 h-4 mr-2" />
            Delete Account
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default Settings;