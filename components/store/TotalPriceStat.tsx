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
}

export default function TotalPriceStat({
  totalPrice,
  ...props
}: Props & StatRootProps) {
  return (
    <Stat.Root maxW={60} borderWidth={"1px"} p={4} rounded={"md"} {...props}>
      <HStack justify="space-between">
        <Stat.Label>
          Total Price
          <InfoTip>Total Price does not include VAT</InfoTip>
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
