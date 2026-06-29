import { LogoContainer } from "@/app/components/LogoContainer";
import { ColorModeButton } from "@/components/ui/color-mode";
import { HStack, Icon } from "@chakra-ui/react";
import { LuBell } from "react-icons/lu";
import { AvatarDropdown } from "./AvatarDropdown";
import { BusinessSelector } from "./BusinessSelector";

export const NavBar = () => {
  return (
    <HStack
      w="full"
      justify="space-between"
      p={4}
      bg="bg.panel"
      borderBottomWidth="1px"
      borderColor="border.muted"
    >
      <HStack gap="4">
        <LogoContainer>Tradaz</LogoContainer>
        <BusinessSelector />
      </HStack>

      <HStack gap="4">
        <ColorModeButton />
        <Icon fontSize="20px" color="fg">
          <LuBell strokeWidth="2.5" />
        </Icon>
        <AvatarDropdown />
      </HStack>
    </HStack>
  );
};
