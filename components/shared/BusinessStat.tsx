"use client";

import { useBusinesses } from "@/hooks/business";
import { GetAllBusinessOutputData } from "@/schema/business";
import { Stat } from "@chakra-ui/react";

interface Props {
  initialBusinesses: Promise<GetAllBusinessOutputData>;
}

export const BusinessStat = ({ initialBusinesses }: Props) => {
  const { data: businesses } = useBusinesses({
    fallbackData: initialBusinesses,
  });

  return (
    <Stat.Root p={4} w={"full"} h={"full"} rounded={"md"} borderWidth={"1px"}>
      <Stat.Label>Businesses</Stat.Label>
      <Stat.ValueText>{businesses?.length ?? 0}</Stat.ValueText>
    </Stat.Root>
  );
};
