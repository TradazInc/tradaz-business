import {
  Badge,
  FormatNumber,
  HStack,
  Icon,
  Stat,
  StatRootProps,
} from "@chakra-ui/react";
import { BsCashCoin } from "react-icons/bs";
import { StatContainer } from "./StatContainer";

export const RevenueStat = ({ ...props }: StatRootProps) => {
  return (
    <StatContainer {...props}>
      <HStack justify={"space-between"}>
        <Stat.Label>Revenue</Stat.Label>
        <Icon color={"fg.muted"}>
          <BsCashCoin />
        </Icon>
      </HStack>

      <HStack>
        <Stat.ValueText>
          <FormatNumber
            value={134000}
            style={"currency"}
            currency={"NGN"}
            currencyDisplay={"narrowSymbol"}
            maximumFractionDigits={0}
          />
        </Stat.ValueText>
        <Badge colorPalette={"red"} gap={"0"}>
          <Stat.DownIndicator />
          17%
        </Badge>
      </HStack>

      <Stat.HelpText mb="2">since last week</Stat.HelpText>
    </StatContainer>
  );
};
