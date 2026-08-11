"use client";

import { computePath } from "@/utilities/computePath";
import { For } from "@chakra-ui/react";
import GridCard from "../shared/GridCard";
import GridContainer from "../shared/GridContainer";

interface Props {
  businessId: string;
  initialStores: {
    id: string;
    name: string;
    organizationId: string;
    createdAt: Date;
    updatedAt?: Date;
    address: string;
  }[];
}

const StoreGrid = ({ businessId, initialStores }: Props) => {
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
