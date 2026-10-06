import { DialogBox } from "@/components/shared/DialogBox";
import EmptyPage from "@/components/shared/EmptyPage";
import { PageContainer } from "@/components/shared/PageContainer";
import PageHeader from "@/components/shared/PageHeader";
import Search from "@/components/shared/Search";
import PosConfigForm from "@/components/store/PosConfigForm";
import PosConfigTable from "@/components/store/PosConfigTable";
import { getPosConfigs } from "@/server/posConfig";
import { Button, HStack, Spacer, VStack } from "@chakra-ui/react";
import { Suspense } from "react";
import { LuPlus } from "react-icons/lu";

interface Props {
  params: Promise<{ businessId?: string; storeId?: string }>;
}

export default async function page({ params }: Props) {
  const { businessId, storeId } = await params;
  const { data: posConfigs, error } = await getPosConfigs(businessId, storeId);

  if (error) return error?.message;

  return (
    <PageContainer>
      <VStack w={"full"} h={"full"}>
        <PageHeader>POS Configurations</PageHeader>

        <HStack w={"full"}>
          <Suspense>
            <Search
              placeholder={"Search for a configuration"}
              searchField={"search"}
            />
          </Suspense>
          <Spacer />
          <DialogBox
            trigger={
              <Button variant={"outline"} size={"xs"}>
                <LuPlus />
                Add POS config
              </Button>
            }
          >
            <PosConfigForm />
          </DialogBox>
        </HStack>

        {posConfigs && posConfigs.data.length > 0 ? (
          <PosConfigTable
            initialPosConfigs={posConfigs}
            businessId={businessId}
          />
        ) : (
          <EmptyPage
            title="No configurations found"
            description="Create a POS configuration"
          >
            <DialogBox
              trigger={
                <Button>
                  <LuPlus />
                  New POS config
                </Button>
              }
            >
              <PosConfigForm />
            </DialogBox>
          </EmptyPage>
        )}
      </VStack>
    </PageContainer>
  );
}
