import { ORDER_KEY } from "@/data/cacheKeys";
import { apiClient, apiConfig } from "@/lib/apiClient";
import {
  GetAllOrderOutputData,
  GetAllOrderQuerySchema,
  UpdateOrderStatusInputData,
} from "@/schema/order";
import { cache } from "@/utilities/cacheKey";
import { scopeHeaders } from "@/utilities/scopeHeaders";
import useSWR, { useSWRConfig } from "swr";
import useSWRInfinite, {
  SWRInfiniteConfiguration,
  unstable_serialize,
} from "swr/infinite";
import useSWRMutation from "swr/mutation";
import { useSearchQuery } from "./searchQuery";

export const useOrders = (
  organizationId: string | undefined,
  teamId?: string | undefined,
  config?: SWRInfiniteConfiguration<GetAllOrderOutputData, Error>,
) => {
  const query = useSearchQuery(GetAllOrderQuerySchema);

  return useSWRInfinite(
    cache.cursorKey(ORDER_KEY, { ...query, organizationId, teamId }),
    ([key, query]) =>
      apiClient("@get/api/orders", {
        query,
        headers: scopeHeaders(organizationId, teamId),
        ...apiConfig,
      }),
    config,
  );
};

export const useOrder = (id: string, organizationId: string | undefined) => {
  return useSWR(cache.scopedKey(ORDER_KEY, id), ([key, id]) =>
    apiClient("@get/api/orders/:id", {
      params: { id },
      headers: scopeHeaders(organizationId),
      ...apiConfig,
    }),
  );
};

export const useUpdateOrderStatus = (organizationId: string | undefined) => {
  const { mutate } = useSWRConfig();

  return useSWRMutation(
    unstable_serialize(cache.cursorKey(ORDER_KEY, { organizationId })),
    (key, { arg }: { arg: { id: string; data: UpdateOrderStatusInputData } }) =>
      apiClient("@patch/api/orders/:id/status", {
        params: { id: arg.id },
        body: arg.data,
        headers: scopeHeaders(organizationId),
        ...apiConfig,
      }),
    {
      onSuccess: (data) => mutate(cache.scopedKey(ORDER_KEY, data.id)),
    },
  );
};
