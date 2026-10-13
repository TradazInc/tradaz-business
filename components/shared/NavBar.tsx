import { ColorModeButton } from "@/components/ui/color-mode";
import { HStack, Spacer } from "@chakra-ui/react";
import { BusinessSelector } from "./BusinessSelector";
import HelpIconButton from "./HelpIconButton";
import Notification from "./Notification";
import { ProfileMenu } from "./ProfileMenu";

export const NavBar = () => {
  return (
    <HStack px={4} py={2} borderBottomWidth={"1px"} top={0} position={"sticky"}>
      <BusinessSelector />

      <Spacer />

      <HStack gap={"2"}>
        <ColorModeButton rounded={"full"} variant={"outline"} />
        <HelpIconButton />
        <Notification />
        <ProfileMenu />
      </HStack>
    </HStack>
  );
};
