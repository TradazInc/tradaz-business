"use client";

import { notifications } from "@/data/notifications";
import {
  Circle,
  DataList,
  Flex,
  Float,
  Heading,
  Icon,
  IconButton,
  Menu,
  Portal,
  VStack,
} from "@chakra-ui/react";
import { LuBell, LuCircleDashed } from "react-icons/lu";

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
                <DataList.Root variant={"bold"} size={"sm"}>
                  <Icon size={"md"} color={"green.500"}>
                    <LuCircleDashed />
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

const NotificationContent = ({
  createdAt,
  title,
}: {
  title: string;
  createdAt: string;
}) => {
  return (
    <VStack gap={0}>
      <Heading textStyle={"xs"} w={"full"}>
        {title}
      </Heading>
      <Flex
        w={"full"}
        textStyle={"xs"}
        color={"fg.muted"}
        justify={"flex-start"}
      >
        {createdAt}
      </Flex>
    </VStack>
  );
};
