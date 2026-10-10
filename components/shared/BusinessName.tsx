"use client";

import { useBusinesses } from "@/hooks/business";
import { Skeleton, Text } from "@chakra-ui/react";

interface Props {
  businessId: string;
}

const BusinessName = ({ businessId }: Props) => {
  const { data: businesses, isLoading } = useBusinesses();
  const business = businesses?.find((b) => b.id === businessId);

  return (
    <Skeleton
      loading={isLoading}
      h={isLoading ? 10 : "auto"}
      w={isLoading ? 100 : "auto"}
    >
      <Text>{business?.name} Stores</Text>
    </Skeleton>
  );
};

export default BusinessName;
