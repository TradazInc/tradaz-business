"use client";

import { useBusinesses } from "@/hooks/business";
import { useStores } from "@/hooks/store";
import { GetAllStoresOutputData } from "@/schema/store";
import { Stat, StatRootProps } from "@chakra-ui/react";
import { notFound } from "next/navigation";
import { StatContainer } from "./StatContainer";

interface Props {
  initialStores: Promise<GetAllStoresOutputData>;
  businessId: string;
}

export const StoreStat = ({
  initialStores,
  businessId,
  ...props
}: Props & StatRootProps) => {
  const { data: businesses } = useBusinesses();
  const business = businesses?.find((b) => b.id === businessId);

  if (businesses && !business) notFound();

  const { data: stores } = useStores(businessId, {
    fallbackData: initialStores,
  });

  return (
    <StatContainer {...props}>
      <Stat.Label>Stores</Stat.Label>
      <Stat.ValueText>{stores?.length ?? 0}</Stat.ValueText>
    </StatContainer>
  );
};
