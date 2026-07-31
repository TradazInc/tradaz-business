import ProductForm from "@/app/ui/business/ProductForm";
import { PageContainer } from "@/app/ui/PageContainer";
import { getProduct } from "@/api/client/product";

interface Props {
  params: Promise<{ productId: string }>;
}

export default async function page({ params }: Props) {
  const { productId } = await params;
  const product = await getProduct(productId);

  return (
    <PageContainer>
      <ProductForm product={product} />
    </PageContainer>
  );
}
