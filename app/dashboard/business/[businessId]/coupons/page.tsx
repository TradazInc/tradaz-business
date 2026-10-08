import { CouponForm, CouponFormViewport } from "@/components/shared/CouponForm";
import CouponTable from "@/components/shared/CouponTable";
import { PageContainer } from "@/components/shared/PageContainer";
import PageHeader from "@/components/shared/PageHeader";
import { getCoupons } from "@/server/coupon";
import { HStack, Spacer, VStack } from "@chakra-ui/react";

interface Props {
  params: Promise<{ businessId?: string }>;
}

export default async function page({ params }: Props) {
  const { businessId } = await params;
  const coupons = getCoupons(businessId).then((d) => [d]);

  return (
    <PageContainer>
      <VStack w={"full"} h={"full"}>
        <PageHeader>Coupons</PageHeader>

        <HStack w={"full"}>
          <Spacer />
          <CouponForm />
        </HStack>

        <CouponTable initialCoupons={coupons} businessId={businessId} />
      </VStack>
      <CouponFormViewport />
    </PageContainer>
  );
}
