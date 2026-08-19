import { Box, BoxProps } from "@chakra-ui/react";

export const PageContainer = ({
  children,
  ...props
}: { children: React.ReactNode } & BoxProps) => (
  <Box overflowY="auto" px={{ base: 10, md: 36 }} {...props}>
    {children}
  </Box>
);
