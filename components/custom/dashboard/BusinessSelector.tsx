"use client";

import { toaster } from "@/components/ui/toaster";
import { Store } from "@/apis/services/Store";
import { useBusinesses } from "@/apis/hooks/business";
import { setActiveBusiness } from "@/apis/client/business";
import { getStores, setActiveStore } from "@/apis/client/store";
import { Breadcrumb, HStack, Menu, Portal, Skeleton } from "@chakra-ui/react";
import NextLink from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { LiaSlashSolid } from "react-icons/lia";
import { LuBuilding2, LuChevronDown, LuStore } from "react-icons/lu";

export const BusinessSelector = () => {
  // Data state
  const { data: businesses, error, isLoading } = useBusinesses();
  const [stores, setStores] = useState<Store[]>();

  // UI state
  const [businessName, setBusinessName] = useState("Brands");
  const [storeName, setStoreName] = useState<string>();

  const handleBusiness = async (businessId: string) => {
    if (storeName) {
      setStoreName(undefined);
      const activeStore = await setActiveStore(null);
      if (activeStore.error) {
        return toaster.create({
          title: activeStore.error.code,
          description: activeStore.error.message,
          type: "error",
        });
      }
    }

    const [business, stores] = await Promise.all([
      setActiveBusiness(businessId),
      getStores(businessId),
    ]);

    if (business.error) {
      return toaster.create({
        title: business.error.code,
        description: business.error.message,
        type: "error",
      });
    }

    if (stores.error) {
      return toaster.create({
        title: stores.error.code,
        description: stores.error.message,
        type: "error",
      });
    }

    setBusinessName(business.data.name);
    setStores(stores.data);
  };

  const handleStore = async (storeId: string) => {
    setStoreName(stores?.find((s) => s.id === storeId)?.name);
    const { data, error } = await setActiveStore(storeId);
    if (error) {
      setStoreName(undefined);
      return toaster.create({
        title: error.code,
        description: error.message,
        type: "error",
      });
    }
    setStoreName(data.name);
  };

  // Tracks url changes
  const { businessId, storeId } = useParams<{
    businessId: string;
    storeId: string;
  }>();

  useEffect(() => {
    const updateActiveStatus = async () => {
      if (businessId) await handleBusiness(businessId);
      if (storeId) await handleStore(storeId);
    };
    updateActiveStatus();

    // Unset active business on dashboard page
    if (!businessId && !storeId) {
      setActiveBusiness(null);
      setBusinessName("Brands");
      setActiveStore(null);
      setStoreName(undefined);
    }
  }, [businessId, storeId]);

  if (error) return null;

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
                    {businessName}
                    <LuChevronDown />
                  </HStack>
                </Skeleton>
              </Breadcrumb.Link>
            </MenuItem>
          </Breadcrumb.Item>
        </>

        {storeName && (
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
                  {storeName}
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
