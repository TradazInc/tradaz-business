"use client";

import { useStores } from "@/hooks/store";
import { Skeleton } from "@chakra-ui/react";
import HeaderText from "./HeaderText";

interface Props {
  businessId: string;
  storeId: string;
}

const StoreName = ({ businessId, storeId }: Props) => {
  const { data: stores, isLoading } = useStores(businessId);
  const store = stores?.find((s) => s.id === storeId);

  return (
    <Skeleton
      loading={isLoading}
      h={isLoading ? 10 : "auto"}
      w={isLoading ? 100 : "auto"}
    >
      <HeaderText>{store?.name}</HeaderText>
    </Skeleton>
  );
};

export default StoreName;
