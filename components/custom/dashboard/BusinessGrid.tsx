"use client";

import { computePath } from "@/utilities/computePath";
import { For } from "@chakra-ui/react";
import GridCard from "../shared/GridCard";
import GridContainer from "../shared/GridContainer";

interface Props {
  initialBusinesses: {
    id: string;
    name: string;
    slug: string;
    createdAt: Date;
    logo?: string | null;
    metadata?: any;
    categoryId: string;
  }[];
}

const BusinessGrid = ({ initialBusinesses }: Props) => {
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
            href={computePath({ businessId: business.id })}
          />
        )}
      </For>
    </GridContainer>
  );
};

export default BusinessGrid;
