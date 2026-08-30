import CouponForm from "@/components/custom/business/CouponForm";
import CouponTable from "@/components/custom/business/CouponTable";
import { DialogBox } from "@/components/custom/shared/DialogBox";
import EmptyPage from "@/components/custom/shared/EmptyPage";
import { PageContainer } from "@/components/custom/shared/PageContainer";
import PageHeader from "@/components/custom/shared/PageHeader";
import { getCoupons } from "@/server/coupon";
import { Button, HStack, Spacer, VStack } from "@chakra-ui/react";
import { LuPlus } from "react-icons/lu";

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
            <CouponForm />
          </DialogBox>
        </HStack>

        {coupons.data.length > 0 ? (
          <CouponTable initialCoupons={coupons} businessId={businessId} />
        ) : (
          <EmptyPage title="No coupons found" description="Create a new coupon">
            <DialogBox
              trigger={
                <Button>
                  <LuPlus />
                  New Coupon
                </Button>
              }
            >
              <CouponForm />
            </DialogBox>
          </EmptyPage>
        )}
      </VStack>
    </PageContainer>
  );
}
