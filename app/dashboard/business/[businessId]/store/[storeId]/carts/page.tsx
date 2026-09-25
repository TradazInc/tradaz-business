import EmptyPage from "@/components/shared/EmptyPage";
import { PageContainer } from "@/components/shared/PageContainer";
import PageHeader from "@/components/shared/PageHeader";
import Search from "@/components/shared/Search";
import CartGrid from "@/components/store/CartGrid";
import { getCarts } from "@/server/cart";
import { HStack, Spacer, VStack } from "@chakra-ui/react";
import { Suspense } from "react";

interface Props {
  params: Promise<{ businessId?: string; storeId?: string }>;
}

export default async function page({ params }: Props) {
  const { businessId, storeId } = await params;
  const { data: carts, error } = await getCarts(businessId, storeId);

  if (error) return error?.message;

  return (
    <PageContainer>
      <VStack w={"full"} h={"full"}>
        <PageHeader>Carts</PageHeader>

        <HStack w={"full"}>
          <Suspense>
            <Search placeholder={"Search for a cart"} filterField={"name"} />
          </Suspense>
          <Spacer />
        </HStack>

        {carts && carts.data.length > 0 ? (
          <CartGrid
            initialCarts={carts}
            businessId={businessId}
            storeId={storeId}
          />
        ) : (
          <EmptyPage title="No carts found" description="Create a cart" />
        )}
      </VStack>
    </PageContainer>
  );
}
