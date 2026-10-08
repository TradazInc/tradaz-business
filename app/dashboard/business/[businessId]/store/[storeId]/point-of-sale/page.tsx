import { PageContainer } from "@/components/shared/PageContainer";
import PageHeader from "@/components/shared/PageHeader";
import Search from "@/components/shared/Search";
import { PosConfigForm, PosConfigFormViewport } from "@/components/store/PosConfigForm";
import PosConfigTable from "@/components/store/PosConfigTable";
import { getPosConfigs } from "@/server/posConfig";
import { HStack, Spacer, VStack } from "@chakra-ui/react";
import { Suspense } from "react";

interface Props {
  params: Promise<{ businessId?: string; storeId?: string }>;
}

export default async function page({ params }: Props) {
  const { businessId, storeId } = await params;
  const posConfigs = getPosConfigs(businessId, storeId).then((d) => [d]);

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
          <PosConfigForm />
        </HStack>

        <PosConfigTable
          initialPosConfigs={posConfigs}
          businessId={businessId}
        />
      </VStack>
      <PosConfigFormViewport />
    </PageContainer>
  );
}
