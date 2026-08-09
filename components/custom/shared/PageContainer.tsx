import { Box } from "@chakra-ui/react";

export const PageContainer = ({ children }: { children: React.ReactNode }) => (
  <Box overflowY="auto" px={{ base: 10, md: 36 }} pb={32}>
    {children}
  </Box>
);
