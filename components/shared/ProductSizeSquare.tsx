import { Square, SquareProps, Text } from "@chakra-ui/react";

interface Props {
  value?: string;
}

const ProductSizeSquare = ({ value, ...props }: Props & SquareProps) => {
  if (!value) return <Text>"N/A"</Text>;

  return value.length > 3 ? (
    <Text>{value}</Text>
  ) : (
    <Square size={8} bg={"bg.inverted"} color={"fg.inverted"} {...props}>
      {value}
    </Square>
  );
};

export default ProductSizeSquare;
