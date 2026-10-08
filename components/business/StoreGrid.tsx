"use client";

import { useBusinesses } from "@/hooks/business";
import { useStores } from "@/hooks/store";
import { GetAllStoresOutputData } from "@/schema/store";
import { computePath } from "@/utilities/computePath";
import { For } from "@chakra-ui/react";
import { format } from "date-fns";
import { notFound } from "next/navigation";
import EmptyPage from "../shared/EmptyPage";
import GridContainer from "../shared/GridContainer";
import StoreCard from "./StoreCard";

interface Props {
  initialStores: Promise<GetAllStoresOutputData>;
  businessId: string;
}

const StoreGrid = ({ businessId, initialStores }: Props) => {
  const { data: businesses } = useBusinesses();
  const business = businesses?.find((b) => b.id === businessId);

  if (businesses && !business) notFound();

  const { data: stores } = useStores(businessId, {
    fallbackData: initialStores,
  });

  if (stores && stores.length === 0) {
    return (
      <EmptyPage
        title={"No stores found"}
        description={"Create a new store for your brand"}
      />
    );
  }

  return (
    <GridContainer pb={12}>
      <For each={stores}>
        {(store) => (
          <StoreCard
            key={store.id}
            store={store}
            badgeItems={[
              business?.name,
              format(store.createdAt, "dd MMM yy").toUpperCase(),
            ]}
            href={computePath(businessId, store.id)}
          />
        )}
      </For>
    </GridContainer>
  );
};

export default StoreGrid;
