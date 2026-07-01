import { Box } from "@chakra-ui/react";

const Header = ({ text }: { text: string }) => {
  return (
    <Box w={"full"} fontSize={"2xl"} fontWeight={"semibold"} py={10}>
      {text}
    </Box>
  );
};

export default Header;
