import { PageContainer } from "@/components/shared/PageContainer";
import { RevenueStat } from "@/components/shared/RevenueStat";
import { SalesStat } from "@/components/shared/SalesStat";
import StoreName from "@/components/shared/StoreName";
import { VisitorsStat } from "@/components/shared/VisitorsStat";
import { HStack } from "@chakra-ui/react";

interface Props {
  params: Promise<{ businessId: string; storeId: string }>;
}

const page = async ({ params }: Props) => {
  const { storeId, businessId } = await params;

  return (
    <PageContainer>
      <StoreName businessId={businessId} storeId={storeId} />

      <HStack>
        <VisitorsStat />
        <SalesStat />
        <RevenueStat />
      </HStack>
    </PageContainer>
  );
};

export default page;
