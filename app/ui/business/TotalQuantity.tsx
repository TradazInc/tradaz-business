import { ProductFormValues, ProductData } from "@/schema/product";
import { Box, FormatNumber, Stat } from "@chakra-ui/react";
import { Control, useWatch } from "react-hook-form";

interface Props {
  control: Control<ProductFormValues, unknown, ProductData>;
}

export default function TotalQuantity({ control }: Props) {
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
    <Stat.Root>
      <Stat.Label>Total Quantity</Stat.Label>
      <Stat.ValueText>
        <FormatNumber value={total} style="unit" />
      </Stat.ValueText>
    </Stat.Root>
  );
}
