import ProductCarousel from "@/components/custom/business/ProductCarousel";
import ProductDescription from "@/components/custom/business/ProductDescription";
import VariationCard from "@/components/custom/business/VariationCard";
import { PageContainer } from "@/components/custom/shared/PageContainer";
import { getProduct } from "@/server/product";
import { Box, Stack, VStack } from "@chakra-ui/react";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ productId: string }>;
}

export default async function page({ params }: Props) {
  const { productId } = await params;
  const { data: product, error } = await getProduct(productId);

  if (!product || error) notFound();

  return (
    <PageContainer py={10}>
      <Stack direction={{ base: "column", md: "row" }} gap={{ sm: 4, md: 10 }}>
        <Box w={{ base: "full", md: "60%" }}>
          <ProductCarousel product={product} />
        </Box>
        <Box w={{ base: "full", md: "40%" }}>
          <ProductDescription product={product} />
        </Box>
      </Stack>

      <VStack gap={{ base: 4, md: 10 }} mt={8}>
        {product.variations.map((v, i) => (
          <VariationCard key={v.id} variation={v} index={i} />
        ))}
      </VStack>
    </PageContainer>
  );
}
