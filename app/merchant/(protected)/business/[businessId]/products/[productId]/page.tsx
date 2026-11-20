import { PageContainer } from "@/components/shared/PageContainer";
import ProductDetail from "@/components/shared/ProductDetail";
import { getProduct } from "@/server/product";

interface Props {
  params: Promise<{ businessId?: string; productId: string }>;
}

export default async function page({ params }: Props) {
  const { businessId, productId } = await params;
  const productPromise = getProduct(productId, businessId);

  return (
    <PageContainer>
      <ProductDetail
        initialProduct={productPromise}
        productId={productId}
        businessId={businessId}
      />
    </PageContainer>
  );
}
