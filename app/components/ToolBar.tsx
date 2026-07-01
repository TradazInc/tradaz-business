import { Button, HStack } from "@chakra-ui/react";
import { Suspense } from "react";
import { LuPlus } from "react-icons/lu";
import Search from "@/app/components/Search";
import { SideDrawer } from "./SideDrawer";

const ToolBar = () => {
  return (
    <HStack w={"full"} justify={"space-between"}>
      <HStack>
        <SideDrawer />
        <Suspense>
          <Search placeholder="Search for a business" query="business" />
        </Suspense>
      </HStack>
      <Button size={"xs"}>
        <LuPlus />
        New Business
      </Button>
    </HStack>
  );
};

export default ToolBar;
