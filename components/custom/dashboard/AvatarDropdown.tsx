"use client";

import { signOut } from "@/apis/services/auth";
import { useSession } from "@/apis/hooks/session";
import { toaster } from "@/components/ui/toaster";
import { Avatar, Menu, Portal } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { LuLogOut } from "react-icons/lu";

export const AvatarDropdown = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    const { data, error } = await signOut();

    if (error) {
      toaster.create({
        title: error.code,
        description: error.message,
        type: "error",
      });
    } else if (data.success) {
      router.push("/signin");
    } else {
      toaster.create({
        title: "Server Error",
        description: "Unable to logout",
        type: "error",
      });
    }
  };

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
            <Menu.Item
              value={"logout"}
              w={"full"}
              color={"fg.error"}
              _hover={{ bg: "bg.error", color: "fg.error" }}
              onClick={() => handleLogout()}
            >
              <LuLogOut />
              Log Out
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
