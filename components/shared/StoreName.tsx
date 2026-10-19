"use client";

import { useStores } from "@/hooks/store";
import { Skeleton } from "@chakra-ui/react";
import HeaderText from "./HeaderText";

interface Props {
  businessId: string;
  storeId: string;
  suffix?: string;
}

const StoreName = ({ businessId, storeId, suffix = "" }: Props) => {
  const { data: stores } = useStores(businessId);
  const store = stores?.find((s) => s.id === storeId);

  return store ? (
    <HeaderText>{`${store?.name} ${suffix}`}</HeaderText>
  ) : (
    <Skeleton h={10} w={250} />
  );
};

export default StoreName;
