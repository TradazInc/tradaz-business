"use client";

import { businessItems, dashboardItems, storeItems } from "@/data/sideBarItems";
import { Accordion, Box, Icon } from "@chakra-ui/react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export const SideBarList = () => {
  const [sideItems, setSideItems] = useState(dashboardItems);

  // Tracks url changes
  const pathname = usePathname();
  const isBusinessPath = pathname.includes("business");
  const isStorePath = pathname.includes("store");

  useEffect(() => {
    if (!isBusinessPath && !isStorePath) setSideItems(dashboardItems);
    if (isBusinessPath) setSideItems(businessItems);
    if (isStorePath) setSideItems(storeItems);
  }, [pathname]);

  return (
    <Accordion.Root
      collapsible
      w={"full"}
      size={"sm"}
      rounded={"none"}
      variant={"enclosed"}
    >
      {sideItems.map((item, index) => (
        <Accordion.Item key={index} value={item.label} my={2} p={1}>
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
                  cursor={"pointer"}
                  color={"fg.muted"}
                  _hover={{ color: "fg" }}
                >
                  <NextLink href={child.href}>
                    <Icon fontSize={"lg"} mx={3}>
                      <Icon as={child.icon} />
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
