"use client";

import { notifications } from "@/data/notifications";
import {
  Box,
  Circle,
  Float,
  Heading,
  HStack,
  Icon,
  IconButton,
  Menu,
  Portal,
  Text,
  VStack,
} from "@chakra-ui/react";
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
            {notifications.map((content, index) => (
              <Menu.Item value={content.id}>
                <NotificationContent
                  key={index}
                  createdAt={content.createdAt}
                  title={content.title}
                />
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
    <HStack gap={4} cursor="pointer">
      <Box>
        <Icon as={LuShoppingBag} size={"md"} />
      </Box>
      <VStack gap={0} textJustify={"flex-start"}>
        <Heading textStyle={"xs"} justifyContent={"flex-start"}>
          {title}
        </Heading>
        <Text textStyle={"2xs"} mt={1} color="fg.muted">
          {createdAt}
        </Text>
      </VStack>
    </HStack>
  );
};
