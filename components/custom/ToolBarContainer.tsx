import { HStack } from "@chakra-ui/react";
import React from "react";

const ToolBarContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <HStack w={"full"} justify={"space-between"}>
     {children}
    </HStack>
  );
};

export default ToolBarContainer;
