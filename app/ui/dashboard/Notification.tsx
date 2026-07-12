"use client";

import { notifications } from "@/data/notifications";
import {
  Box,
  Circle,
  Flex,
  Float,
  Heading,
  Icon,
  IconButton,
  Menu,
  Portal,
  VStack,
} from "@chakra-ui/react";
import { LuBell, LuShoppingBag } from "react-icons/lu";

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
                <Icon as={LuShoppingBag} size={"md"} />
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
