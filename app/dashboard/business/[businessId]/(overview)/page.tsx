import { StoreForm, StoreFormViewport } from "@/components/business/StoreForm";
import StoreGrid from "@/components/business/StoreGrid";
import EmptyPage from "@/components/shared/EmptyPage";
import { PageContainer } from "@/components/shared/PageContainer";
import PageHeader from "@/components/shared/PageHeader";
import Search from "@/components/shared/Search";
import { getBusiness } from "@/server/business";
import { HStack, Spacer, VStack } from "@chakra-ui/react";
import { notFound } from "next/navigation";
import { Suspense } from "react";

interface Props {
  params: Promise<{ businessId: string }>;
}

export default async function page({ params }: Props) {
  const { businessId } = await params;
  const { data, error } = await getBusiness(businessId);

  if (error) notFound();

  return (
    <PageContainer>
      <VStack w={"full"} h={"full"}>
        <PageHeader>{`${data?.name} Stores`}</PageHeader>

        <HStack w={"full"}>
          <Suspense>
            <Search placeholder={"Search for a store"} searchField={"search"} />
          </Suspense>
          <Spacer />
          <StoreForm />
        </HStack>

        {data?.teams.length > 0 ? (
          <StoreGrid initialStores={data.teams} businessId={businessId} />
        ) : (
          <EmptyPage
            title={"No stores found"}
            description={"Create a new store for your brand"}
          />
        )}
      </VStack>
      <StoreFormViewport />
    </PageContainer>
  );
}
