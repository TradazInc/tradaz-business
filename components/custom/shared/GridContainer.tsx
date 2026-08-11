import { SimpleGrid, SimpleGridProps } from "@chakra-ui/react";

const GridContainer = ({
  children,
  ...props
}: { children: React.ReactNode } & SimpleGridProps) => {
  return (
    <SimpleGrid
      columns={{ base: 1, md: 2, lg: 3, "2xl": 4 }}
      w={"full"}
      gap={4}
      {...props}
    >
      {children}
    </SimpleGrid>
  );
};

export default GridContainer;
