import { StoreForm } from "@/components/custom/business/StoreForm";
import StoreGrid from "@/components/custom/business/StoreGrid";
import { DialogBox } from "@/components/custom/shared/DialogBox";
import EmptyPage from "@/components/custom/shared/EmptyPage";
import { PageContainer } from "@/components/custom/shared/PageContainer";
import PageHeader from "@/components/custom/shared/PageHeader";
import Search from "@/components/custom/shared/Search";
import ToolBarContainer from "@/components/custom/shared/ToolBarContainer";
import { getBusiness } from "@/server/services/business";
import { Button, VStack } from "@chakra-ui/react";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { LuPlus } from "react-icons/lu";

interface Props {
  params: Promise<{ businessId: string }>;
}

export default async function page({ params }: Props) {
  const { businessId } = await params;
  const { data, error } = await getBusiness(businessId);

  if (error) notFound();

  return (
    <PageContainer>
      <VStack w={"full"} h={"full"}>
        <PageHeader>{`${data?.name} Stores`}</PageHeader>

        <ToolBarContainer>
          <Suspense>
            <Search placeholder={"Search for a store"} query={"store"} />
          </Suspense>
          <DialogBox
            trigger={
              <Button variant={"outline"} size={"xs"}>
                <LuPlus />
                New Store
              </Button>
            }
          >
            <StoreForm />
          </DialogBox>
        </ToolBarContainer>

        {data?.teams.length ? (
          <StoreGrid initialStores={data.teams} businessId={businessId} />
        ) : (
          <EmptyPage
            title={"No stores found"}
            description={"Create a new store for your brand"}
          >
            <DialogBox
              trigger={
                <Button>
                  <LuPlus />
                  New Store
                </Button>
              }
            >
              <StoreForm />
            </DialogBox>
          </EmptyPage>
        )}
      </VStack>
    </PageContainer>
  );
}
