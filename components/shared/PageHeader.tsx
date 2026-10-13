import { Box } from "@chakra-ui/react";
import HeaderText from "./HeaderText";

const PageHeader = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box w={"full"}>
      {typeof children === "string" ? (
        <HeaderText>{children}</HeaderText>
      ) : (
        children
      )}
    </Box>
  );
};

export default PageHeader;
