import { CloseButton, Drawer, IconButton, Portal } from "@chakra-ui/react";
import { LuMenu } from "react-icons/lu";
import { SideBarList } from "./SideBarList";

export const SideBarDrawer = () => {
  return (
    <Drawer.Root placement={"start"} size={"xs"}>
      <Drawer.Trigger asChild>
        <IconButton rounded={"full"} variant={"subtle"}>
          <LuMenu />
        </IconButton>
      </Drawer.Trigger>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Body py={20} px={0}>
              <SideBarList />
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
