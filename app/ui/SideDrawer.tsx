"use client";

import { sideBarItems } from "@/data/sideBarItems";
import {
  Accordion,
  CloseButton,
  Drawer,
  HStack,
  Icon,
  IconButton,
  Portal,
} from "@chakra-ui/react";
import { LuMenu } from "react-icons/lu";

export const SideDrawer = () => {
  return (
    <Drawer.Root>
      <Drawer.Trigger asChild>
        <IconButton rounded={"full"} variant={"outline"}>
          <LuMenu />
        </IconButton>
      </Drawer.Trigger>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Body py={20} px={0}>
              <SideBarItems />
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

export const SideBarItems = () => {
  return (
    <Accordion.Root
      collapsible
      defaultValue={["b"]}
      w={"full"}
      variant={"enclosed"}
    >
      {sideBarItems.map((item, index) => (
        <Accordion.Item key={index} value={item.label} my={2}>
          <Accordion.ItemTrigger justifyContent={"space-between"}>
            <SideBarButton>
              <Icon fontSize="lg" color="fg.subtle">
                <Icon as={item.icon} />
              </Icon>
              {item.label}
            </SideBarButton>
            <Accordion.ItemIndicator />
          </Accordion.ItemTrigger>
          {item.children &&
            item.children.map((child, index) => (
              <Accordion.ItemContent key={index}>
                <Accordion.ItemBody pl={5}>
                  <SideBarButton>
                    <Icon fontSize="lg" color="fg.subtle">
                      <Icon as={child.icon} />
                    </Icon>
                    {child.label}
                  </SideBarButton>
                </Accordion.ItemBody>
              </Accordion.ItemContent>
            ))}
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
};

export const SideBarButton = ({ children }: { children: React.ReactNode }) => {
  return <HStack>{children}</HStack>;
};
