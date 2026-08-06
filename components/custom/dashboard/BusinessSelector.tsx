"use client";

import { toaster } from "@/components/ui/toaster";
import { useBusinesses, useSetActiveBusiness } from "@/server/hooks/business";
import { useSetActiveStore, useStores } from "@/server/hooks/store";
import { Breadcrumb, HStack, Menu, Portal, Skeleton } from "@chakra-ui/react";
import NextLink from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { LiaSlashSolid } from "react-icons/lia";
import { LuBuilding2, LuChevronDown, LuStore } from "react-icons/lu";

export const BusinessSelector = () => {
  const { data: businesses, error, isLoading } = useBusinesses();
  const [selectedBusinessId, setSelectedBusinessId] = useState<string>();
  const { data: stores } = useStores(selectedBusinessId);

  const { data: business, trigger: setBusiness } = useSetActiveBusiness();
  const { data: store, trigger: setStore } = useSetActiveStore();

  const handleBusiness = async (businessId?: string) => {
    setSelectedBusinessId(businessId);
    await setBusiness({ organizationId: businessId ?? null });
  };

  const handleStore = async (storeId?: string) => {
    await setStore({ teamId: storeId ?? null });
  };

  // Tracks url changes
  const { businessId, storeId } = useParams<{
    businessId?: string;
    storeId?: string;
  }>();

  useEffect(() => {
    // Unset active business on dashboard page
    if (!businessId && !storeId) handleBusiness(businessId);
    if (!storeId) handleStore(storeId);
  }, [businessId, storeId]);

  // Review: handle errors*
  if (error) {
    toaster.create({
      title: error.name,
      description: error.message,
      type: "error",
    });
  }

  return (
    <Breadcrumb.Root>
      <Breadcrumb.List>
        <>
          <Breadcrumb.Separator>
            <LiaSlashSolid />
          </Breadcrumb.Separator>

          <Breadcrumb.Item>
            <MenuItem
              data={businesses}
              dataType={"business"}
              handleClick={handleBusiness}
            >
              <Breadcrumb.Link as="button">
                <LuBuilding2 />
                <Skeleton height={"5"} loading={isLoading}>
                  <HStack>
                    {business?.name ?? "Brands"}
                    <LuChevronDown />
                  </HStack>
                </Skeleton>
              </Breadcrumb.Link>
            </MenuItem>
          </Breadcrumb.Item>
        </>

        {store && (
          <>
            <Breadcrumb.Separator>
              <LiaSlashSolid />
            </Breadcrumb.Separator>

            <Breadcrumb.Item>
              <MenuItem
                data={stores}
                dataType={"store"}
                handleClick={handleStore}
              >
                <Breadcrumb.Link as="button">
                  <LuStore />
                  {store.name}
                  <LuChevronDown />
                </Breadcrumb.Link>
              </MenuItem>
            </Breadcrumb.Item>
          </>
        )}
      </Breadcrumb.List>
    </Breadcrumb.Root>
  );
};

interface BreadcrumbMenuItemProps {
  data?: Array<{ name: string; id: string }> | null;
  dataType: "business" | "store";
  handleClick: (id: string) => Promise<unknown>;
  children: React.ReactNode;
}

const MenuItem = ({
  data,
  dataType,
  handleClick,
  children,
}: BreadcrumbMenuItemProps) => {
  return (
    <Menu.Root>
      <Menu.Trigger asChild>{children}</Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content>
            {data && data.length > 0 ? (
              data.map((item) => (
                <Menu.Item
                  key={item.id}
                  value={item.id}
                  onClick={() => handleClick(item.id)}
                  asChild
                >
                  <NextLink href={`/dashboard/${dataType}/${item.id}`}>
                    {item.name}
                  </NextLink>
                </Menu.Item>
              ))
            ) : (
              <Menu.Item value="">Nothing found</Menu.Item>
            )}
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
};
