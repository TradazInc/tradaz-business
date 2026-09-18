import { REVENUE_KEY } from "@/data/cacheKeys";
import { apiClient, apiConfig } from "@/lib/apiClient";
import {
  CreateRevenueInputData,
  GetAllRevenueOutputData,
  GetAllRevenueQuerySchema,
  UpdateRevenueInputData,
} from "@/schema/revenue";
import { getCursorKey, getScopedKey } from "@/utilities/computeKey";
import { useSWRConfig } from "swr";
import useSWRInfinite, {
  SWRInfiniteConfiguration,
  unstable_serialize,
} from "swr/infinite";
import useSWRMutation from "swr/mutation";
import { useSearchQuery } from "./useSearchQuery";

export const useRevenues = (
  organizationId: string | undefined,
  config?: SWRInfiniteConfiguration<GetAllRevenueOutputData, Error>,
) => {
  const query = useSearchQuery(GetAllRevenueQuerySchema);

  return useSWRInfinite(
    getCursorKey(REVENUE_KEY, { ...query, organizationId }),
    ([key, query]) => apiClient("@get/api/revenue", { query, ...apiConfig }),
    config,
  );
};

export const useAddRevenue = (organizationId: string | undefined) => {
  return useSWRMutation(
    unstable_serialize(getCursorKey(REVENUE_KEY, { organizationId })),
    (key, { arg }: { arg: CreateRevenueInputData }) =>
      apiClient("@post/api/revenue", { body: arg, ...apiConfig }),
  );
};

export const useUpdateRevenue = (organizationId: string | undefined) => {
  const { mutate } = useSWRConfig();

  return useSWRMutation(
    unstable_serialize(getCursorKey(REVENUE_KEY, { organizationId })),
    (key, { arg }: { arg: { id: string; data: UpdateRevenueInputData } }) =>
      apiClient("@put/api/revenue/:id", {
        params: { id: arg.id },
        body: arg.data,
        ...apiConfig,
      }),
    {
      onSuccess: (data) => mutate(getScopedKey(REVENUE_KEY, data.id)),
    },
  );
};

export const useRemoveRevenue = (organizationId: string | undefined) => {
  return useSWRMutation(
    unstable_serialize(getCursorKey(REVENUE_KEY, { organizationId })),
    (key, { arg }: { arg: string }) =>
      apiClient("@delete/api/revenue/:id", {
        params: { id: arg },
        ...apiConfig,
      }),
  );
};
