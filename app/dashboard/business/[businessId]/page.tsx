import GridCard from "@/app/ui/dashboard/GridCard";
import GridContainer from "@/app/ui/dashboard/GridContainer";
import { DialogBox } from "@/app/ui/DialogBox";
import EmptyPage from "@/app/ui/EmptyPage";
import { PageContainer } from "@/app/ui/PageContainer";
import PageHeader from "@/app/ui/PageHeader";
import Search from "@/app/ui/Search";
import { StoreForm } from "@/app/ui/business/StoreForm";
import ToolBarContainer from "@/app/ui/ToolBarContainer";
import { getBusiness } from "@/server/business";
import { For, VStack } from "@chakra-ui/react";
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

        <ToolBarContainer>
          <Suspense>
            <Search placeholder={"Search for a store"} query={"store"} />
          </Suspense>
          <DialogBox prompt={"New Store"} icon={<LuPlus />}>
            <StoreForm />
          </DialogBox>
        </ToolBarContainer>

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
            description="Create a new store for your brand"
          />
        )}
      </VStack>
    </PageContainer>
  );
}
