import RevenueTable from "@/components/business/RevenueTable";
import EmptyPage from "@/components/shared/EmptyPage";
import { PageContainer } from "@/components/shared/PageContainer";
import PageHeader from "@/components/shared/PageHeader";
import Search from "@/components/shared/Search";
import { getRevenues } from "@/server/revenue";
import { HStack, Spacer, VStack } from "@chakra-ui/react";
import { Suspense } from "react";

interface Props {
  params: Promise<{ businessId?: string }>;
}

export default async function page({ params }: Props) {
  const { businessId } = await params;
  const { data: revenues, error } = await getRevenues(businessId);

  if (error) return error?.message;

  return (
    <PageContainer>
      <VStack w={"full"} h={"full"}>
        <PageHeader>Revenues</PageHeader>

        <HStack w={"full"}>
          <Suspense>
            <Search placeholder={"Search for a revenue"} filterField={"name"} />
          </Suspense>
          <Spacer />
        </HStack>

        {revenues && revenues.data.length > 0 ? (
          <RevenueTable initialRevenues={revenues} businessId={businessId} />
        ) : (
          <EmptyPage title="No revenue found" description="Create revenue" />
        )}
      </VStack>
    </PageContainer>
  );
}
