"use client";

import { useBusinesses } from "@/hooks/business";
import { useStores } from "@/hooks/store";
import { GetAllStoresOutputData } from "@/schema/store";
import {
  FormatNumber,
  HStack,
  Icon,
  Stat,
  StatRootProps,
} from "@chakra-ui/react";
import { notFound } from "next/navigation";
import { StatContainer } from "./StatContainer";
import { format } from "date-fns";
import { LiaStoreAltSolid } from "react-icons/lia";

interface Props {
  initialStores: Promise<GetAllStoresOutputData>;
  businessId: string;
}

export const StoreStat = ({
  initialStores,
  businessId,
  ...props
}: Props & StatRootProps) => {
  const { data: businesses } = useBusinesses();
  const business = businesses?.find((b) => b.id === businessId);

  if (businesses && !business) notFound();

  const { data: stores } = useStores(businessId, {
    fallbackData: initialStores,
  });

  return (
    <StatContainer {...props}>
      <HStack justify={"space-between"}>
        <Stat.Label>Stores</Stat.Label>
        <Icon color={"fg.muted"}>
          <LiaStoreAltSolid />
        </Icon>
      </HStack>

      <Stat.ValueText>
        <FormatNumber
          value={stores?.length ?? 0}
          notation={"compact"}
          compactDisplay={"short"}
        />
      </Stat.ValueText>

      {business?.createdAt && (
        <Stat.HelpText>
          since {format(business?.createdAt, "PPP")}
        </Stat.HelpText>
      )}
    </StatContainer>
  );
};
