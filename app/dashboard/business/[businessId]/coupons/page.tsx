import {
  CouponForm,
  CouponFormViewport,
} from "@/components/business/CouponForm";
import CouponTable from "@/components/business/CouponTable";
import EmptyPage from "@/components/shared/EmptyPage";
import { PageContainer } from "@/components/shared/PageContainer";
import PageHeader from "@/components/shared/PageHeader";
import { getCoupons } from "@/server/coupon";
import { HStack, Spacer, VStack } from "@chakra-ui/react";

interface Props {
  params: Promise<{ businessId?: string }>;
}

export default async function page({ params }: Props) {
  const { businessId } = await params;
  const { data: coupons, error } = await getCoupons(businessId);

  if (error) return error.message;

  return (
    <PageContainer>
      <VStack w={"full"} h={"full"}>
        <PageHeader>Coupons</PageHeader>

        <HStack w={"full"}>
          <Spacer />
          <CouponForm />
        </HStack>

        {coupons.data.length > 0 ? (
          <CouponTable initialCoupons={coupons} businessId={businessId} />
        ) : (
          <EmptyPage
            title="No coupons found"
            description="Create a new coupon"
          />
        )}
      </VStack>
      <CouponFormViewport />
    </PageContainer>
  );
}
