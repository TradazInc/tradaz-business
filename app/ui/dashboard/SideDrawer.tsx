"use client";

import { businessItems, dashboardItems, storeItems } from "@/data/sideBarItems";
import { useSession } from "@/hooks/session";
import {
  Accordion,
  Avatar,
  Button,
  CloseButton,
  Drawer,
  Icon,
  Portal
} from "@chakra-ui/react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const SideDrawer = () => {
  const { data: session } = useSession();

  if (!session) return <ProfileAvatar />;

  return (
    <Drawer.Root>
      <Drawer.Trigger asChild>
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
            <Button>
              <Icon fontSize="lg" color="fg.subtle">
                <Icon as={item.icon} />
              </Icon>
              {item.label}
            </Button>
            <Accordion.ItemIndicator />
          </Accordion.ItemTrigger>
          {item.children &&
            item.children.map((child, index) => (
              <Accordion.ItemContent key={index}>
                <Accordion.ItemBody pl={5}>
                  <Button
                    color={child?.danger ? "fg.error" : undefined}
                    _hover={
                      child?.danger
                        ? { bg: "bg.error", color: "fg.error" }
                        : undefined
                    }
                    onClick={() =>
                      child.handler ? child.handler(router) : undefined
                    }
                  >
                    <Icon fontSize="lg" color="fg.subtle">
                      <Icon as={child.icon} />
                    </Icon>
                    {child.label}
                  </Button>
                </Accordion.ItemBody>
              </Accordion.ItemContent>
            ))}
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
};
