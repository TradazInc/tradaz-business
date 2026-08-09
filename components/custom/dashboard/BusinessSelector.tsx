"use client";

import { toaster } from "@/components/ui/toaster";
import { useBusinesses, useSetActiveBusiness } from "@/server/hooks/business";
import { useSession } from "@/server/hooks/session";
import { useSetActiveStore, useStores } from "@/server/hooks/store";
import { errorOptions } from "@/utilities/errorToastOptions";
import { Breadcrumb, HStack, Menu, Portal, Skeleton } from "@chakra-ui/react";
import NextLink from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { LiaSlashSolid } from "react-icons/lia";
import { LuBuilding2, LuChevronDown, LuStore } from "react-icons/lu";

export const BusinessSelector = () => {
  const { data: session } = useSession();
  const { data: businesses, isLoading } = useBusinesses();
  const [selectedBusinessId, setSelectedBusinessId] = useState<string>();
  const { data: stores } = useStores(selectedBusinessId);
  const { data: business, trigger: setBusiness } = useSetActiveBusiness();
  const { data: store, trigger: setStore } = useSetActiveStore();

  const handleBusiness = async (businessId?: string) => {
    try {
      setSelectedBusinessId(businessId);
      await setBusiness({ organizationId: businessId ?? null });
    } catch (e) {
      toaster.error(errorOptions(e));
    }
  };

  const handleStore = async (storeId?: string) => {
    try {
      await setStore({ teamId: storeId ?? null });
    } catch (e) {
      toaster.error(errorOptions(e));
    }
  };

  // Tracks url changes
  const { businessId, storeId } = useParams<{
    businessId?: string;
    storeId?: string;
  }>();

  useEffect(() => {
    // Unset active business on dashboard page
    if (
      session?.session.activeOrganizationId === (businessId ?? null) &&
      session?.session.activeTeamId === (storeId ?? null)
    )
      return;
    (async () => {
      await setBusiness({ organizationId: businessId ?? null });
      await setStore({ teamId: storeId ?? null });
    })();
  }, [businessId, storeId]);

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
                    {session?.session.activeOrganizationId
                      ? business?.name
                      : "Brands"}
                    <LuChevronDown />
                  </HStack>
                </Skeleton>
              </Breadcrumb.Link>
            </MenuItem>
          </Breadcrumb.Item>
        </>

        {session?.session.activeTeamId && (
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
                  {store?.name}
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
