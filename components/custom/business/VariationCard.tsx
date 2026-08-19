import { Variation } from "@/server/entities/product";
import {
  Card,
  ColorSwatch,
  DataList,
  FormatNumber,
  Heading,
  HStack,
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
      <Card.Body flexDirection={{ base: "column", md: "row" }}>
        <DataList.Root orientation={{ base: "vertical", md: "horizontal" }}>
          <DataList.Item>
            <DataList.ItemLabel>SKU</DataList.ItemLabel>
            <DataList.ItemValue>{variation.sku}</DataList.ItemValue>
          </DataList.Item>
          {variation.size && (
            <DataList.Item>
              <DataList.ItemLabel>Size</DataList.ItemLabel>
              <DataList.ItemValue>
                <Square size={8} bg={"bg.inverted"} color={"fg.inverted"}>
                  {variation.size.value}
                </Square>
              </DataList.ItemValue>
            </DataList.Item>
          )}
          <DataList.Item>
            <DataList.ItemLabel>Color</DataList.ItemLabel>
            <DataList.ItemValue>
              <HStack gap={2}>
                <ColorSwatch value={variation.color} />
                <Text textStyle="sm">{variation.color}</Text>
              </HStack>
            </DataList.ItemValue>
          </DataList.Item>
        </DataList.Root>

        <DataList.Root orientation={{ base: "vertical", md: "horizontal" }}>
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
          <DataList.Item>
            <DataList.ItemLabel>Store quantity</DataList.ItemLabel>
            <DataList.ItemValue>
              <DataList.Root size={"sm"} orientation={"horizontal"}>
                {variation.teamVariations.map((tv) => (
                  <DataList.Item key={tv.id}>
                    <DataList.ItemLabel>{tv.team.address}</DataList.ItemLabel>
                    <DataList.ItemValue>{tv.quantity}</DataList.ItemValue>
                  </DataList.Item>
                ))}
              </DataList.Root>
            </DataList.ItemValue>
          </DataList.Item>
        </DataList.Root>
      </Card.Body>
    </Card.Root>
  );
};

export default VariationCard;
