import { GetProductVariationOutputData } from "@/schema/product";
import {
  Card,
  DataList,
  FormatNumber,
  Heading,
  Square,
} from "@chakra-ui/react";
import { format } from "date-fns";
import ProductColorBadge from "./ProductColorBadge";

interface Props {
  variation: GetProductVariationOutputData;
  index: number;
}

const VariationCard = ({ variation, index }: Props) => {
  return (
    <Card.Root size={{ base: "sm", md: "lg" }} w={"full"}>
      <Card.Header>
        <Heading size="md">Variation {index + 1}</Heading>
      </Card.Header>

      <Card.Body
        flexDirection={{ base: "column", md: "row" }}
        justifyContent={"space-between"}
      >
        <DataList.Root orientation={"horizontal"}>
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
              <ProductColorBadge color={variation.color} />
            </DataList.ItemValue>
          </DataList.Item>
        </DataList.Root>

        <DataList.Root orientation={"horizontal"}>
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
            <DataList.ItemLabel>Created At</DataList.ItemLabel>
            <DataList.ItemValue>
              {format(variation.createdAt, "dd MMM yy").toUpperCase()}
            </DataList.ItemValue>
          </DataList.Item>
        </DataList.Root>

        {variation.teamVariations.length > 0 && (
          <DataList.Root orientation={"horizontal"}>
            {variation.teamVariations.map((tv) => (
              <DataList.Item key={tv.id}>
                <DataList.ItemLabel>
                  {tv.team.address} quantity
                </DataList.ItemLabel>
                <DataList.ItemValue>{tv.quantity}</DataList.ItemValue>
              </DataList.Item>
            ))}
          </DataList.Root>
        )}
      </Card.Body>
    </Card.Root>
  );
};

export default VariationCard;
