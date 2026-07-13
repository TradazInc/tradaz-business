import { HStack } from "@chakra-ui/react";
import React from "react";

export const PageContainer = ({ children }: { children: React.ReactNode }) => {
  return <HStack padding={{ base: 3, md: 6 }}>{children}</HStack>;
};
