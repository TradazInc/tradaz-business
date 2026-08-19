import ProductCarousel from "@/components/custom/business/ProductCarousel";
import ProductDescription from "@/components/custom/business/ProductDescription";
import { PageContainer } from "@/components/custom/shared/PageContainer";
import { getProduct } from "@/server/services/product";
import { SimpleGrid } from "@chakra-ui/react";
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
      <SimpleGrid columns={{ base: 1, md: 2 }} gap={4} py={8}>
        <ProductCarousel product={product} />
        <ProductDescription product={product} />
      </SimpleGrid>
    </PageContainer>
  );
}
