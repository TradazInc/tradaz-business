import { PageContainer } from "@/components/shared/PageContainer";
import PageHeader from "@/components/shared/PageHeader";
import Search from "@/components/shared/Search";
import CartGrid from "@/components/shared/CartGrid";
import NewCartButton from "@/components/shared/NewCartButton";
import { getCarts } from "@/server/cart";
import { HStack, Spacer, VStack } from "@chakra-ui/react";
import { Suspense } from "react";

interface Props {
  params: Promise<{ businessId?: string; storeId?: string }>;
}

export default async function page({ params }: Props) {
  const { businessId, storeId } = await params;
  const carts = getCarts(businessId, storeId).then((d) => [d]);

  return (
    <PageContainer>
      <PageHeader>Carts</PageHeader>

      <HStack w={"full"}>
        <Suspense>
          <Search placeholder={"Search for a cart"} searchField={"search"} />
        </Suspense>
        <Spacer />
        <NewCartButton businessId={businessId} storeId={storeId} />
      </HStack>

      <CartGrid
        initialCarts={carts}
        businessId={businessId}
        storeId={storeId}
      />
    </PageContainer>
  );
}
