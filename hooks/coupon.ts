import { COUPON_KEY } from "@/data/cacheKeys";
import { Coupon, couponService } from "@/entities/coupons";
import { SWRInfiniteConfig } from "@/lib/apiClient";
import { CouponData } from "@/schema/coupon";
import { getCursorKey, getScopedKey } from "@/utilities/computeKey";
import { useSWRConfig } from "swr";
import useSWRInfinite, { unstable_serialize } from "swr/infinite";
import useSWRMutation from "swr/mutation";

export const useCoupons = (
  organizationId: string | undefined,
  config?: SWRInfiniteConfig<Coupon>,
) => {
  return useSWRInfinite(
    getCursorKey(COUPON_KEY, { organizationId }),
    ([key, query]) => couponService.getAll({ query, throw: true }),
    config,
  );
};

export const useAddCoupon = (organizationId: string | undefined) => {
  const { mutate } = useSWRConfig();

  return useSWRMutation(
    getScopedKey(COUPON_KEY, organizationId),
    (key, { arg }: { arg: CouponData }) =>
      couponService.post({ body: arg, throw: true }),
    {
      onSuccess: () =>
        mutate(
          unstable_serialize(getCursorKey(COUPON_KEY, { organizationId })),
        ),
    },
  );
};

export const useRemoveCoupon = (organizationId: string | undefined) => {
  const { mutate } = useSWRConfig();

  return useSWRMutation(
    getScopedKey(COUPON_KEY, organizationId),
    (key, { arg }: { arg: string }) =>
      couponService.delete(arg, { throw: true }),
    {
      onSuccess: () =>
        mutate(
          unstable_serialize(getCursorKey(COUPON_KEY, { organizationId })),
        ),
    },
  );
};
