import { VStack, StackProps } from "@chakra-ui/react";

export const PageContainer = ({
  children,
  ...props
}: { children: React.ReactNode } & StackProps) => (
  <VStack p={4} gapY={4} overflowY={"auto"} scrollbar={"hidden"} {...props}>
    {children}
  </VStack>
);
