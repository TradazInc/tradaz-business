import OrderTable from "@/components/business/OrderTable";
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
  const orders = getOrders(businessId).then((d) => [d]);

  return (
    <PageContainer>
      <VStack w={"full"} h={"full"}>
        <PageHeader>Orders</PageHeader>

        <HStack w={"full"}>
          <Suspense>
            <Search
              placeholder={"Search for an order"}
              searchField={"search"}
            />
          </Suspense>
          <Spacer />
        </HStack>

        <OrderTable initialOrders={orders} businessId={businessId} />
      </VStack>
    </PageContainer>
  );
}
