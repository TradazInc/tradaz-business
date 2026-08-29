import { Variation } from "@/entities/product";
import {
  Badge,
  Card,
  ColorSwatch,
  DataList,
  Flex,
  FormatNumber,
  Heading,
  Square,
  Text,
} from "@chakra-ui/react";

interface Props {
  variation: Variation;
  index: number;
}

const VariationCard = ({ variation, index }: Props) => {
  return (
    <Card.Root size={{ base: "sm", md: "lg" }} w={"full"}>
      <Card.Header>
        <Heading size="md">Variation {index + 1}</Heading>
      </Card.Header>
      <Card.Body>
        <Flex flexDirection={{ base: "column", md: "row" }} w={"full"} gap={4}>
          <DataList.Root orientation={"horizontal"} w={"full"}>
            <DataList.Item>
              <DataList.ItemLabel>SKU</DataList.ItemLabel>
              <DataList.ItemValue>{variation.sku}</DataList.ItemValue>
            </DataList.Item>
            {variation.size && (
              <DataList.Item>
                <DataList.ItemLabel>Size</DataList.ItemLabel>
                <DataList.ItemValue>
                  <Square size={6} bg={"bg.inverted"} color={"fg.inverted"}>
                    {variation.size.value}
                  </Square>
                </DataList.ItemValue>
              </DataList.Item>
            )}
            <DataList.Item>
              <DataList.ItemLabel>Color</DataList.ItemLabel>
              <DataList.ItemValue>
                <Badge size={{ base: "md", md: "lg" }}>
                  <ColorSwatch value={variation.color} />
                  {variation.color}
                </Badge>
              </DataList.ItemValue>
            </DataList.Item>
          </DataList.Root>

          <DataList.Root orientation={"horizontal"} w={"full"}>
            <DataList.Item>
              <DataList.ItemLabel>Price</DataList.ItemLabel>
              <DataList.ItemValue>
                <FormatNumber
                  value={variation.price}
                  style="currency"
                  currency="NGN"
                />
              </DataList.ItemValue>
            </DataList.Item>
            <DataList.Item>
              <DataList.ItemLabel>Total stock</DataList.ItemLabel>
              <DataList.ItemValue>
                {variation.teamVariations.reduce(
                  (total, teamVariation) => total + teamVariation.quantity,
                  0,
                )}
              </DataList.ItemValue>
            </DataList.Item>
            {variation.teamVariations.length ? (
              <>
                {variation.teamVariations.map((tv) => (
                  <DataList.Item
                    key={tv.id}
                    justifyContent={"space-between"}
                    gap={4}
                  >
                    <DataList.ItemLabel>
                      {tv.team.address} quantity
                    </DataList.ItemLabel>
                    <DataList.ItemValue>{tv.quantity}</DataList.ItemValue>
                  </DataList.Item>
                ))}
              </>
            ) : (
              <Text color={"fg.muted"}>Not stocked in any store</Text>
            )}
          </DataList.Root>
        </Flex>
      </Card.Body>
    </Card.Root>
  );
};

export default VariationCard;
