import { ColorModeButton } from "@/components/ui/color-mode";
import { Flex, HStack, Avatar, Icon } from "@chakra-ui/react";
import { LuBell } from "react-icons/lu";
import { LogoContainer } from "@/app/components/LogoContainer";

const NavBar = () => {
  return (
    <Flex
      as="header"
      h="60px"
      w="full"
      align="center"
      justify="space-between"
      position="fixed"
      top="0"
      zIndex={100}
      flexShrink={0}
      px={{ base: 4, lg: 8 }}
      bg="bg.panel"
      borderBottomWidth="1px"
      borderColor="border.muted"
    >
      <LogoContainer>Tradaz</LogoContainer>

      <HStack gap="4">
        <ColorModeButton />

        <Icon fontSize="20px" mt={1} color="fg">
          <LuBell strokeWidth="2.5" />
        </Icon>

        <ProfileAvatar />
      </HStack>
    </Flex>
  );
};

const ProfileAvatar = () => {
  return (
    <Avatar.Root>
      <Avatar.Fallback name="Segun Adebayo" />
      <Avatar.Image src="https://bit.ly/sage-adebayo" />
    </Avatar.Root>
  );
};

export default NavBar;
