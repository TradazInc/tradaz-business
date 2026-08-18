import { InfoTip } from "@/components/ui/toggle-tip";
import { Product } from "@/server/entities/product";
import { DataList, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import StatusIndicator from "./StatusIndicator";

interface Props {
  product: Product;
}

const ProductDescription = ({ product }: Props) => {
  return (
    <VStack>
      <Heading fontSize={30} marginBottom={3}>
        {product.name.toUpperCase()}
      </Heading>
      <Text>{product.description}</Text>
      <DataList.Root orientation="horizontal">
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
              Sizes <InfoTip>This is some info</InfoTip>
            </DataList.ItemLabel>
            <DataList.ItemValue>
              <HStack gapX={2}>
                {product.sizeType.sizes.map((s) => (
                  <Text key={s.id}>{s.value}</Text>
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
