import { InfoTip } from "@/components/ui/toggle-tip";
import { Product } from "@/server/entities/product";
import {
  DataList,
  Heading,
  HStack,
  Square,
  Text,
  VStack,
} from "@chakra-ui/react";
import StatusIndicator from "./StatusIndicator";

interface Props {
  product: Product;
}

const ProductDescription = ({ product }: Props) => {
  return (
    <VStack w={"full"}>
      <Heading size={"5xl"} marginBottom={3}>
        {product.name.toUpperCase()}
      </Heading>
      <DataList.Root
        w={"full"}
        orientation={"horizontal"}
        size={{ sm: "md", md: "lg" }}
      >
        <DataList.Item>
          <DataList.ItemLabel>Description</DataList.ItemLabel>
          <DataList.ItemValue>{product.description}</DataList.ItemValue>
        </DataList.Item>

        {product.vendor && (
          <DataList.Item>
            <DataList.ItemLabel>Vendor</DataList.ItemLabel>
            <DataList.ItemValue>{product.vendor.user.name}</DataList.ItemValue>
          </DataList.Item>
        )}
        {product.brand && (
          <DataList.Item>
            <DataList.ItemLabel>Brand</DataList.ItemLabel>
            <DataList.ItemValue>{product.brand}</DataList.ItemValue>
          </DataList.Item>
        )}
        {product.category && (
          <DataList.Item>
            <DataList.ItemLabel>Category</DataList.ItemLabel>
            <DataList.ItemValue>{product.category.name}</DataList.ItemValue>
          </DataList.Item>
        )}
        {product._count?.variations && (
          <DataList.Item>
            <DataList.ItemLabel>Variations</DataList.ItemLabel>
            <DataList.ItemValue>{product._count.variations}</DataList.ItemValue>
          </DataList.Item>
        )}
        <DataList.Item>
          <DataList.ItemLabel>Gender</DataList.ItemLabel>
          <DataList.ItemValue>{product.gender}</DataList.ItemValue>
        </DataList.Item>
        <DataList.Item>
          <DataList.ItemLabel>Status</DataList.ItemLabel>
          <DataList.ItemValue>
            <StatusIndicator status={product.productStatus} />
          </DataList.ItemValue>
        </DataList.Item>
        {product.sizeType && (
          <DataList.Item>
            <DataList.ItemLabel>
              Sizes{" "}
              <InfoTip>
                Product sizes based on size type. See variation for available
                sizes
              </InfoTip>
            </DataList.ItemLabel>
            <DataList.ItemValue>
              <HStack gapX={2}>
                {product.sizeType.sizes.map((s) => (
                  <Square
                    key={s.id}
                    size={"10"}
                    bg={"bg.inverted"}
                    color={"fg.inverted"}
                  >
                    {s.value}
                  </Square>
                ))}
              </HStack>
            </DataList.ItemValue>
          </DataList.Item>
        )}
      </DataList.Root>
    </VStack>
  );
};

export default ProductDescription;
