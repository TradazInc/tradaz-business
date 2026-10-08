import {
  BusinessForm,
  BusinessFormViewport,
} from "@/components/dashboard/BusinessForm";
import BusinessGrid from "@/components/dashboard/BusinessGrid";
import EmptyPage from "@/components/shared/EmptyPage";
import { PageContainer } from "@/components/shared/PageContainer";
import PageHeader from "@/components/shared/PageHeader";
import Search from "@/components/shared/Search";
import { getBusinesses } from "@/server/business";
import { HStack, Spacer, VStack } from "@chakra-ui/react";
import { Suspense } from "react";

interface Props {
  searchParams: Promise<{ signup?: string }>;
}

export default async function page({ searchParams }: Props) {
  const { signup } = await searchParams;
  const { data: businesses, error } = await getBusinesses();

  if (error) return error.message;

  return (
    <PageContainer>
      <VStack w={"full"} h={"full"}>
        <PageHeader>Your Brands</PageHeader>

        <HStack w={"full"}>
          <Suspense>
            <Search placeholder={"Search for a brand"} searchField={"search"} />
          </Suspense>
          <Spacer />
          <BusinessForm />
        </HStack>

        {businesses.length > 0 ? (
          <BusinessGrid initialBusinesses={businesses} />
        ) : (
          <EmptyPage
            title={"No businesses found"}
            description={"Create a new business"}
          >
            <BusinessForm signup={signup} />
          </EmptyPage>
        )}
      </VStack>
      <BusinessFormViewport />
    </PageContainer>
  );
}
