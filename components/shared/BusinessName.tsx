"use client";

import { useBusinesses } from "@/hooks/business";
import { Skeleton } from "@chakra-ui/react";
import HeaderText from "./HeaderText";

interface Props {
  businessId: string;
  suffix?: string;
}

const BusinessName = ({ businessId, suffix }: Props) => {
  const { data: businesses } = useBusinesses();
  const business = businesses?.find((b) => b.id === businessId);

  return business ? (
    <HeaderText>{`${business.name} ${suffix}`}</HeaderText>
  ) : (
    <Skeleton h={10} w={250} />
  );
};

export default BusinessName;
