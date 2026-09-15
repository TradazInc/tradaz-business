import { REVENUE_KEY } from "@/data/cacheKeys";
import { apiClient, apiConfig } from "@/lib/apiClient";
import {
  CreateRevenueInputData,
  GetAllRevenueOutputData,
  GetAllRevenueQuerySchema,
  UpdateRevenueInputData,
} from "@/schema/revenue";
import { getCursorKey, getScopedKey } from "@/utilities/computeKey";
import { useSearchParams } from "next/navigation";
import { useSWRConfig } from "swr";
import useSWRInfinite, {
  SWRInfiniteConfiguration,
  unstable_serialize,
} from "swr/infinite";
import useSWRMutation from "swr/mutation";

export const useRevenues = (
  organizationId: string | undefined,
  config?: SWRInfiniteConfiguration<GetAllRevenueOutputData, Error>,
) => {
  const searchParams = useSearchParams();
  const query = {
    organizationId,
    ...GetAllRevenueQuerySchema.parse(searchParams),
  };

  return useSWRInfinite(
    getCursorKey(REVENUE_KEY, query),
    ([key, query]) => apiClient("@get/api/revenue", { query, ...apiConfig }),
    config,
  );
};

export const useAddRevenue = (organizationId: string | undefined) => {
  const { mutate } = useSWRConfig();

  return useSWRMutation(
    getScopedKey(REVENUE_KEY, organizationId),
    (key, { arg }: { arg: CreateRevenueInputData }) =>
      apiClient("@post/api/revenue", { body: arg, ...apiConfig }),
    {
      onSuccess: () =>
        mutate(
          unstable_serialize(getCursorKey(REVENUE_KEY, { organizationId })),
        ),
    },
  );
};

export const useUpdateRevenue = (
  id: string,
  organizationId: string | undefined,
) => {
  const { mutate } = useSWRConfig();

  return useSWRMutation(
    getScopedKey(REVENUE_KEY, organizationId),
    (key, { arg }: { arg: UpdateRevenueInputData }) =>
      apiClient("@put/api/revenue/:id", {
        params: { id },
        body: arg,
        ...apiConfig,
      }),
    {
      onSuccess: () =>
        mutate(
          unstable_serialize(getCursorKey(REVENUE_KEY, { organizationId })),
        ),
    },
  );
};

export const useRemoveRevenue = (organizationId: string | undefined) => {
  const { mutate } = useSWRConfig();

  return useSWRMutation(
    getScopedKey(REVENUE_KEY, organizationId),
    (key, { arg }: { arg: string }) =>
      apiClient("@delete/api/revenue/:id", {
        params: { id: arg },
        ...apiConfig,
      }),
    {
      onSuccess: () =>
        mutate(
          unstable_serialize(getCursorKey(REVENUE_KEY, { organizationId })),
        ),
    },
  );
};
