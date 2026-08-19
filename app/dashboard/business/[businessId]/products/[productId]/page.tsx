import ProductCarousel from "@/components/custom/business/ProductCarousel";
import ProductDescription from "@/components/custom/business/ProductDescription";
import { PageContainer } from "@/components/custom/shared/PageContainer";
import { getProduct } from "@/server/services/product";
import { Box, Stack } from "@chakra-ui/react";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ productId: string }>;
}

export default async function page({ params }: Props) {
  const { productId } = await params;
  const { data: product, error } = await getProduct(productId);

  if (!product || error) notFound();

  return (
    <PageContainer>
      <Stack
        direction={{ base: "column", md: "row" }}
        gap={{ sm: 4, md: 10 }}
        py={10}
      >
        <Box w={{ base: "full", md: "60%" }}>
          <ProductCarousel product={product} />
        </Box>
        <ProductDescription product={product} />
      </Stack>
    </PageContainer>
  );
}
