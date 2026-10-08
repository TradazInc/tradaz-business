import { Store } from "@/schema/store";
import { computePath } from "@/utilities/computePath";
import { For } from "@chakra-ui/react";
import { format } from "date-fns";
import GridCard from "../shared/GridCard";
import GridContainer from "../shared/GridContainer";

interface Props {
  initialStores: Store[];
  businessId: string | undefined;
  businessName: string;
}

const StoreGrid = ({ businessId, businessName, initialStores }: Props) => {
  return (
    <GridContainer pb={12}>
      <For each={initialStores}>
        {(store) => (
          <GridCard
            key={store.id}
            name={store.name}
            address={store.address}
            badgeItems={[
              businessName,
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
