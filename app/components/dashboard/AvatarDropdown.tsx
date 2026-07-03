"use client";

import { profileMenu } from "@/data/profileMenu";
import { useSession } from "@/hooks/session";
import { Avatar, Box, Icon, Menu, Portal } from "@chakra-ui/react";

export const AvatarDropdown = () => {
  const { data: session } = useSession();

  if (!session) return <ProfileAvatar />;

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
                <Icon as={option.icon} />
                <Box flex="1">{option.label}</Box>
              </Menu.Item>
            ))}
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
};

const ProfileAvatar = ({ image, name }: { name?: string; image?: string }) => {
  return (
    <Avatar.Root size={"sm"}>
      <Avatar.Fallback name={name} />
      <Avatar.Image src={image} />
    </Avatar.Root>
  );
};
