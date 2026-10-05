import {
  FormatNumber,
  HStack,
  Icon,
  Stat,
  StatRootProps,
} from "@chakra-ui/react";
import { TbCurrencyNaira } from "react-icons/tb";
import { InfoTip } from "../ui/toggle-tip";

interface Props {
  totalPrice: number;
  infoText?: string;
}

export default function TotalPriceStat({
  infoText,
  totalPrice,
  ...props
}: Props & StatRootProps) {
  return (
    <Stat.Root {...props}>
      <HStack justify="space-between">
        <Stat.Label>
          Total Price
          {infoText && <InfoTip>{infoText}</InfoTip>}
        </Stat.Label>
        <Icon color="fg.muted">
          <TbCurrencyNaira />
        </Icon>
      </HStack>

      <Stat.ValueText>
        <FormatNumber value={totalPrice} style={"currency"} currency={"NGN"} />
      </Stat.ValueText>
    </Stat.Root>
  );
}
