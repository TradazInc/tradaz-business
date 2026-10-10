import CartForm from "@/components/shared/CartForm";
import CartItemTable from "@/components/shared/CartItemTable";
import CartName from "@/components/shared/CartName";
import { PageContainer } from "@/components/shared/PageContainer";
import PageHeader from "@/components/shared/PageHeader";
import { getCart } from "@/server/cart";
import { GridItem, SimpleGrid, VStack } from "@chakra-ui/react";

interface Props {
  params: Promise<{ businessId?: string; storeId?: string; cartId: string }>;
}

export default async function page({ params }: Props) {
  const { businessId, storeId, cartId } = await params;
  const cartPromise = getCart(cartId);

  return (
    <PageContainer>
      <PageHeader>
        <CartName cartId={cartId} />
      </PageHeader>

      <SimpleGrid columns={{ base: 1, md: 4 }} gap={3}>
        <GridItem colSpan={{ base: 1, md: 3 }}>
          <CartItemTable
            initialCart={cartPromise}
            businessId={businessId}
            storeId={storeId}
            cartId={cartId}
          />
        </GridItem>
        <GridItem colSpan={1}>
          <CartForm
            initialCart={cartPromise}
            businessId={businessId}
            cartId={cartId}
          />
        </GridItem>
      </SimpleGrid>
    </PageContainer>
  );
}
