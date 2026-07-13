import { Box, Heading } from "@chakra-ui/react";

const PageHeader = ({ children }: { children: React.ReactNode }) => {
  return (
    <Heading w={"full"} fontSize={"2xl"} fontWeight={"semibold"} py={2}>
      {children}
    </Heading>
  );
};

export default PageHeader;
