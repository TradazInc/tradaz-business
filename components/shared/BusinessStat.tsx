"use client";

import { useBusinesses } from "@/hooks/business";
import { GetAllBusinessOutputData } from "@/schema/business";
import { FormatNumber, Stat, StatRootProps } from "@chakra-ui/react";
import { StatContainer } from "./StatContainer";
import { useSession } from "@/hooks/session";
import { format } from "date-fns";

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

  const { data: session } = useSession();

  return (
    <StatContainer {...props}>
      <Stat.Label>Businesses</Stat.Label>
      <Stat.ValueText>
        <FormatNumber
          value={businesses?.length ?? 0}
          notation={"compact"}
          compactDisplay={"short"}
        />
      </Stat.ValueText>
      {session?.user && (
        <Stat.HelpText>
          since {format(session?.user.createdAt, "PPP")}
        </Stat.HelpText>
      )}
    </StatContainer>
  );
};
