import { VStack } from "@chakra-ui/react";
import React from "react";

export const LayoutContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <VStack h={"dvh"} gap={0}>
      {children}
    </VStack>
  );
};
