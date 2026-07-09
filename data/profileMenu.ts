import { logout } from "@/services/auth";
import { IconType } from "react-icons";
import { LuLogOut, LuSettings } from "react-icons/lu";

interface ProfileMenu {
  label: string;
  value: string;
  icon: IconType;
  danger?: boolean;
  handler?: (arg: any) => Promise<any>;
}

export const profileMenu: ProfileMenu[] = [
  {
    label: "Log Out",
    value: "logout",
    icon: LuLogOut,
    danger: true,
    handler: logout,
  },
];
