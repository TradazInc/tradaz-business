"use client";

import { computePath } from "@/utilities/computePath";
import { Accordion, Icon, Spacer } from "@chakra-ui/react";
import NextLink from "next/link";
import { useParams } from "next/navigation";
import { useMemo } from "react";
import { businessItems, dashboardItems, storeItems } from "./SideMenuItems";

export const SideMenuList = () => {
  // Tracks url changes
  const { businessId, storeId } = useParams<{
    businessId?: string;
    storeId?: string;
  }>();

  const basePath = useMemo(
    () => computePath(businessId, storeId),
    [businessId, storeId],
  );

  const sideItems = useMemo(() => {
    if (storeId) return storeItems;
    if (businessId) return businessItems;
    return dashboardItems;
  }, [businessId, storeId]);

  return (
    <Accordion.Root
      collapsible
      w={"full"}
      rounded={"none"}
      variant={"outline"}
    >
      {sideItems.map((item, index) => (
        <Accordion.Item key={index} value={item.label}>
          <Accordion.ItemTrigger p={3} _open={{ bg: "gray.subtle" }}>
            <Icon fontSize={"lg"} color={"fg.subtle"}>
              {item.icon}
            </Icon>
            {item.label}
            <Spacer />
            <Accordion.ItemIndicator />
          </Accordion.ItemTrigger>
          {item.children &&
            item.children.map((child, index) => (
              <Accordion.ItemContent key={index}>
                <Accordion.ItemBody
                  p={3}
                  cursor={"pointer"}
                  color={"fg.muted"}
                  _hover={{ color: "fg" }}
                  asChild
                >
                  <NextLink href={`${basePath}${child.path}`}>
                    <Icon fontSize={"lg"} color={"fg.subtle"} mx={3}>
                      {child.icon}
                    </Icon>
                    {child.label}
                  </NextLink>
                </Accordion.ItemBody>
              </Accordion.ItemContent>
            ))}
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
};
