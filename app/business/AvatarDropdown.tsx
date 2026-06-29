"use client";

import { profileMenu } from "@/data/profileMenu";
import { Avatar, Flex, Icon, Menu, Portal, Text } from "@chakra-ui/react";
import React from "react";

export const ProfileDropdown = () => {
  return (
    <Menu.Root>
      <Menu.Trigger rounded="full" focusRing="outside">
        <ProfileAvatar />
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content>
            {profileMenu.map((option, index) => (
              <Menu.Item
                key={index}
                value={option.value}
                color={option?.danger ? "fg.error" : undefined}
                _hover={
                  option?.danger
                    ? { bg: "bg.error", color: "fg.error" }
                    : undefined
                }
              >
                <ProfileMenuButton>
                  <Icon as={option.icon} boxSize="16px" strokeWidth={"2.5"} />
                  <Text fontSize="13px" fontWeight="bold">
                    {option.label}
                  </Text>
                </ProfileMenuButton>
              </Menu.Item>
            ))}
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
};

const ProfileAvatar = () => {
  return (
    <Avatar.Root size={"sm"}>
      <Avatar.Fallback name="Segun Adebayo" />
      <Avatar.Image src="https://bit.ly/sage-adebayo" />
    </Avatar.Root>
  );
};

const ProfileMenuButton = ({ children }: { children: React.ReactNode }) => {
  return (
    <Flex p={1} align="center" gap={3} w={"full"}>
      {children}
    </Flex>
  );
};
