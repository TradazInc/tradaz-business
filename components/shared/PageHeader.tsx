import { Heading } from "@chakra-ui/react";

const PageHeader = ({ children }: { children: React.ReactNode }) => {
  return (
    <Heading w={"full"} fontSize={"2xl"} fontWeight={"semibold"} my={5}>
      {children}
    </Heading>
  );
};

export default PageHeader;
