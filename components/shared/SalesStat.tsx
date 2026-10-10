import {
  Badge,
  FormatNumber,
  HStack,
  Icon,
  Stat,
  StatRootProps,
} from "@chakra-ui/react";
import { StatContainer } from "./StatContainer";
import { TbCurrencyNaira } from "react-icons/tb";

export const SalesStat = ({ ...props }: StatRootProps) => {
  return (
    <StatContainer {...props}>
      <HStack justify={"space-between"}>
        <Stat.Label>Sales</Stat.Label>
        <Icon color="fg.muted">
          <TbCurrencyNaira />
        </Icon>
      </HStack>

      <HStack>
        <Stat.ValueText>
          <FormatNumber
            value={845600.4}
            style={"currency"}
            currency={"NGN"}
            currencyDisplay={"narrowSymbol"}
            maximumFractionDigits={0}
          />
        </Stat.ValueText>
        <Badge colorPalette={"green"} gap={"0"}>
          <Stat.UpIndicator />
          12%
        </Badge>
      </HStack>

      <Stat.HelpText>since last month</Stat.HelpText>
    </StatContainer>
  );
};
