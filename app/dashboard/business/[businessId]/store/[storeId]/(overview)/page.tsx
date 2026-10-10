import { PageContainer } from "@/components/shared/PageContainer";
import PageHeader from "@/components/shared/PageHeader";
import { RevenueStat } from "@/components/shared/RevenueStat";
import { SalesStat } from "@/components/shared/SalesStat";
import StatContainer from "@/components/shared/StatContainer";
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
      <PageHeader>
        <StoreName businessId={businessId} storeId={storeId} />
      </PageHeader>

      <StatContainer>
        <VisitorsStat />
        <SalesStat />
        <RevenueStat />
      </StatContainer>
    </PageContainer>
  );
};

export default page;
