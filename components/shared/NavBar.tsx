import { ColorModeButton } from "@/components/ui/color-mode";
import { HStack, Spacer } from "@chakra-ui/react";
import { BusinessSelector } from "./BusinessSelector";
import HelpIconButton from "./HelpIconButton";
import Notification from "./Notification";
import { ProfileMenu } from "./ProfileMenu";

export const NavBar = () => {
  return (
    <HStack
      px={4}
      py={2}
      top={0}
      bg={"bg"}
      zIndex={"sticky"}
      position={"sticky"}
      borderBottomWidth={"1px"}
    >
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
