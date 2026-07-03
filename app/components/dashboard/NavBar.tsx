import { LogoContainer } from "@/app/components/LogoContainer";
import { ColorModeButton } from "@/components/ui/color-mode";
import { HStack } from "@chakra-ui/react";
import { AvatarDropdown } from "./AvatarDropdown";
import { BusinessSelector } from "./BusinessSelector";
import Notification from "./Notification";

export const NavBar = () => {
  return (
    <HStack
      justify={"space-between"}
      px={4}
      py={2}
      w={"full"}
      bg={"bg.panel"}
      borderBottomWidth={"1px"}
      borderColor={"bg.emphasized"}
    >
      <HStack gap="4">
        <LogoContainer>Tradaz</LogoContainer>
        <BusinessSelector />
      </HStack>

      <HStack gap="2">
        <ColorModeButton rounded={"full"} variant={"outline"} />
        <Notification />
        <AvatarDropdown />
      </HStack>
    </HStack>
  );
};
