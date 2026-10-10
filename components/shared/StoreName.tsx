"use client";

import { useStores } from "@/hooks/store";
import { Skeleton, Text } from "@chakra-ui/react";

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
      <Text>{store?.name}</Text>
    </Skeleton>
  );
};

export default StoreName;
