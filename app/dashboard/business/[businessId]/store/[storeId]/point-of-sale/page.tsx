import { PageContainer } from "@/components/shared/PageContainer";
import PageHeader from "@/components/shared/PageHeader";
import {
  PosConfigForm,
  PosConfigFormViewport,
} from "@/components/shared/PosConfigForm";
import PosConfigTable from "@/components/shared/PosConfigTable";
import Search from "@/components/shared/Search";
import { getPosConfigs } from "@/server/posConfig";
import { HStack, Spacer } from "@chakra-ui/react";
import { Suspense } from "react";

interface Props {
  params: Promise<{ businessId?: string; storeId?: string }>;
}

export default async function page({ params }: Props) {
  const { businessId, storeId } = await params;
  const posConfigs = getPosConfigs(businessId, storeId).then((d) => [d]);

  return (
    <PageContainer>
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

      <PosConfigTable initialPosConfigs={posConfigs} businessId={businessId} />
      <PosConfigFormViewport />
    </PageContainer>
  );
}
