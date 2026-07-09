import GridCard from "@/app/ui/dashboard/GridCard";
import GridContainer from "@/app/ui/dashboard/GridContainer";
import EmptyPage from "@/app/ui/EmptyPage";
import { PageContainer } from "@/app/ui/PageContainer";
import PageHeader from "@/app/ui/PageHeader";
import Search from "@/app/ui/Search";
import ToolBarContainer from "@/app/ui/ToolBarContainer";
import { getBusiness } from "@/server/business";
import { Button, For, VStack } from "@chakra-ui/react";
import Link from "next/link";
import { Suspense } from "react";
import { LuPlus } from "react-icons/lu";

interface Props {
  params: Promise<{ businessId: string }>;
}

export default async function page({ params }: Props) {
  const { businessId } = await params;
  const { data, error } = await getBusiness(businessId);

  if (error) return null;

  return (
    <PageContainer>
      <VStack w={"full"} h={"full"}>
        <PageHeader>{`${data.name} Stores`}</PageHeader>
        <BusinessToolbar />
        {data.teams.length ? (
          <GridContainer>
            <For each={data.teams}>
              {(store) => (
                <GridCard
                  key={store.id}
                  name={store.name}
                  address={store.address}
                  createdAt={new Date(store.createdAt).toDateString()}
                  href={`/dashboard/store/${store.id}`}
                />
              )}
            </For>
          </GridContainer>
        ) : (
          <EmptyPage
            title="No stores found"
            description="Create a new store for your business"
          />
        )}
      </VStack>
    </PageContainer>
  );
}

const BusinessToolbar = () => {
  return (
    <ToolBarContainer>
      <Suspense>
        <Search placeholder="Search for a store" query="store" />
      </Suspense>
      <Button size={"xs"} asChild>
        <Link href={"/dashboard/store/new"}>
          <LuPlus />
          New Store
        </Link>
      </Button>
    </ToolBarContainer>
  );
};
