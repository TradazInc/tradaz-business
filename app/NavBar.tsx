import { HStack } from "@chakra-ui/react";

import { ColorModeButton } from "@/components/ui/color-mode";

const NavBar = () => {
  return (
    <HStack padding={"10px"} marginY={5}>
      <ColorModeButton />
    </HStack>
  );
};

export default NavBar;
