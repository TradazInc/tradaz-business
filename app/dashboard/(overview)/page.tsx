import {
  BusinessForm,
  BusinessFormViewport,
} from "@/components/shared/BusinessForm";
import BusinessGrid from "@/components/shared/BusinessGrid";
import { PageContainer } from "@/components/shared/PageContainer";
import PageHeader from "@/components/shared/PageHeader";
import { RevenueStat } from "@/components/shared/RevenueStat";
import { SalesStat } from "@/components/shared/SalesStat";
import { VisitorsStat } from "@/components/shared/VisitorsStat";
import { getBusinesses } from "@/server/business";
import { HStack, Spacer } from "@chakra-ui/react";

interface Props {
  searchParams: Promise<{ signup?: string }>;
}

export default async function page({ searchParams }: Props) {
  const { signup } = await searchParams;
  const businesses = getBusinesses();

  return (
    <PageContainer>
      <PageHeader>Your Brands</PageHeader>

      <HStack w={"full"}>
        <Spacer />
        <BusinessForm signup={signup} />
      </HStack>

      <HStack>
        <VisitorsStat />
        <SalesStat />
        <RevenueStat />
      </HStack>

      <BusinessGrid initialBusinesses={businesses} />
      <BusinessFormViewport />
    </PageContainer>
  );
}
