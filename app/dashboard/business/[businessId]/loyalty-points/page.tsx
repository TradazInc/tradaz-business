import {
  PointsConfigForm,
  PointsConfigFormViewport,
} from "@/components/business/PointsConfigForm";
import PointsConfigTable from "@/components/business/PointsConfigTable";
import EmptyPage from "@/components/shared/EmptyPage";
import { PageContainer } from "@/components/shared/PageContainer";
import PageHeader from "@/components/shared/PageHeader";
import { getPointsConfigs } from "@/server/pointsConfig";
import { HStack, Spacer, VStack } from "@chakra-ui/react";

interface Props {
  params: Promise<{ businessId?: string }>;
}

export default async function page({ params }: Props) {
  const { businessId } = await params;
  const { data: pointsConfigs, error } = await getPointsConfigs();

  if (error) return error.message;

  return (
    <PageContainer>
      <VStack w={"full"} h={"full"}>
        <PageHeader>Loyalty Points</PageHeader>

        <HStack w={"full"}>
          <Spacer />
          <PointsConfigForm />
        </HStack>

        {pointsConfigs.data.length > 0 ? (
          <PointsConfigTable
            initialPointsConfigs={pointsConfigs}
            businessId={businessId}
          />
        ) : (
          <EmptyPage
            title="No loyalty points configs found"
            description="Create a loyalty points config"
          />
        )}
      </VStack>
      <PointsConfigFormViewport />
    </PageContainer>
  );
}
