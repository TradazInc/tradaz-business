import { VStack } from "@chakra-ui/react";

export function SideBar() {
  return (
    <VStack
      p={"5"}
      w={"4%"}
      _hover={{ width: "20%" }}
      h={"full"}
      bg={"bg.panel"}
      borderRightWidth={"1px"}
      borderColor={"bg.emphasized"}
      transition={"all"}
    >
      side bar
    </VStack>
  );
}
