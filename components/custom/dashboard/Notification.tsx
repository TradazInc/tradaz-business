"use client";

import { notifications } from "@/data/notifications";
import {
  Circle,
  DataList,
  Float,
  Icon,
  IconButton,
  Menu,
  Portal,
} from "@chakra-ui/react";
import { LuBell, LuCircleCheck } from "react-icons/lu";

const Notification = () => {
  return (
    <Menu.Root>
      <Menu.Trigger rounded="full" focusRing="outside" asChild>
        <IconButton rounded={"full"} variant={"subtle"}>
          <LuBell />
          <Float offsetX="1" offsetY="1">
            <Circle
              bg="red"
              size="8px"
              outline="0.2em solid"
              outlineColor="bg"
            />
          </Float>
        </IconButton>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content>
            {notifications.map((content) => (
              <Menu.Item value={content.id} key={content.id}>
                <DataList.Root
                  size={"sm"}
                  variant={"bold"}
                  flexDirection={"row"}
                >
                  <Icon size={"md"} color={"green.500"}>
                    <LuCircleCheck />
                  </Icon>
                  <DataList.Item>
                    <DataList.ItemLabel>{content.title}</DataList.ItemLabel>
                    <DataList.ItemValue>{content.createdAt}</DataList.ItemValue>
                  </DataList.Item>
                </DataList.Root>
              </Menu.Item>
            ))}
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
};

export default Notification;
