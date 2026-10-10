"use client";

import { useBusinesses } from "@/hooks/business";
import { GetAllBusinessOutputData } from "@/schema/business";
import { Stat, StatRootProps } from "@chakra-ui/react";
import { StatContainer } from "./StatContainer";

interface Props {
  initialBusinesses: Promise<GetAllBusinessOutputData>;
}

export const BusinessStat = ({
  initialBusinesses,
  ...props
}: Props & StatRootProps) => {
  const { data: businesses } = useBusinesses({
    fallbackData: initialBusinesses,
  });

  return (
    <StatContainer {...props}>
      <Stat.Label>Businesses</Stat.Label>
      <Stat.ValueText>{businesses?.length ?? 0}</Stat.ValueText>
    </StatContainer>
  );
};
