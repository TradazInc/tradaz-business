"use client";

import { toaster } from "@/components/ui/toaster";
import { useSignOut } from "@/server/hooks/auth";
import { useSession } from "@/server/hooks/session";
import { errorToastOptions } from "@/utilities/errorToastOptions";
import { Menu, Portal } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { LuLogOut } from "react-icons/lu";
import { ProfileAvatar } from "./ProfileAvatar";

export const ProfileMenu = () => {
  const { data: session } = useSession();
  const { trigger, isMutating } = useSignOut();
  const { push, refresh } = useRouter();

  const handleLogout = async () => {
    const promise = toaster.promise(trigger(), {
      loading: { title: "Logging out…", description: "Please wait" },
      success: () => ({
        title: "Logged Out",
        description: "You have logged out of your account",
      }),
      error: errorToastOptions,
    });
    if (!promise) return;
    try {
      const data = await promise.unwrap();
      if (data.success) {
        refresh();
        push("/signin");
      } else if (promise.id) {
        toaster.update(promise.id, {
          title: "Unable to logout",
          description: "Please try again",
          type: "error",
        });
      }
    } catch {
      /* Toast handled by the `error` option */
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
              disabled={isMutating}
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
