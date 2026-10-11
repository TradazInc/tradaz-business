import { VStack, StackProps } from "@chakra-ui/react";

export const PageContainer = ({
  children,
  ...props
}: { children: React.ReactNode } & StackProps) => (
  <VStack
    gapY={4}
    overflowY={"auto"}
    scrollbar={"hidden"}
    px={{ base: 10, md: 28 }}
    {...props}
  >
    {children}
  </VStack>
);
