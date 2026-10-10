import FormButton from "@/components/shared/FormButton";
import { PageContainer } from "@/components/shared/PageContainer";
import PageHeader from "@/components/shared/PageHeader";
import ProductGrid from "@/components/shared/ProductGrid";
import Search from "@/components/shared/Search";
import { getProducts } from "@/server/product";
import { computePath } from "@/utilities/computePath";
import { HStack, Spacer } from "@chakra-ui/react";
import NextLink from "next/link";
import { Suspense } from "react";
import { LuPlus } from "react-icons/lu";

interface Props {
  params: Promise<{ businessId?: string }>;
}

export default async function page({ params }: Props) {
  const { businessId } = await params;
  const products = getProducts(businessId).then((d) => [d]);

  return (
    <PageContainer>
      <PageHeader>Product Inventory</PageHeader>

      <HStack w={"full"}>
        <Suspense>
          <Search placeholder={"Search for a product"} searchField={"search"} />
        </Suspense>
        <Spacer />
        <FormButton asChild>
          <NextLink href={`${computePath(businessId)}/products/new`}>
            <LuPlus />
            Create Product
          </NextLink>
        </FormButton>
        {/* add dropdown */}
      </HStack>

      <ProductGrid businessId={businessId} initialProducts={products} />
    </PageContainer>
  );
}
