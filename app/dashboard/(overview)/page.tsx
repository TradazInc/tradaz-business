import {
  BusinessForm,
  BusinessFormViewport,
} from "@/components/shared/BusinessForm";
import BusinessGrid from "@/components/shared/BusinessGrid";
import { PageContainer } from "@/components/shared/PageContainer";
import PageHeader from "@/components/shared/PageHeader";
import { RevenueStat } from "@/components/shared/RevenueStat";
import { SalesStat } from "@/components/shared/SalesStat";
import Search from "@/components/shared/Search";
import { VisitorsStat } from "@/components/shared/VisitorsStat";
import { getBusinesses } from "@/server/business";
import { HStack, Spacer, VStack } from "@chakra-ui/react";
import { Suspense } from "react";

interface Props {
  searchParams: Promise<{ signup?: string }>;
}

export default async function page({ searchParams }: Props) {
  const { signup } = await searchParams;
  const businesses = getBusinesses();

  return (
    <PageContainer>
      <VStack w={"full"} h={"full"}>
        <PageHeader>Your Brands</PageHeader>

        <HStack w={"full"}>
          <Suspense>
            <Search placeholder={"Search for a brand"} searchField={"search"} />
          </Suspense>
          <Spacer />
          <BusinessForm signup={signup} />
        </HStack>

        <HStack>
          <VisitorsStat />
          <SalesStat />
          <RevenueStat />
        </HStack>

        <BusinessGrid initialBusinesses={businesses} />
      </VStack>
      <BusinessFormViewport />
    </PageContainer>
  );
}
