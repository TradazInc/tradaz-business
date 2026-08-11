"use client";

import { computePath } from "@/utilities/computePath";
import { For } from "@chakra-ui/react";
import GridCard from "../shared/GridCard";
import GridContainer from "../shared/GridContainer";
import { Store } from "@/server/entities/store";

interface Props {
  businessId: string;
  initialStores: Store[];
}

const StoreGrid = ({ businessId, initialStores }: Props) => {
  // Implement infinite scroll

  return (
    <GridContainer pb={12}>
      <For each={initialStores}>
        {(store) => (
          <GridCard
            key={store.id}
            name={store.name}
            address={store.address}
            createdAt={new Date(store.createdAt).toDateString()}
            href={computePath({ businessId, storeId: store.id })}
          />
        )}
      </For>
    </GridContainer>
  );
};

export default StoreGrid;
