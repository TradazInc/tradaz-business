"use client";

import { useComputePath } from "@/hooks/useComputePath";
import { StackSeparator, VStack } from "@chakra-ui/react";
import { useParams } from "next/navigation";
import { useMemo } from "react";
import { businessItems, dashboardItems, storeItems } from "./SideMenuItems";
import { SideMenuSection } from "./SideMenuSection";

export const SideMenuSectionList = () => {
  const computePath = useComputePath();
  // Tracks url changes
  const { businessId, storeId } = useParams<{
    businessId?: string;
    storeId?: string;
  }>();

  const basePath = useMemo(
    () => computePath(businessId, storeId),
    [computePath, businessId, storeId],
  );

  const sideItems = useMemo(() => {
    if (storeId) return storeItems;
    if (businessId) return businessItems;
    return dashboardItems;
  }, [businessId, storeId]);

  return (
    <VStack
      p={5}
      gapY={2}
      w={"full"}
      minH={"full"}
      borderRightWidth={"1px"}
      separator={<StackSeparator />}
    >
      {sideItems.map((item, index) => (
        <SideMenuSection basePath={basePath} menuItem={item} key={index} />
      ))}
    </VStack>
  );
};
