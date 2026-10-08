import ProductGrid from "@/components/business/ProductGrid";
import { PageContainer } from "@/components/shared/PageContainer";
import PageHeader from "@/components/shared/PageHeader";
import Search from "@/components/shared/Search";
import { getProducts } from "@/server/product";
import { computePath } from "@/utilities/computePath";
import { Button, HStack, Spacer, VStack } from "@chakra-ui/react";
import { Suspense } from "react";
import NextLink from "next/link";
import { LuPlus } from "react-icons/lu";

interface Props {
  params: Promise<{ businessId?: string }>;
}

export default async function page({ params }: Props) {
  const { businessId } = await params;
  const products = getProducts(businessId).then((d) => [d]);

  return (
    <PageContainer>
      <VStack w={"full"} h={"full"}>
        <PageHeader>Product Inventory</PageHeader>

        <HStack w={"full"}>
          <Suspense>
            <Search
              placeholder={"Search for a product"}
              searchField={"search"}
            />
          </Suspense>
          <Spacer />
          <Button asChild>
            <NextLink href={`${computePath(businessId)}/products/new`}>
              <LuPlus />
              Create Product
            </NextLink>
          </Button>
          {/* add dropdown */}
        </HStack>

        <ProductGrid businessId={businessId} initialProducts={products} />
      </VStack>
    </PageContainer>
  );
}
