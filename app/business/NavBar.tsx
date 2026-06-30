import { LogoContainer } from "@/app/components/LogoContainer";
import { ColorModeButton } from "@/components/ui/color-mode";
import { HStack, Icon, IconButton } from "@chakra-ui/react";
import { LuBell } from "react-icons/lu";
import { AvatarDropdown } from "./AvatarDropdown";
import { BusinessSelector } from "./BusinessSelector";

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

      <HStack gap="4">
        <ColorModeButton rounded={"full"} />
        <IconButton rounded={"full"} variant={"ghost"}>
          <LuBell strokeWidth="2.5" />
        </IconButton>
        <AvatarDropdown />
      </HStack>
    </HStack>
  );
};
