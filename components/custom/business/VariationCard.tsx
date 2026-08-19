import { Variation } from "@/server/entities/product";
import { Card, ColorSwatch, DataList, Heading, Square } from "@chakra-ui/react";

interface Props {
  variation: Variation;
  index: number;
}

const VariationCard = ({ variation, index }: Props) => {
  return (
    <Card.Root size={{ sm: "sm", md: "lg" }}>
      <Card.Header>
        <Heading size="md">Variation {index}</Heading>
      </Card.Header>
      <Card.Body flexDirection={{ sm: "column", md: "row" }}>
        <DataList.Root orientation={{ sm: "vertical", md: "horizontal" }}>
          <DataList.Item>
            <DataList.ItemLabel>SKU</DataList.ItemLabel>
            <DataList.ItemValue>{variation.sku}</DataList.ItemValue>
          </DataList.Item>
          <DataList.Item>
            <DataList.ItemLabel>Size</DataList.ItemLabel>
            <DataList.ItemValue>
              <Square size={8} bg={"bg.inverted"} color={"fg.inverted"}>
                {variation.size.value}{" "}
              </Square>
            </DataList.ItemValue>
          </DataList.Item>
          <DataList.Item>
            <DataList.ItemLabel>Color</DataList.ItemLabel>
            <DataList.ItemValue>
              <ColorSwatch value={variation.color} />
            </DataList.ItemValue>
          </DataList.Item>
        </DataList.Root>

        <DataList.Root orientation={{ sm: "vertical", md: "horizontal" }}>
          <DataList.Item>
            <DataList.ItemLabel>Price</DataList.ItemLabel>
            <DataList.ItemValue>{variation.price}</DataList.ItemValue>
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
              <DataList.Root>
                {variation.teamVariations.map((tv) => (
                  <DataList.Item>
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
