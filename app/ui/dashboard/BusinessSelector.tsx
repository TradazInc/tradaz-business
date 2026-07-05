"use client";

import { toaster } from "@/components/ui/toaster";
import { useBusiness, useBusinesses } from "@/hooks/business";
import { setActiveBussienss } from "@/services/business/business";
import { setActiveStore } from "@/services/store/store";
import { Breadcrumb, Menu, Portal, Spinner } from "@chakra-ui/react";
import NextLink from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { LiaSlashSolid } from "react-icons/lia";
import { LuBuilding2, LuChevronDown, LuStore } from "react-icons/lu";

export const BusinessSelector = () => {
  const { data: businesses, error, isPending } = useBusinesses();
  const { data: business, error: Error, mutate } = useBusiness();
  const [store, setStore] = useState("Stores");

  const handleBusiness = async (businessId: string) => {
    const business = await setActiveBussienss(businessId);
    if (business.error) {
      return toaster.create({
        title: business.error.code,
        description: business.error.message,
        type: "error",
      });
    }
    mutate();
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

  const businessId = useParams().businessId as string;
  useEffect(() => {
    const setActiveBusiness = async () => {
      if (businessId) await handleBusiness(businessId);
    };

    setActiveBusiness();
  }, [businessId]);

  if (error || Error) return null;

  return (
    <Breadcrumb.Root>
      <Breadcrumb.List>
        <>
          <Breadcrumb.Separator>
            <LiaSlashSolid />
          </Breadcrumb.Separator>

          <Breadcrumb.Item>
            <MenuItem data={businesses} handleClick={handleBusiness}>
              <Breadcrumb.Link as="button">
                <LuBuilding2 />
                {business?.data?.name ?? "Business"}
                {isPending ? (
                  <Spinner size="sm" borderWidth="4px" />
                ) : (
                  <LuChevronDown />
                )}
              </Breadcrumb.Link>
            </MenuItem>
          </Breadcrumb.Item>
        </>

        {business?.data && (
          <>
            <Breadcrumb.Separator>
              <LiaSlashSolid />
            </Breadcrumb.Separator>

            <Breadcrumb.Item>
              <MenuItem data={business.data.teams} handleClick={handleStore}>
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
  handleClick: (id: string) => Promise<unknown>;
  children: React.ReactNode;
}

const MenuItem = ({ data, handleClick, children }: BreadcrumbMenuItemProps) => {
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
                  <NextLink href={`/dashboard/business/${item.id}`}>
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
