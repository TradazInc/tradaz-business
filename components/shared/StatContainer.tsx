import { HStack } from "@chakra-ui/react";
import React from "react";

const StatContainer = ({ children }: { children: React.ReactNode }) => {
  return <HStack minH={28}>{children}</HStack>;
};

export default StatContainer;
