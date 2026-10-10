import {
  BusinessForm,
  BusinessFormViewport,
} from "@/components/shared/BusinessForm";
import BusinessGrid from "@/components/shared/BusinessGrid";
import { PageContainer } from "@/components/shared/PageContainer";
import PageHeader from "@/components/shared/PageHeader";
import { PageItemContainer } from "@/components/shared/PageItemContainer";
import { RevenueStat } from "@/components/shared/RevenueStat";
import { SalesStat } from "@/components/shared/SalesStat";
import { VisitorsStat } from "@/components/shared/VisitorsStat";
import { getBusinesses } from "@/server/business";
import { Spacer } from "@chakra-ui/react";

interface Props {
  searchParams: Promise<{ signup?: string }>;
}

export default async function page({ searchParams }: Props) {
  const { signup } = await searchParams;
  const businesses = getBusinesses();

  return (
    <PageContainer>
      <PageHeader>Your Brands</PageHeader>

      <PageItemContainer>
        <Spacer />
        <BusinessForm signup={signup} />
      </PageItemContainer>

      <PageItemContainer my={2}>
        <VisitorsStat />
        <SalesStat />
        <RevenueStat />
      </PageItemContainer>

      <BusinessGrid initialBusinesses={businesses} />
      <BusinessFormViewport />
    </PageContainer>
  );
}
