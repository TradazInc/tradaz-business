import { PageContainer } from "@/components/shared/PageContainer";
import PageHeader from "@/components/shared/PageHeader";
import CartForm from "@/components/store/CartForm";
import CartItemTable from "@/components/store/CartItemTable";
import { getCart } from "@/server/cart";
import { GridItem, SimpleGrid, VStack } from "@chakra-ui/react";

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

        <SimpleGrid columns={{ base: 1, md: 4 }} gap={3}>
          <GridItem colSpan={{ base: 4, md: 3 }}>
            <CartItemTable
              cart={data}
              businessId={businessId}
              storeId={storeId}
            />
          </GridItem>
          <GridItem colSpan={{ base: 4, md: 1 }}>
            <CartForm cart={data} businessId={businessId} />
          </GridItem>
        </SimpleGrid>
      </VStack>
    </PageContainer>
  );
}
