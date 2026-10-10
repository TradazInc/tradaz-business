import { ColorModeButton } from "@/components/ui/color-mode";
import { HStack, Spacer } from "@chakra-ui/react";
import { ProfileMenu } from "./ProfileMenu";
import { BusinessSelector } from "./BusinessSelector";
import Notification from "./Notification";
import { SideMenuDrawer } from "./SideMenuDrawer";

export const NavBar = () => {
  return (
    <HStack px={4} py={2} borderBottomWidth={"1px"}>
      <HStack gap={"2"}>
        <SideMenuDrawer />
        <BusinessSelector />
      </HStack>

      <Spacer />

      <HStack gap={"2"}>
        <ColorModeButton rounded={"full"} variant={"outline"} />
        <Notification />
        <ProfileMenu />
      </HStack>
    </HStack>
  );
};
