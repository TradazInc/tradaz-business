import { PointsConfigForm, PointsConfigFormViewport } from "@/components/shared/PointsConfigForm";
import PointsConfigTable from "@/components/shared/PointsConfigTable";
import { PageContainer } from "@/components/shared/PageContainer";
import PageHeader from "@/components/shared/PageHeader";
import { getPointsConfigs } from "@/server/pointsConfig";
import { HStack, Spacer, VStack } from "@chakra-ui/react";

interface Props {
  params: Promise<{ businessId?: string }>;
}

export default async function page({ params }: Props) {
  const { businessId } = await params;
  const pointsConfigs = getPointsConfigs().then((d) => [d]);

  return (
    <PageContainer>
      <VStack w={"full"} h={"full"}>
        <PageHeader>Loyalty Points</PageHeader>

        <HStack w={"full"}>
          <Spacer />
          <PointsConfigForm />
        </HStack>

        <PointsConfigTable
          initialPointsConfigs={pointsConfigs}
          businessId={businessId}
        />
      </VStack>
      <PointsConfigFormViewport />
    </PageContainer>
  );
}
