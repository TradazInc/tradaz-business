import { CreateProductInputData } from "@/schema/product";
import { FormatNumber, Stat, StatRootProps } from "@chakra-ui/react";
import { Control, useWatch } from "react-hook-form";

interface Props {
  control: Control<CreateProductInputData>;
}

export default function TotalQuantityStat({
  control,
  ...props
}: Props & StatRootProps) {
  const variationValues = useWatch({
    name: "variations",
    control,
  });

  // Sum of all quatities of all team variations within variations
  const total = variationValues.reduce(
    (total, v) =>
      total + v.teamVariations.reduce((total, tv) => total + tv.quantity, 0),
    0,
  );
  return (
    <Stat.Root {...props}>
      <Stat.Label>Total Quantity</Stat.Label>
      <Stat.ValueText>
        <FormatNumber value={total} />
      </Stat.ValueText>
    </Stat.Root>
  );
}
