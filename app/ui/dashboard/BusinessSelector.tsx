"use client";

import { toaster } from "@/components/ui/toaster";
import { Store } from "@/entities/Store";
import { useBusinesses } from "@/hooks/business";
import { setActiveBusiness } from "@/services/business";
import { getStores, setActiveStore } from "@/services/store";
import { Breadcrumb, HStack, Menu, Portal, Skeleton } from "@chakra-ui/react";
import NextLink from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { LiaSlashSolid } from "react-icons/lia";
import { LuBuilding2, LuChevronDown, LuStore } from "react-icons/lu";

export const BusinessSelector = () => {
  const { data: businesses, error, isLoading } = useBusinesses();
  const [business, setBusiness] = useState("Business");
  const [stores, setStores] = useState<Store[]>();
  const [store, setStore] = useState<string>();

  const handleBusiness = async (businessId: string) => {
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
    setBusiness(business.data.name);
    setStores(stores.data);
    setStore("Stores");
  };

  const handleStore = async (storeId: string) => {
    setStore(stores?.find((s) => s.id === storeId)?.name);
    const { data, error } = await setActiveStore(storeId);
    if (error) {
      setStore(undefined);
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
              dataType={"business"}
              handleClick={handleBusiness}
            >
              <Breadcrumb.Link as="button">
                <LuBuilding2 />
                <Skeleton height={"5"} loading={isLoading}>
                  <HStack>
                    {business}
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
