"use client";

import { useSession } from "@/hooks/session";
import { logout } from "@/services/auth";
import { Avatar, Button, Menu, Portal } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { LuLogOut } from "react-icons/lu";

export const AvatarDropdown = () => {
  const { data: session } = useSession();
  const router = useRouter();

  if (!session) return <ProfileAvatar />;

  return (
    <Menu.Root>
      <Menu.Trigger cursor={"pointer"}>
        <ProfileAvatar
          name={session.user.name}
          image={session.user.image ?? undefined}
        />
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content>
            <Menu.Item value="logout">
              <Button
                w={"full"}
                color={"fg.error"}
                variant={"outline"}
                _hover={{ bg: "bg.error", color: "fg.error" }}
                onClick={() => logout(router)}
              >
                <LuLogOut />
                Log Out
              </Button>
            </Menu.Item>
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
