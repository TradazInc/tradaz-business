import { Heading } from "@chakra-ui/react";

const HeaderText = ({ children }: { children: React.ReactNode }) => {
  return <Heading fontSize={"2xl"}>{children}</Heading>;
};

export default HeaderText;
