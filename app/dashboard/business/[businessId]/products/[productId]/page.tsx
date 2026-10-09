import { PageContainer } from "@/components/shared/PageContainer";
import ProductDetail from "@/components/shared/ProductDetail";
import { getProduct } from "@/server/product";

interface Props {
  params: Promise<{ productId: string }>;
}

export default async function page({ params }: Props) {
  const { productId } = await params;
  const productPromise = getProduct(productId);

  return (
    <PageContainer py={10}>
      <ProductDetail initialProduct={productPromise} productId={productId} />
    </PageContainer>
  );
}
