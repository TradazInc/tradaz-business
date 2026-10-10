import BusinessName from "@/components/shared/BusinessName";
import { PageContainer } from "@/components/shared/PageContainer";
import PageHeader from "@/components/shared/PageHeader";
import { PageItemContainer } from "@/components/shared/PageItemContainer";
import { RevenueStat } from "@/components/shared/RevenueStat";
import { SalesStat } from "@/components/shared/SalesStat";
import { StoreForm, StoreFormViewport } from "@/components/shared/StoreForm";
import StoreGrid from "@/components/shared/StoreGrid";
import { VisitorsStat } from "@/components/shared/VisitorsStat";
import { getStores } from "@/server/store";
import { Spacer } from "@chakra-ui/react";

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

      <PageItemContainer>
        <Spacer />
        <StoreForm />
      </PageItemContainer>

      <PageItemContainer my={2}>
        <VisitorsStat />
        <SalesStat />
        <RevenueStat />
      </PageItemContainer>

      <StoreGrid initialStores={stores} businessId={businessId} />
      <StoreFormViewport />
    </PageContainer>
  );
}
