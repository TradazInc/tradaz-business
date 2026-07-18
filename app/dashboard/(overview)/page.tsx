import { BusinessForm } from "@/app/ui/dashboard/BusinessForm";
import { DialogBox } from "@/app/ui/DialogBox";
import EmptyPage from "@/app/ui/EmptyPage";
import GridCard from "@/app/ui/GridCard";
import GridContainer from "@/app/ui/GridContainer";
import { PageContainer } from "@/app/ui/PageContainer";
import PageHeader from "@/app/ui/PageHeader";
import Search from "@/app/ui/Search";
import ToolBarContainer from "@/app/ui/ToolBarContainer";
import { getBusinesses } from "@/server/business";
import { Button, For, VStack } from "@chakra-ui/react";
import { Suspense } from "react";
import { LuPlus } from "react-icons/lu";

interface Props {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function page({ searchParams }: Props) {
  const name = (await searchParams).business as string;
  const signup = (await searchParams).signup as string;

  const { data: businesses, error } = await getBusinesses(name); // deduplicated (fetched in layout)

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
