"use client";

import { notifications } from "@/data/notifications";
import {
  Box,
  Circle,
  Float,
  Icon,
  IconButton,
  Menu,
  Portal,
  Text,
  VStack,
} from "@chakra-ui/react";
import { IoTimeSharp } from "react-icons/io5";
import { LuBell, LuShoppingBag } from "react-icons/lu";

const Notification = () => {
  return (
    <Menu.Root>
      <Menu.Trigger rounded="full" focusRing="outside">
        <IconButton rounded={"full"} variant={"outline"}>
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
                <Icon as={LuShoppingBag} />
                <Box flex="1">
                  <NotificationContent
                    title={content.title}
                    createdAt={content.createdAt}
                  />
                </Box>
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
    <VStack>
      <Text textStyle={"xs"}>{title}</Text>
      <Text textStyle={"xs"} color="fg.muted">
        <IoTimeSharp />
        {createdAt}
      </Text>
    </VStack>
  );
};
