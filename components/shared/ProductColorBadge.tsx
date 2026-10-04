import { Badge, ColorSwatch } from "@chakra-ui/react";

const ProductColorBadge = ({ color }: { color: string }) => {
  return (
    <Badge size={{ base: "md", md: "lg" }}>
      <ColorSwatch value={color} />
      {color}
    </Badge>
  );
};

export default ProductColorBadge;
