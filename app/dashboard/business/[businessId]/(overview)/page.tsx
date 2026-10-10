import BusinessName from "@/components/shared/BusinessName";
import { StoreForm, StoreFormViewport } from "@/components/shared/StoreForm";
import StoreGrid from "@/components/shared/StoreGrid";
import { PageContainer } from "@/components/shared/PageContainer";
import PageHeader from "@/components/shared/PageHeader";
import Search from "@/components/shared/Search";
import { getStores } from "@/server/store";
import { HStack, Spacer, VStack } from "@chakra-ui/react";
import { Suspense } from "react";

interface Props {
  params: Promise<{ businessId: string }>;
}

export default async function page({ params }: Props) {
  const { businessId } = await params;
  const stores = getStores(businessId);

  return (
    <PageContainer>
      <VStack w={"full"} h={"full"}>
        <PageHeader>
          <BusinessName businessId={businessId} />
        </PageHeader>

        <HStack w={"full"}>
          <Suspense>
            <Search placeholder={"Search for a store"} searchField={"search"} />
          </Suspense>
          <Spacer />
          <StoreForm />
        </HStack>

        <StoreGrid initialStores={stores} businessId={businessId} />
      </VStack>
      <StoreFormViewport />
    </PageContainer>
  );
}
