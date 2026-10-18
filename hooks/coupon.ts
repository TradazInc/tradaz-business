import { COUPON_KEY } from "@/data/cacheKeys";
import { apiClient, apiConfig } from "@/lib/apiClient";
import { scopeHeaders } from "@/utilities/scopeHeaders";
import {
  CreateCouponInputData,
  GetAllCouponOutputData,
  GetAllCouponQuerySchema,
  UpdateCouponInputData,
} from "@/schema/coupon";
import { cache } from "@/utilities/cacheKey";
import { useSWRConfig } from "swr";
import useSWRInfinite, {
  SWRInfiniteConfiguration,
  unstable_serialize,
} from "swr/infinite";
import useSWRMutation from "swr/mutation";
import { useSearchQuery } from "./searchQuery";

export const useCoupons = (
  organizationId: string | undefined,
  config?: SWRInfiniteConfiguration<GetAllCouponOutputData, Error>,
) => {
  const query = useSearchQuery(GetAllCouponQuerySchema);

  return useSWRInfinite(
    cache.cursorKey(COUPON_KEY, { ...query, organizationId }),
    ([key, query]) =>
      apiClient("@get/api/coupons", {
        query,
        headers: scopeHeaders(organizationId),
        ...apiConfig,
      }),
    config,
  );
};

export const useAddCoupon = (organizationId: string | undefined) => {
  return useSWRMutation(
    unstable_serialize(cache.cursorKey(COUPON_KEY, { organizationId })),
    (key, { arg }: { arg: CreateCouponInputData }) =>
      apiClient("@post/api/coupons", {
        body: arg,
        headers: scopeHeaders(organizationId),
        ...apiConfig,
      }),
  );
};

export const useUpdateCoupon = (organizationId: string | undefined) => {
  const { mutate } = useSWRConfig();

  return useSWRMutation(
    unstable_serialize(cache.cursorKey(COUPON_KEY, { organizationId })),
    (key, { arg }: { arg: { id: string; data: UpdateCouponInputData } }) =>
      apiClient("@put/api/coupons/:id", {
        params: { id: arg.id },
        body: arg.data,
        headers: scopeHeaders(organizationId),
        ...apiConfig,
      }),
    {
      onSuccess: (data) => mutate(cache.scopedKey(COUPON_KEY, data.id)),
    },
  );
};

export const useRemoveCoupon = (organizationId: string | undefined) => {
  return useSWRMutation(
    unstable_serialize(cache.cursorKey(COUPON_KEY, { organizationId })),
    (key, { arg }: { arg: string }) =>
      apiClient("@delete/api/coupons/:id", {
        params: { id: arg },
        headers: scopeHeaders(organizationId),
        ...apiConfig,
      }),
  );
};
