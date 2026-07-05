import { authService } from "@/services/auth/auth";
import { IconType } from "react-icons";
import { LuLogOut, LuSettings } from "react-icons/lu";

interface ProfileMenu {
  label: string;
  value: string;
  icon: IconType;
  danger?: boolean;
  handler?: (...args: any[]) => Promise<any>;
}

export const profileMenu: ProfileMenu[] = [
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
    handler: authService.logout,
  },
];
