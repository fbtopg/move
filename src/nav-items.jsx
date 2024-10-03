import Community from "./pages/Community";
import Group from "./pages/Group";
import Board from "./pages/Board";
import Notifications from "./pages/Notifications";
import Me from "./pages/Me";

export const navItems = [
  { to: "/", page: <Community /> },
  { to: "/group", page: <Group /> },
  { to: "/board", page: <Board /> },
  { to: "/notifications", page: <Notifications /> },
  { to: "/me", page: <Me /> },
];