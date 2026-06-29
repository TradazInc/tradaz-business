import { VStack } from "@chakra-ui/react";

export function SideBar() {
  return (
    <VStack
      p={"5"}
      w={"4%"}
      _hover={{ width: "20%" }}
      h={"full"}
      borderRightWidth={"1px"}
      borderColor="border.muted"
      bg={"bg.panel"}
      transition="all"
    >
      side bar
    </VStack>
  );
}
