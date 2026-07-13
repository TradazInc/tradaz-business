"use client";

import { businessItems, dashboardItems, storeItems } from "@/data/sideBarItems";
import { Accordion, Box, Icon } from "@chakra-ui/react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export const SideBarItems = () => {
  const [sideItems, setSideItems] = useState(dashboardItems);

  // Tracks url changes
  const businessId = useParams().businessId as string;
  const storeId = useParams().storeId as string;

  useEffect(() => {
    if (!businessId && !storeId) setSideItems(dashboardItems);
    if (businessId) setSideItems(businessItems);
    if (storeId) setSideItems(storeItems);
  }, [businessId, storeId]);

  return (
    <Accordion.Root collapsible w={"full"} size={"sm"}>
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
                  cursor={"pointer"}
                  color={"fg.muted"}
                  _hover={{ color: "fg" }}
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
    </Accordion.Root>
  );
};
