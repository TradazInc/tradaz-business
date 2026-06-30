import { Button, HStack } from "@chakra-ui/react";
import Search from "../components/Search";
import { LuPlus } from "react-icons/lu";
import { SideDrawer } from "./SideDrawer";

const ToolBar = () => {
  return (
    <HStack w={"full"} justify={"space-between"}>
      <HStack>
        <SideDrawer />
        <Search placeholder="Search for a business" query="www" />
      </HStack>
      <Button size={"xs"}>
        <LuPlus />
        New Business
      </Button>
    </HStack>
  );
};

export default ToolBar;
