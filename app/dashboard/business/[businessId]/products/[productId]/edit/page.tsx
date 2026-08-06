import ProductForm from "@/components/custom/business/ProductForm";
import { PageContainer } from "@/components/custom/shared/PageContainer";
import { getProduct } from "@/server/services/product";

interface Props {
  params: Promise<{ productId: string }>;
}

export default async function page({ params }: Props) {
  const { productId } = await params;
  const { data: product, error } = await getProduct(productId);

  if (error) return error.message ?? error.statusText;

  return (
    <PageContainer>
      <ProductForm product={product} />
    </PageContainer>
  );
}
