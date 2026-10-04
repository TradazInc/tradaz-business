import { PageContainer } from "@/components/shared/PageContainer";
import PageHeader from "@/components/shared/PageHeader";
import CartItemTable from "@/components/store/CartItemTable";
import { getCart } from "@/server/cart";
import { VStack } from "@chakra-ui/react";

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
        <CartItemTable cart={data} businessId={businessId} storeId={storeId} />
      </VStack>
    </PageContainer>
  );
}
