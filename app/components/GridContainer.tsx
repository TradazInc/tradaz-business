import { SimpleGrid } from "@chakra-ui/react";

const GridContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <SimpleGrid
      columns={{ sm: 1, md: 2, lg: 3, "2xl": 4 }}
      gap={6}
      padding={{ base: 3, md: 6 }}
    >
      {children}
    </SimpleGrid>
  );
};

export default GridContainer;
