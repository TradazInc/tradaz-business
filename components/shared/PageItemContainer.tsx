import { HStack, StackProps } from "@chakra-ui/react";
import React from "react";

interface Props {
  children: React.ReactNode;
}

export const PageItemContainer = ({
  children,
  ...props
}: Props & StackProps) => {
  return (
    <HStack w={"full"} justify={"space-between"} {...props}>
      {children}
    </HStack>
  );
};
