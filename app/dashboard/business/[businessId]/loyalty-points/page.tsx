import PointsConfigForm from "@/components/custom/business/PointsConfigForm";
import PointsConfigTable from "@/components/custom/business/PointsConfigTable";
import { DialogBox } from "@/components/custom/shared/DialogBox";
import EmptyPage from "@/components/custom/shared/EmptyPage";
import { PageContainer } from "@/components/custom/shared/PageContainer";
import PageHeader from "@/components/custom/shared/PageHeader";
import { getPointsConfigs } from "@/server/pointsConfig";
import { Button, HStack, Spacer, VStack } from "@chakra-ui/react";
import { LuPlus } from "react-icons/lu";

interface Props {
  params: Promise<{ businessId?: string }>;
}

export default async function page({ params }: Props) {
  const { businessId } = await params;
  const { data: pointsConfigs, error } = await getPointsConfigs(businessId);

  if (error) return error.message;

  return (
    <PageContainer>
      <VStack w={"full"} h={"full"}>
        <PageHeader>Loyalty Points</PageHeader>

        <HStack w={"full"}>
          <Spacer />
          <DialogBox
            trigger={
              <Button variant={"outline"} size={"xs"}>
                <LuPlus />
                New Configs
              </Button>
            }
          >
            <PointsConfigForm />
          </DialogBox>
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
          >
            <DialogBox
              trigger={
                <Button>
                  <LuPlus />
                  New Configs
                </Button>
              }
            >
              <PointsConfigForm />
            </DialogBox>
          </EmptyPage>
        )}
      </VStack>
    </PageContainer>
  );
}
