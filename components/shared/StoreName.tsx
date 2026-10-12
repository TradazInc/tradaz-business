"use client";

import { useStores } from "@/hooks/store";
import { Skeleton } from "@chakra-ui/react";
import HeaderText from "./HeaderText";

interface Props {
  businessId: string;
  storeId: string;
}

const StoreName = ({ businessId, storeId }: Props) => {
  const { data: stores } = useStores(businessId);
  const store = stores?.find((s) => s.id === storeId);

  return store ? (
    <HeaderText>{store?.name}</HeaderText>
  ) : (
    <Skeleton h={10} w={250} />
  );
};

export default StoreName;
