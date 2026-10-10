import { FormatNumber, Progress, Stat, StatRootProps } from "@chakra-ui/react";
import React from "react";

export const StatContainer = ({
  children,
  ...props
}: { children: React.ReactNode } & StatRootProps) => {
  return (
    <Stat.Root
      p={4}
      w={"full"}
      h={"full"}
      rounded={"md"}
      borderWidth={"1px"}
      {...props}
    >
      {children}
    </Stat.Root>
  );
};
