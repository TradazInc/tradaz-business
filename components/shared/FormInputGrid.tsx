import { SimpleGrid } from "@chakra-ui/react";
import React from "react";

const FormInputGrid = ({ children }: { children: React.ReactNode }) => {
  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
      {children}
    </SimpleGrid>
  );
};

export default FormInputGrid;
