import { ORDER_KEY } from "@/data/cacheKeys";
import { apiClient, apiConfig } from "@/lib/apiClient";
import {
  GetAllOrderOutputData,
  GetAllOrderQuerySchema,
  UpdateOrderStatusInputData,
} from "@/schema/order";
import { getCursorKey, getScopedKey } from "@/utilities/computeKey";
import useSWR, { useSWRConfig } from "swr";
import useSWRInfinite, {
  SWRInfiniteConfiguration,
  unstable_serialize,
} from "swr/infinite";
import useSWRMutation from "swr/mutation";
import { useSearchQuery } from "./useSearchQuery";

export const useOrders = (
  organizationId: string | undefined,
  config?: SWRInfiniteConfiguration<GetAllOrderOutputData, Error>,
) => {
  const query = useSearchQuery(GetAllOrderQuerySchema);

  return useSWRInfinite(
    getCursorKey(ORDER_KEY, { ...query, organizationId }),
    ([key, query]) => apiClient("@get/api/orders", { query, ...apiConfig }),
    config,
  );
};

export const useOrder = (id: string) => {
  return useSWR(getScopedKey(ORDER_KEY, id), ([key, id]) =>
    apiClient("@get/api/orders/:id", { params: { id }, ...apiConfig }),
  );
};

export const useUpdateOrderStatus = (organizationId: string | undefined) => {
  const { mutate } = useSWRConfig();

  return useSWRMutation(
    unstable_serialize(getCursorKey(ORDER_KEY, { organizationId })),
    (key, { arg }: { arg: { id: string; data: UpdateOrderStatusInputData } }) =>
      apiClient("@patch/api/orders/:id/status", {
        params: { id: arg.id },
        body: arg.data,
        ...apiConfig,
      }),
    {
      onSuccess: (data) => mutate(getScopedKey(ORDER_KEY, data.id)),
    },
  );
};
