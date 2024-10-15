import { Home, Users, Trophy, User } from "lucide-react";
import Community from "./pages/Community";
import Group from "./pages/Group";
import Challenge from "./pages/Challenge";
import Profile from "./pages/Profile";

export const navItems = [
  {
    title: "Community",
    to: "/",
    icon: Home,
    page: <Community />,
  },
  {
    title: "Group",
    to: "/group",
    icon: Users,
    page: <Group />,
  },
  {
    title: "Challenge",
    to: "/challenge",
    icon: Trophy,
    page: <Challenge />,
  },
  {
    title: "Profile",
    to: "/profile",
    icon: User,
    page: <Profile />,
  },
];