import ProductForm from "@/components/custom/business/ProductForm";
import { PageContainer } from "@/components/custom/PageContainer";
import { getProduct } from "@/apis/services/product";
import { toaster } from "@/components/ui/toaster";

interface Props {
  params: Promise<{ productId: string }>;
}

export default async function page({ params }: Props) {
  const { productId } = await params;
  const { data: product, error } = await getProduct(productId);

  if (error) {
    toaster.create({
      title: "Failed to fetch product",
      description: error instanceof Error ? error.message : "Please try again.",
      type: "error",
    });
  }

  return (
    <PageContainer>
      <ProductForm product={product} />
    </PageContainer>
  );
}
