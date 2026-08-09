"use client";

import { businessItems, dashboardItems, storeItems } from "@/data/sideBarItems";
import { computePath } from "@/utilities/computePath";
import { Accordion, Box, Icon } from "@chakra-ui/react";
import NextLink from "next/link";
import { useParams } from "next/navigation";
import { useMemo } from "react";

export const SideBarList = () => {
  // Tracks url changes
  const { businessId, storeId } = useParams<{
    businessId?: string;
    storeId?: string;
  }>();

  const basePath = useMemo(
    () => computePath({ businessId, storeId }),
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
