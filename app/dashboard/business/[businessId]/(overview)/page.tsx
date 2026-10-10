import BusinessName from "@/components/shared/BusinessName";
import { PageContainer } from "@/components/shared/PageContainer";
import PageHeader from "@/components/shared/PageHeader";
import { RevenueStat } from "@/components/shared/RevenueStat";
import { SalesStat } from "@/components/shared/SalesStat";
import StatContainer from "@/components/shared/StatContainer";
import { StoreForm, StoreFormViewport } from "@/components/shared/StoreForm";
import StoreGrid from "@/components/shared/StoreGrid";
import { VisitorsStat } from "@/components/shared/VisitorsStat";
import { getStores } from "@/server/store";
import { HStack, Spacer } from "@chakra-ui/react";

interface Props {
  params: Promise<{ businessId: string }>;
}

export default async function page({ params }: Props) {
  const { businessId } = await params;
  const stores = getStores(businessId);

  return (
    <PageContainer>
      <PageHeader>
        <BusinessName businessId={businessId} />
      </PageHeader>

      <HStack>
        <Spacer />
        <StoreForm />
      </HStack>

      <StatContainer>
        <VisitorsStat />
        <SalesStat />
        <RevenueStat />
      </StatContainer>

      <StoreGrid initialStores={stores} businessId={businessId} />
      <StoreFormViewport />
    </PageContainer>
  );
}
