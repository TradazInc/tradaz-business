import { BusinessForm } from "@/components/custom/dashboard/BusinessForm";
import { DialogBox } from "@/components/custom/DialogBox";
import EmptyPage from "@/components/custom/EmptyPage";
import GridCard from "@/components/custom/GridCard";
import GridContainer from "@/components/custom/GridContainer";
import { PageContainer } from "@/components/custom/PageContainer";
import PageHeader from "@/components/custom/PageHeader";
import Search from "@/components/custom/Search";
import ToolBarContainer from "@/components/custom/ToolBarContainer";
import { getBusinesses } from "@/server/services/business";
import { Button, For, VStack } from "@chakra-ui/react";
import { Suspense } from "react";
import { LuPlus } from "react-icons/lu";

interface Props {
  searchParams: Promise<{ business: string; signup: string }>;
}

export default async function page({ searchParams }: Props) {
  const { business, signup } = await searchParams;
  const { data: businesses, error } = await getBusinesses(business);

  if (error) return null;

  return (
    <PageContainer>
      <VStack w={"full"} h={"full"}>
        <PageHeader>Your Brands</PageHeader>

        <ToolBarContainer>
          <Suspense>
            <Search placeholder={"Search for a brand"} query={"business"} />
          </Suspense>
          <DialogBox
            trigger={
              <Button variant={"outline"} size={"xs"}>
                <LuPlus />
                New Brand
              </Button>
            }
            signup={signup}
          >
            <BusinessForm />
          </DialogBox>
        </ToolBarContainer>

        {businesses?.length ? (
          <GridContainer>
            <For each={businesses}>
              {(business) => (
                <GridCard
                  key={business.id}
                  name={business.name}
                  logo={business.logo}
                  address={JSON.parse(business.metadata)?.address}
                  createdAt={new Date(business.createdAt).toDateString()}
                  href={`/dashboard/business/${business.id}`}
                />
              )}
            </For>
          </GridContainer>
        ) : (
          <EmptyPage
            title="No businesses found"
            description="Create a new business"
          >
            <DialogBox
              trigger={
                <Button>
                  <LuPlus />
                  New Brand
                </Button>
              }
              signup={signup}
            >
              <BusinessForm />
            </DialogBox>
          </EmptyPage>
        )}
      </VStack>
    </PageContainer>
  );
}
