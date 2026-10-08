"use client";

import { useBusinesses } from "@/hooks/business";
import { GetAllBusinessOutputData } from "@/schema/business";
import { computePath } from "@/utilities/computePath";
import { For } from "@chakra-ui/react";
import { format } from "date-fns";
import EmptyPage from "../shared/EmptyPage";
import GridContainer from "../shared/GridContainer";
import BusinessCard from "./BusinessCard";

interface Props {
  initialBusinesses: Promise<GetAllBusinessOutputData>;
}

const BusinessGrid = ({ initialBusinesses }: Props) => {
  const { data: businesses } = useBusinesses({
    fallbackData: initialBusinesses,
  });

  if (businesses && businesses.length === 0) {
    return (
      <EmptyPage
        title={"No businesses found"}
        description={"Create a new business"}
      />
    );
  }

  return (
    <GridContainer pb={12}>
      <For each={businesses}>
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
