import OrderTable from "@/components/business/OrderTable";
import EmptyPage from "@/components/shared/EmptyPage";
import { PageContainer } from "@/components/shared/PageContainer";
import PageHeader from "@/components/shared/PageHeader";
import Search from "@/components/shared/Search";
import { getOrders } from "@/server/order";
import { HStack, Spacer, VStack } from "@chakra-ui/react";
import { Suspense } from "react";

interface Props {
  params: Promise<{ businessId?: string }>;
}

export default async function page({ params }: Props) {
  const { businessId } = await params;
  const { data: orders, error } = await getOrders(businessId);

  if (error) return error?.message;

  return (
    <PageContainer>
      <VStack w={"full"} h={"full"}>
        <PageHeader>Orders</PageHeader>

        <HStack w={"full"}>
          <Suspense>
            <Search placeholder={"Search for an order"} filterField={"name"} />
          </Suspense>
          <Spacer />
        </HStack>

        {orders && orders.data.length > 0 ? (
          <OrderTable initialOrders={orders} businessId={businessId} />
        ) : (
          <EmptyPage
            title="No orders found"
            description="Make a sale to get your first order"
          />
        )}
      </VStack>
    </PageContainer>
  );
}
