import ProductGrid from "@/components/custom/business/ProductGrid";
import EmptyPage from "@/components/custom/shared/EmptyPage";
import { PageContainer } from "@/components/custom/shared/PageContainer";
import PageHeader from "@/components/custom/shared/PageHeader";
import { getProducts } from "@/server/services/product";
import { computePath } from "@/utilities/computePath";
import { Button, VStack } from "@chakra-ui/react";
import NextLink from "next/link";
import { LuPlus } from "react-icons/lu";

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

        {products.data.length ? (
          <ProductGrid businessId={business} initialProducts={products} />
        ) : (
          <EmptyPage
            title={"No products found"}
            description={"Create a new product"}
          >
            <Button asChild>
              <NextLink
                href={`${computePath({ businessId: business })}/products/new`}
              >
                <LuPlus />
                Create Product
              </NextLink>
            </Button>
          </EmptyPage>
        )}
      </VStack>
    </PageContainer>
  );
}
