import { PageContainer } from "@/components/shared/PageContainer";
import ProductForm from "@/components/shared/ProductForm";
import { getProduct } from "@/server/product";

interface Props {
  params: Promise<{ businessId?: string; productId: string }>;
}

export default async function page({ params }: Props) {
  const { businessId, productId } = await params;
  const product = await getProduct(productId, businessId);

  return (
    <PageContainer>
      <ProductForm product={product} />
    </PageContainer>
  );
}
