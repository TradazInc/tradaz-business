"use client";

import { useBusinesses } from "@/hooks/business";
import { Skeleton, Text } from "@chakra-ui/react";

interface Props {
  businessId: string;
}

const BusinessName = ({ businessId }: Props) => {
  const { data: businesses } = useBusinesses();
  const business = businesses?.find((b) => b.id === businessId);

  return (
    <Text>
      {business ? `${business.name} Stores` : <Skeleton w={"160px"} h={10} />}
    </Text>
  );
};

export default BusinessName;
