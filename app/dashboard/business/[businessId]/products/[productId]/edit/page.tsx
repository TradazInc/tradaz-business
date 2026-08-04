import ProductForm from "@/components/custom/business/ProductForm";
import { PageContainer } from "@/components/custom/PageContainer";
import { getProduct } from "@/server/services/product";
import { toaster } from "@/components/ui/toaster";

interface Props {
  params: Promise<{ productId: string }>;
}

export default async function page({ params }: Props) {
  const { productId } = await params;
  const { data: product, error } = await getProduct(productId);

  if (error) {
    toaster.create({
      title: error.name,
      description: error.message,
      type: "error",
    });
  }

  return (
    <PageContainer>
      <ProductForm product={product} />
    </PageContainer>
  );
}
