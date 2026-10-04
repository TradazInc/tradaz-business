import { PageContainer } from "@/components/shared/PageContainer";
import PageHeader from "@/components/shared/PageHeader";
import ProductSearch from "@/components/shared/ProductSearch";
import CartItemTable from "@/components/store/CartItemTable";
import { getCart } from "@/server/cart";
import { HStack, Spacer, VStack } from "@chakra-ui/react";
import { Suspense } from "react";

interface Props {
  params: Promise<{ businessId?: string; storeId?: string; cartId: string }>;
}

export default async function page({ params }: Props) {
  const { businessId, storeId, cartId } = await params;
  const { data, error } = await getCart(cartId);

  if (error) return error.message;

  return (
    <PageContainer>
      <VStack w={"full"} h={"full"}>
        <PageHeader>Cart {data.id}</PageHeader>

        <HStack w={"full"}>
          <Suspense>
            <ProductSearch
              placeholder={"Search for a product"}
              searchField={"search"}
              businessId={businessId}
            />
          </Suspense>
          <Spacer />
        </HStack>

        <CartItemTable cart={data} businessId={businessId} storeId={storeId} />
      </VStack>
    </PageContainer>
  );
}
