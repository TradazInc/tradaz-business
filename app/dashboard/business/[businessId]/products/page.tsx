import ProductGrid from "@/components/custom/business/ProductGrid";
import EmptyPage from "@/components/custom/shared/EmptyPage";
import { PageContainer } from "@/components/custom/shared/PageContainer";
import PageHeader from "@/components/custom/shared/PageHeader";
import Search from "@/components/custom/shared/Search";
import { getProducts } from "@/server/product";
import { computePath } from "@/utilities/computePath";
import { Button, HStack, Spacer, VStack } from "@chakra-ui/react";
import NextLink from "next/link";
import { Suspense } from "react";
import { LuPlus } from "react-icons/lu";

interface Props {
  params: Promise<{ businessId?: string }>;
}

export default async function page({ params }: Props) {
  const { businessId } = await params;
  const { data: products, error } = await getProducts(businessId);

  if (error) return error.message;

  return (
    <PageContainer>
      <VStack w={"full"} h={"full"}>
        <PageHeader>Product Inventory</PageHeader>

        <HStack w={"full"}>
          <Suspense>
            <Search placeholder={"Search for a product"} filterField={"name"} />
          </Suspense>
          <Spacer />
          {/* add dropdown */}
        </HStack>

        {products.data.length > 0 ? (
          <ProductGrid businessId={businessId} initialProducts={products} />
        ) : (
          <EmptyPage
            title={"No products found"}
            description={"Create a new product"}
          >
            <Button asChild>
              <NextLink href={`${computePath({ businessId })}/products/new`}>
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
