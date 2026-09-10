import { COUPON_KEY } from "@/data/cacheKeys";
import { apiClient } from "@/lib/fetchClient";
import { CreateCouponInputData, GetAllCouponOutputData } from "@/schema/coupon";
import { getCursorKey, getScopedKey } from "@/utilities/computeKey";
import { searchQuery } from "@/utilities/searchQuery";
import { useSearchParams } from "next/navigation";
import { useSWRConfig } from "swr";
import useSWRInfinite, {
  SWRInfiniteConfiguration,
  unstable_serialize,
} from "swr/infinite";
import useSWRMutation from "swr/mutation";

export const useCoupons = (
  organizationId: string | undefined,
  config?: SWRInfiniteConfiguration<GetAllCouponOutputData, Error>,
) => {
  const searchParams = useSearchParams();
  const query = { organizationId, ...searchQuery(searchParams) };

  return useSWRInfinite(
    getCursorKey(COUPON_KEY, query),
    ([key, query]) => apiClient("@get/api/coupons", { query }),
    config,
  );
};

export const useAddCoupon = (organizationId: string | undefined) => {
  const { mutate } = useSWRConfig();

  return useSWRMutation(
    getScopedKey(COUPON_KEY, organizationId),
    (key, { arg }: { arg: CreateCouponInputData }) =>
      apiClient("@post/api/coupons", { body: arg }),
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
      apiClient("@delete/api/coupons", { params: { id: arg } }),
    {
      onSuccess: () =>
        mutate(
          unstable_serialize(getCursorKey(COUPON_KEY, { organizationId })),
        ),
    },
  );
};
