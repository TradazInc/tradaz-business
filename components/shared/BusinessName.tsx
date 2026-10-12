"use client";

import { useBusinesses } from "@/hooks/business";
import { Skeleton } from "@chakra-ui/react";
import HeaderText from "./HeaderText";

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
      w={isLoading ? 300 : "auto"}
    >
      <HeaderText>{`${business?.name} Branches`}</HeaderText>
    </Skeleton>
  );
};

export default BusinessName;
