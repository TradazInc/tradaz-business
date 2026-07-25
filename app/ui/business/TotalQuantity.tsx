import { ProductFormValues, ProductData } from "@/schema/product";
import { Box, FormatNumber } from "@chakra-ui/react";
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
    <Box>
      Total Quantity:
      <FormatNumber value={total} notation="compact" compactDisplay="short" />
    </Box>
  );
}
