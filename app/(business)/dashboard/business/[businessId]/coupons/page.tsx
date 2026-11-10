import { CouponForm, CouponFormViewport } from "@/components/shared/CouponForm";
import CouponTable from "@/components/shared/CouponTable";
import { PageContainer } from "@/components/shared/PageContainer";
import PageHeader from "@/components/shared/PageHeader";
import { PageItemContainer } from "@/components/shared/PageItemContainer";
import Search from "@/components/shared/Search";
import { getCoupons } from "@/server/coupon";
import { Spacer } from "@chakra-ui/react";
import { Suspense } from "react";

interface Props {
  params: Promise<{ businessId?: string }>;
}

export default async function page({ params }: Props) {
  const { businessId } = await params;
  const coupons = getCoupons(businessId).then((d) => [d]);

  return (
    <PageContainer>
      <PageHeader>Coupons</PageHeader>

      <PageItemContainer>
        <Suspense>
          <Search
            placeholder={"Search for a coupon"}
            searchField={"search"}
          />
        </Suspense>
        <Spacer />
        <CouponForm />
      </PageItemContainer>

      <CouponTable initialCoupons={coupons} businessId={businessId} />
      <CouponFormViewport />
    </PageContainer>
  );
}
