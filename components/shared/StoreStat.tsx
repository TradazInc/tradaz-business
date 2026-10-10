"use client";

import { useBusinesses } from "@/hooks/business";
import { useStores } from "@/hooks/store";
import { GetAllStoresOutputData } from "@/schema/store";
import { Stat } from "@chakra-ui/react";
import { notFound } from "next/navigation";

interface Props {
  initialStores: Promise<GetAllStoresOutputData>;
  businessId: string;
}

export const StoreStat = ({ initialStores, businessId }: Props) => {
  const { data: businesses } = useBusinesses();
  const business = businesses?.find((b) => b.id === businessId);

  if (businesses && !business) notFound();

  const { data: stores } = useStores(businessId, {
    fallbackData: initialStores,
  });

  return (
    <Stat.Root p={4} w={"full"} h={"full"} rounded={"md"} borderWidth={"1px"}>
      <Stat.Label>Stores</Stat.Label>
      <Stat.ValueText>{stores?.length ?? 0}</Stat.ValueText>
    </Stat.Root>
  );
};
