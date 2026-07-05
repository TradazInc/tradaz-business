import { Flex, Text } from "@chakra-ui/react";
import React from "react";

export const LogoContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <Flex align="center" gap={3} userSelect="none">
      <Text
        fontSize="xl"
        fontWeight="extrabold"
        color="bg.fg"
        letterSpacing="tight"
      >
        {children}
        <Text as="span" color="green.500">
          .
        </Text>
      </Text>
    </Flex>
  );
};
