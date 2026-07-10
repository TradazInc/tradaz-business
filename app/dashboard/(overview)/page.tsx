import { BusinessForm } from "@/app/ui/business/BusinessForm";
import GridCard from "@/app/ui/dashboard/GridCard";
import GridContainer from "@/app/ui/dashboard/GridContainer";
import { DialogBox } from "@/app/ui/DialogBox";
import EmptyPage from "@/app/ui/EmptyPage";
import { PageContainer } from "@/app/ui/PageContainer";
import PageHeader from "@/app/ui/PageHeader";
import Search from "@/app/ui/Search";
import ToolBarContainer from "@/app/ui/ToolBarContainer";
import { getBusinesses } from "@/server/business";
import { For, VStack } from "@chakra-ui/react";
import { Suspense } from "react";
import { LuPlus } from "react-icons/lu";

interface Props {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function page({ searchParams }: Props) {
  const name = (await searchParams).business as string;
  const { data: businesses, error } = await getBusinesses(name); // deduplicated (fetched in layout)

  if (error) return null;

  return (
    <PageContainer>
      <VStack w={"full"} h={"full"}>
        <PageHeader>Your Businesses</PageHeader>
        <DashboardToolbar />
        {businesses?.length ? (
          <GridContainer>
            <For each={businesses}>
              {(business) => (
                <GridCard
                  key={business.id}
                  name={business.name}
                  address={business.metadata.address}
                  logo={business.logo}
                  createdAt={new Date(business.createdAt).toDateString()}
                  description={business.metadata.description}
                  href={`/dashboard/business/${business.id}`}
                />
              )}
            </For>
          </GridContainer>
        ) : (
          <EmptyPage
            title="No businesses found"
            description="Create a new business"
          />
        )}
      </VStack>
    </PageContainer>
  );
}

const DashboardToolbar = () => {
  return (
    <ToolBarContainer>
      <Suspense>
        <Search placeholder={"Search for a business"} query={"business"} />
      </Suspense>
      <DialogBox prompt={"New Business"} icon={LuPlus}>
        <BusinessForm />
      </DialogBox>
    </ToolBarContainer>
  );
};
