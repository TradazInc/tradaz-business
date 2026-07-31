import ProductForm from "@/components/custom/business/ProductForm";
import { PageContainer } from "@/components/custom/PageContainer";
import { getProduct } from "@/apis/client/product";

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
