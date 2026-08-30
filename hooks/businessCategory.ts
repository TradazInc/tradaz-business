import { BUSINESS_CATEGORY_KEY } from "@/data/cacheKeys";
import {
  BusinessCategory,
  businessCategoryService,
} from "@/entities/businessCategory";
import { couponService } from "@/entities/coupons";
import { SWRInfiniteConfig } from "@/lib/apiClient";
import { CouponData } from "@/schema/coupon";
import { getCursorKey, getKey } from "@/utilities/computeKey";
import { useSWRConfig } from "swr";
import useSWRInfinite, { unstable_serialize } from "swr/infinite";
import useSWRMutation from "swr/mutation";

export const useBusinessCategories = (
  config?: SWRInfiniteConfig<BusinessCategory>,
) => {
  return useSWRInfinite(
    getCursorKey(BUSINESS_CATEGORY_KEY, {}),
    ([key, query]) => businessCategoryService.getAll({ query, throw: true }),
    config,
  );
};

export const useAddCoupon = () => {
  const { mutate } = useSWRConfig();

  return useSWRMutation(
    getKey(BUSINESS_CATEGORY_KEY),
    (key, { arg }: { arg: CouponData }) =>
      couponService.post({ body: arg, throw: true }),
    {
      onSuccess: () =>
        mutate(unstable_serialize(getCursorKey(BUSINESS_CATEGORY_KEY, {}))),
    },
  );
};

export const useRemoveCoupon = () => {
  const { mutate } = useSWRConfig();

  return useSWRMutation(
    getKey(BUSINESS_CATEGORY_KEY),
    (key, { arg }: { arg: string }) =>
      couponService.delete(arg, { throw: true }),
    {
      onSuccess: () =>
        mutate(unstable_serialize(getCursorKey(BUSINESS_CATEGORY_KEY, {}))),
    },
  );
};
