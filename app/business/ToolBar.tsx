import { Button, HStack } from "@chakra-ui/react";
import Search from "../components/Search";
import { LuPlus } from "react-icons/lu";

const ToolBar = () => {
  return (
    <HStack w={"full"} justify={"space-between"}>
      <Search placeholder="Search for a business" query="www" />
      <Button size={"xs"}>
        <LuPlus />
        New Business
      </Button>
    </HStack>
  );
};

export default ToolBar;
