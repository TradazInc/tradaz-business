import { Business } from "@/schema/business";
import { computePath } from "@/utilities/computePath";
import { For } from "@chakra-ui/react";
import { format } from "date-fns";
import GridCard from "../shared/GridCard";
import GridContainer from "../shared/GridContainer";

interface Props {
  initialBusinesses: Business[];
}

const BusinessGrid = ({ initialBusinesses }: Props) => {
  return (
    <GridContainer pb={12}>
      <For each={initialBusinesses}>
        {(business) => (
          <GridCard
            key={business.id}
            logo={business.logo}
            name={business.name}
            slug={business.slug}
            badgeItems={[
              business.category?.name,
              format(business.createdAt, "dd MMM yy").toUpperCase(),
            ]}
            address={JSON.parse(business.metadata)?.address}
            href={computePath(business.id)}
          />
        )}
      </For>
    </GridContainer>
  );
};

export default BusinessGrid;
