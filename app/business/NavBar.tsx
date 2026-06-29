import { LogoContainer } from "@/app/components/LogoContainer";
import { ColorModeButton } from "@/components/ui/color-mode";
import { HStack, Icon } from "@chakra-ui/react";
import { LuBell } from "react-icons/lu";
import { ProfileDropdown } from "./AvatarDropdown";

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
      <LogoContainer>Tradaz</LogoContainer>

      <HStack gap="4">
        <ColorModeButton />
        <Icon fontSize="20px" color="fg">
          <LuBell strokeWidth="2.5" />
        </Icon>
        <ProfileDropdown />
      </HStack>
    </HStack>
  );
};
