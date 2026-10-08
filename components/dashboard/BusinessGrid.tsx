import { Business } from "@/schema/business";
import { computePath } from "@/utilities/computePath";
import { For } from "@chakra-ui/react";
import { format } from "date-fns";
import GridContainer from "../shared/GridContainer";
import BusinessCard from "./BusinessCard";

interface Props {
  initialBusinesses: Business[];
}

const BusinessGrid = ({ initialBusinesses }: Props) => {
  return (
    <GridContainer pb={12}>
      <For each={initialBusinesses}>
        {(business) => (
          <BusinessCard
            key={business.id}
            business={business}
            badgeItems={[
              business.category?.name,
              format(business.createdAt, "dd MMM yy").toUpperCase(),
            ]}
            href={computePath(business.id)}
          />
        )}
      </For>
    </GridContainer>
  );
};

export default BusinessGrid;
