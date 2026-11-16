import { PageContainer } from "@/components/shared/PageContainer";
import PageHeader from "@/components/shared/PageHeader";
import { PageItemContainer } from "@/components/shared/PageItemContainer";
import { RevenueStat } from "@/components/shared/RevenueStat";
import { SalesStat } from "@/components/shared/SalesStat";
import { ShowMore } from "@/components/shared/ShowMore";
import StoreName from "@/components/shared/StoreName";
import { VisitorsStat } from "@/components/shared/VisitorsStat";

interface Props {
  params: Promise<{ businessId: string; storeId: string }>;
}

const page = async ({ params }: Props) => {
  const { storeId, businessId } = await params;

  return (
    <PageContainer>
      <PageHeader>
        <StoreName
          businessId={businessId}
          storeId={storeId}
          suffix={"Analytics"}
        />
      </PageHeader>

      <ShowMore
        initial={
          <PageItemContainer>
            <VisitorsStat />
            <SalesStat />
            <RevenueStat />
          </PageItemContainer>
        }
      >
        <PageItemContainer>
          <VisitorsStat />
          <SalesStat />
          <RevenueStat />
        </PageItemContainer>

        <PageItemContainer>
          <VisitorsStat />
          <SalesStat />
          <RevenueStat />
        </PageItemContainer>
      </ShowMore>
    </PageContainer>
  );
};

export default page;
