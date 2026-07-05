import { HStack } from "@chakra-ui/react";
import React from "react";

export const PageContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <HStack w={"dvw"} h={"full"} px={{ base: 10, md: 36 }}>
      {children}
    </HStack>
  );
};
