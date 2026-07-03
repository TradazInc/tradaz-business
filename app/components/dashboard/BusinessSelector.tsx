"use client";

import { toaster } from "@/components/ui/toaster";
import { useBusiness, useBusinesses } from "@/hooks/business";
import { businessService } from "@/services/business/businessService";
import { storeService } from "@/services/store/storeService";
import { Breadcrumb, Menu, Portal, Skeleton, Spinner } from "@chakra-ui/react";
import NextLink from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { LiaSlashSolid } from "react-icons/lia";
import { LuBuilding2, LuChevronDown, LuStore } from "react-icons/lu";

export const BusinessSelector = () => {
  const { data: businesses, error, isPending } = useBusinesses();
  const { data: business, error: Error, mutate } = useBusiness();
  const [activeStore, setActiveStore] = useState("Stores");

  const handleBusiness = async (businessId: string) => {
    const business = await businessService.setActiveBussienss(businessId);
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
    const { data, error } = await storeService.setActiveStore(storeId);
    if (error) {
      return toaster.create({
        title: error.code,
        description: error.message,
        type: "error",
      });
    }
    setActiveStore(data.name);
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

          <BreadcrumbMenuItem data={businesses} handleClick={handleBusiness}>
            <Breadcrumb.Link as="button">
              <LuBuilding2 />
              {business?.data?.name ?? "Business"}
              {isPending ? (
                <Spinner size="sm" borderWidth="4px" />
              ) : (
                <LuChevronDown />
              )}
            </Breadcrumb.Link>
          </BreadcrumbMenuItem>
        </>

        {business?.data && (
          <>
            <Breadcrumb.Separator>
              <LiaSlashSolid />
            </Breadcrumb.Separator>

            <BreadcrumbMenuItem
              data={business.data.teams}
              handleClick={handleStore}
            >
              <Breadcrumb.Link as="button">
                <LuStore />
                {activeStore}
                <LuChevronDown />
              </Breadcrumb.Link>
            </BreadcrumbMenuItem>
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

const BreadcrumbMenuItem = ({
  data,
  handleClick,
  children,
}: BreadcrumbMenuItemProps) => {
  return (
    <Breadcrumb.Item>
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
    </Breadcrumb.Item>
  );
};
