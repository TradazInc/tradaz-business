"use client";

import { toaster } from "@/components/ui/toaster";
import { useBusinesses, useSetActiveBusiness } from "@/server/hooks/business";
import { useSession } from "@/server/hooks/session";
import { useSetActiveStore, useStores } from "@/server/hooks/store";
import { errorOptions } from "@/utilities/errorToastOptions";
import { updateSession } from "@/utilities/updateSession";
import { Breadcrumb, HStack, Skeleton } from "@chakra-ui/react";
import { useParams } from "next/navigation";
import { useEffect, useMemo } from "react";
import { LiaSlashSolid } from "react-icons/lia";
import { LuBuilding2, LuChevronDown, LuStore } from "react-icons/lu";
import { BusinessSelectorItem } from "./BusinessSelectorItem";

export const BusinessSelector = () => {
  const { data: session } = useSession();
  const activeBusinessId = session?.session.activeOrganizationId ?? undefined;
  const activeStoreId = session?.session.activeTeamId ?? undefined;

  const { data: businesses, isLoading } = useBusinesses();
  const { data: stores } = useStores(activeBusinessId);
  const { trigger: setBusiness } = useSetActiveBusiness();
  const { trigger: setStore } = useSetActiveStore();

  const activeBusiness = useMemo(
    () => businesses?.find((b) => b.id === activeBusinessId),
    [businesses, activeBusinessId],
  );
  const activeStore = useMemo(
    () => stores?.find((s) => s.id === activeStoreId),
    [stores, activeStoreId],
  );

  const handleBusiness = async (businessId?: string) => {
    try {
      await setBusiness(businessId, {
        optimisticData: updateSession({
          activeOrganizationId: businessId ?? null,
          activeTeamId: null, // switching brand clears the store
        }),
        rollbackOnError: true,
      });
    } catch (e) {
      toaster.error(errorOptions(e));
    }
  };

  const handleStore = async (storeId?: string) => {
    try {
      await setStore(storeId, {
        optimisticData: updateSession({ activeTeamId: storeId ?? null }),
        rollbackOnError: true,
      });
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
    if (!session) return;

    // Use URL to update session
    if (activeBusinessId !== businessId) {
      handleBusiness(businessId); // optimistic update re-runs this effect for the store
      return;
    }
    if (activeStoreId !== storeId) handleStore(storeId);
  }, [session, activeBusinessId, activeStoreId, businessId, storeId]);

  return (
    <Breadcrumb.Root>
      <Breadcrumb.List>
        <>
          <Breadcrumb.Separator>
            <LiaSlashSolid />
          </Breadcrumb.Separator>

          <Breadcrumb.Item>
            <BusinessSelectorItem
              data={businesses}
              dataType={"business"}
              handleClick={handleBusiness}
            >
              <Breadcrumb.Link as="button">
                <LuBuilding2 />
                <Skeleton height={"5"} loading={isLoading}>
                  <HStack>
                    {activeBusiness ? activeBusiness.name : "Brands"}
                    <LuChevronDown />
                  </HStack>
                </Skeleton>
              </Breadcrumb.Link>
            </BusinessSelectorItem>
          </Breadcrumb.Item>
        </>

        {activeStore && (
          <>
            <Breadcrumb.Separator>
              <LiaSlashSolid />
            </Breadcrumb.Separator>

            <Breadcrumb.Item>
              <BusinessSelectorItem
                data={stores}
                dataType={"store"}
                handleClick={handleStore}
                activeBusiness={activeBusinessId}
              >
                <Breadcrumb.Link as="button">
                  <LuStore />
                  {activeStore.name}
                  <LuChevronDown />
                </Breadcrumb.Link>
              </BusinessSelectorItem>
            </Breadcrumb.Item>
          </>
        )}
      </Breadcrumb.List>
    </Breadcrumb.Root>
  );
};
