"use client";

import { businessItems, dashboardItems, storeItems } from "@/data/sideBarItems";
import { useSession } from "@/hooks/session";
import { logout } from "@/services/auth";
import {
  Accordion,
  Avatar,
  Box,
  Button,
  CloseButton,
  Drawer,
  Icon,
  Portal,
} from "@chakra-ui/react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LuLogOut } from "react-icons/lu";

export const ProfileDrawer = () => {
  const { data: session } = useSession();

  if (!session) return <ProfileAvatar />;

  return (
    <Drawer.Root>
      <Drawer.Trigger cursor={"pointer"}>
        <ProfileAvatar
          name={session.user.name}
          image={session.user.image ?? undefined}
        />
      </Drawer.Trigger>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Body py={20} px={0}>
              <SideBarItems />
            </Drawer.Body>
            <Drawer.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
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

export const SideBarItems = () => {
  const [sideItems, setSideItems] = useState(dashboardItems);
  const router = useRouter();

  // Tracks url changes
  const businessId = useParams().businessId as string;
  const storeId = useParams().storeId as string;

  useEffect(() => {
    if (!businessId && !storeId) setSideItems(dashboardItems);
    if (businessId) setSideItems(businessItems);
    if (storeId) setSideItems(storeItems);
  }, [businessId, storeId]);

  return (
    <Accordion.Root collapsible w={"full"} variant={"enclosed"}>
      {sideItems.map((item, index) => (
        <Accordion.Item key={index} value={item.label} my={2}>
          <Accordion.ItemTrigger justifyContent={"space-between"}>
            <Box>
              <Icon fontSize={"lg"} mx={3}>
                <Icon as={item.icon} />
              </Icon>
              {item.label}
            </Box>
            <Accordion.ItemIndicator />
          </Accordion.ItemTrigger>
          {item.children &&
            item.children.map((child, index) => (
              <Accordion.ItemContent key={index}>
                <Accordion.ItemBody
                  pl={5}
                  w={"full"}
                  cursor={"pointer"}
                  color={"fg.muted"}
                  _hover={{ bg: "bg.emphasized", color: "fg" }}
                >
                  <Icon fontSize={"lg"} mx={3}>
                    <Icon as={child.icon} />
                  </Icon>
                  {child.label}
                </Accordion.ItemBody>
              </Accordion.ItemContent>
            ))}
        </Accordion.Item>
      ))}
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
    </Accordion.Root>
  );
};
