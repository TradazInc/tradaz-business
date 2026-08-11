import ProductCard from "@/components/custom/business/ProductCard";
import EmptyPage from "@/components/custom/shared/EmptyPage";
import GridContainer from "@/components/custom/shared/GridContainer";
import { PageContainer } from "@/components/custom/shared/PageContainer";
import PageHeader from "@/components/custom/shared/PageHeader";
import { getProducts } from "@/server/services/product";
import { computePath } from "@/utilities/computePath";
import { For, VStack } from "@chakra-ui/react";

interface Props {
  params: Promise<{ business: string }>;
}

export default async function page({ params }: Props) {
  const [{ data: products, error }, { business }] = await Promise.all([
    getProducts(),
    params,
  ]);

  if (error) return error.message ?? error.statusText;

  return (
    <PageContainer>
      <VStack w={"full"} h={"full"}>
        <PageHeader>Your Products</PageHeader>

        {products?.data.length ? (
          <GridContainer>
            <For each={products.data}>
              {(product) => (
                <ProductCard
                  key={product.id}
                  name={product.name}
                  image={product.images[0].url}
                  description={product.description}
                  productStatus={product.productStatus}
                  href={`${computePath({ businessId: business })}/products/${product.id}}`}
                />
              )}
            </For>
          </GridContainer>
        ) : (
          <EmptyPage
            title="No products found"
            description="Create a new product"
          ></EmptyPage>
        )}
      </VStack>
    </PageContainer>
  );
}
