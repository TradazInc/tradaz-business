"use client";

import { computePath } from "@/utilities/computePath";
import { For } from "@chakra-ui/react";
import GridCard from "../shared/GridCard";
import GridContainer from "../shared/GridContainer";
import { Business } from "@/entities/business";

interface Props {
  initialBusinesses: Business[];
}

const BusinessGrid = ({ initialBusinesses }: Props) => {
  // Implement infinite scroll

  return (
    <GridContainer pb={12}>
      <For each={initialBusinesses}>
        {(business) => (
          <GridCard
            key={business.id}
            name={business.name}
            logo={business.logo}
            address={JSON.parse(business.metadata)?.address}
            createdAt={new Date(business.createdAt).toDateString()}
            href={computePath(business.id)}
          />
        )}
      </For>
    </GridContainer>
  );
};

export default BusinessGrid;
