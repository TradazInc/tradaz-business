import { ColorModeButton } from "@/components/ui/color-mode";
import { HStack, Spacer } from "@chakra-ui/react";
import Link from "next/link";
import TradazLogo from "../shared/TradazLogo";
import { ProfileMenu } from "./ProfileMenu";
import { BusinessSelector } from "./BusinessSelector";
import Notification from "./Notification";
import { SideBarDrawer } from "./SideBarDrawer";

export const NavBar = () => {
  return (
    <HStack
      px={4}
      py={2}
      w={"full"}
      bg={"bg.panel"}
      borderBottomWidth={"1px"}
      borderColor={"bg.emphasized"}
    >
      <HStack gap="2">
        <SideBarDrawer />
        <Link href={"/dashboard"}>
          <TradazLogo h={3} />
        </Link>
        <BusinessSelector />
      </HStack>
      <Spacer />
      <HStack gap="2">
        <ColorModeButton rounded={"full"} variant={"subtle"} />
        <Notification />
        <ProfileMenu />
      </HStack>
    </HStack>
  );
};
