"use client";

import { useBusinesses } from "@/hooks/business";
import { Skeleton } from "@chakra-ui/react";
import HeaderText from "./HeaderText";

interface Props {
  businessId: string;
}

const BusinessName = ({ businessId }: Props) => {
  const { data: businesses } = useBusinesses();
  const business = businesses?.find((b) => b.id === businessId);

  return business ? (
    <HeaderText>{`${business.name} Branches`}</HeaderText>
  ) : (
    <Skeleton h={10} w={300} />
  );
};

export default BusinessName;
