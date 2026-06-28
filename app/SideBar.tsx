"use client";

import { Box } from "@chakra-ui/react";

export function SideBar() {
  return (
    <Box
      as="nav"
      w={{ base: "full", md: "250px" }}
      pos="fixed"
      h="100%"
      borderRightWidth="1px"
      borderColor="border.muted"
      bg="bg.panel"
      py="6"
      px="4"
    >
      side bar
    </Box>
  );
}
