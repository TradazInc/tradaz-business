"use client";

import { profileMenu } from "@/data/profileMenu";
import { useSession } from "@/hooks/session";
import {
  Avatar,
  HStack,
  Icon,
  Menu,
  Portal,
  Text
} from "@chakra-ui/react";
import React from "react";
import { BsPersonCircle } from "react-icons/bs";

export const AvatarDropdown = () => {
  const { data: session } = useSession();

  if (!session) return <BsPersonCircle />;

  return (
    <Menu.Root>
      <Menu.Trigger rounded="full" focusRing="outside">
        <ProfileAvatar
          name={session.user.name}
          image={session.user.image ?? undefined}
        />
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
                  <Icon as={option.icon} />
                  <Text>{option.label}</Text>
                </ProfileMenuButton>
              </Menu.Item>
            ))}
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
};

const ProfileAvatar = ({ image, name }: { name: string; image?: string }) => {
  return (
    <Avatar.Root size={"sm"}>
      <Avatar.Fallback name={name} />
      <Avatar.Image src={image} />
    </Avatar.Root>
  );
};

const ProfileMenuButton = ({ children }: { children: React.ReactNode }) => {
  return (
    <HStack p={1} align={"center"} w={"full"}>
      {children}
    </HStack>
  );
};
