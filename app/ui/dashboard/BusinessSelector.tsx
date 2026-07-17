"use client";

import { toaster } from "@/components/ui/toaster";
import { Store } from "@/entities/Store";
import { useBusinesses } from "@/hooks/business";
import { setActiveBusiness } from "@/services/business";
import { setActiveStore } from "@/services/store";
import { Breadcrumb, HStack, Menu, Portal, Skeleton } from "@chakra-ui/react";
import NextLink from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { LiaSlashSolid } from "react-icons/lia";
import { LuBuilding2, LuChevronDown, LuStore } from "react-icons/lu";

export const BusinessSelector = () => {
  const { data: businesses, error, isLoading } = useBusinesses();
  const [business, setBusiness] = useState<string>();
  const [stores, setStores] = useState<Store[]>();
  const [store, setStore] = useState<string>();

  const handleBusiness = async (businessId: string) => {
    const { data, error } = await setActiveBusiness(businessId);
    if (error) {
      return toaster.create({
        title: error.code,
        description: error.message,
        type: "error",
      });
    }
    setBusiness(data.name);
    setStores(data.teams);
    setStore("Stores");
  };

  const handleStore = async (storeId: string) => {
    const { data, error } = await setActiveStore(storeId);
    if (error) {
      return toaster.create({
        title: error.code,
        description: error.message,
        type: "error",
      });
    }
    setStore(data.name);
  };

  // Tracks url changes
  const businessId = useParams().businessId as string;
  const storeId = useParams().storeId as string;

  useEffect(() => {
    const setActiveBusiness = async () => {
      if (businessId) await handleBusiness(businessId);
      if (storeId) await handleStore(storeId);
      if (!storeId) setStore(undefined);
    };

    setActiveBusiness();
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
              dataType={DataType.business}
              handleClick={handleBusiness}
            >
              <Breadcrumb.Link as="button">
                <LuBuilding2 />
                <Skeleton height={"5"} loading={isLoading}>
                  <HStack>
                    {business ?? "Business"}
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
                dataType={DataType.store}
                handleClick={handleStore}
              >
                <Breadcrumb.Link as="button">
                  <LuStore />
                  {store}
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

enum DataType {
  business = "business",
  store = "store",
}

interface BreadcrumbMenuItemProps {
  data?: Array<{ name: string; id: string }> | null;
  dataType: DataType;
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
