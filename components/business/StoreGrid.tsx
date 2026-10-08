import { Store } from "@/schema/store";
import { computePath } from "@/utilities/computePath";
import { For } from "@chakra-ui/react";
import { format } from "date-fns";
import StoreCard from "./StoreCard";
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
          <StoreCard
            key={store.id}
            store={store}
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
