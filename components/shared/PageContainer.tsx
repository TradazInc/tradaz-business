import { VStack, StackProps } from "@chakra-ui/react";

export const PageContainer = ({
  children,
  ...props
}: { children: React.ReactNode } & StackProps) => (
  <VStack overflowY={"auto"} px={{ base: 10, md: 36 }} {...props}>
    {children}
  </VStack>
);
