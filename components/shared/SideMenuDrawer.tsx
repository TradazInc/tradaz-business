import { CloseButton, Drawer, IconButton, Portal } from "@chakra-ui/react";
import { LuMenu } from "react-icons/lu";
import { SideMenuList } from "./SideMenuList";
import { SideMenuSectionList } from "./SideMenuSectionList";

export const SideMenuDrawer = () => {
  return (
    <Drawer.Root placement={"start"} size={"xs"}>
      <Drawer.Trigger asChild>
        <IconButton rounded={"full"} variant={"outline"} size={"sm"}>
          <LuMenu />
        </IconButton>
      </Drawer.Trigger>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Body py={20} px={0}>
              <SideMenuList />
              <SideMenuSectionList />
            </Drawer.Body>
            <Drawer.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
};
