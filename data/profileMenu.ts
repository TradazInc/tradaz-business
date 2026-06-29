import { LuLogOut, LuSettings } from "react-icons/lu";

export const profileMenu = [
  {
    label: "Account Settings",
    value: "settings",
    icon: LuSettings,
  },
  {
    label: "Log Out",
    value: "logout",
    icon: LuLogOut,
    danger: true,
  },
];
