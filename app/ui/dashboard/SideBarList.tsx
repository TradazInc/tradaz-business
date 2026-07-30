"use client";

import { businessItems, dashboardItems, storeItems } from "@/data/sideBarItems";
import { computeBasePath } from "@/utilities/computeBasePath";
import { Accordion, Box, Icon } from "@chakra-ui/react";
import NextLink from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export const SideBarList = () => {
  const [sideItems, setSideItems] = useState(dashboardItems);

  // Tracks url changes
  const { businessId, storeId } = useParams();

  const basePath = useMemo(
    () => computeBasePath({ businessId, storeId }),
    [businessId, storeId],
  );

  useEffect(() => {
    if (!businessId && !storeId) setSideItems(dashboardItems);
    if (businessId) setSideItems(businessItems);
    if (storeId) setSideItems(storeItems);
  }, [businessId, storeId]);

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
                  <NextLink href={`${basePath}${child.path}`}>
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
