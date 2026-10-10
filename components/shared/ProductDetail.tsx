"use client";

import { useProduct } from "@/hooks/product";
import { GetProductOutputData } from "@/schema/product";
import { Box, Stack, VStack } from "@chakra-ui/react";
import EmptyPage from "./EmptyPage";
import ProductCarousel from "./ProductCarousel";
import ProductDescription from "./ProductDescription";
import VariationCard from "./VariationCard";

interface Props {
  initialProduct: Promise<GetProductOutputData>;
  productId: string;
}

const ProductDetail = ({ initialProduct, productId }: Props) => {
  const { data: product, error } = useProduct(productId, {
    fallbackData: initialProduct,
  });

  if (error || !product) {
    return (
      <EmptyPage title="No product found" description="Refresh the page" />
    );
  }

  return (
    <>
      <Stack direction={{ base: "column", md: "row" }} gap={{ sm: 4, md: 10 }}>
        <Box w={{ base: "full", md: "60%" }}>
          <ProductCarousel product={product} />
        </Box>
        <Box w={{ base: "full", md: "40%" }}>
          <ProductDescription product={product} />
        </Box>
      </Stack>

      <VStack gap={{ base: 4, md: 10 }} mt={8} w={"full"}>
        {product.variations.map((v, i) => (
          <VariationCard key={v.id} variation={v} index={i} />
        ))}
      </VStack>
    </>
  );
};

export default ProductDetail;
