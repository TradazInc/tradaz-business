import { ORDER_KEY } from "@/data/cacheKeys";
import { apiClient, apiConfig } from "@/lib/apiClient";
import {
  GetAllOrderOutputData,
  GetAllOrderQuerySchema,
  UpdateOrderStatusInputData,
} from "@/schema/order";
import { getCursorKey, getScopedKey } from "@/utilities/computeKey";
import { useSearchParams } from "next/navigation";
import useSWR, { useSWRConfig } from "swr";
import useSWRInfinite, {
  SWRInfiniteConfiguration,
  unstable_serialize,
} from "swr/infinite";
import useSWRMutation from "swr/mutation";

export const useOrders = (
  organizationId: string | undefined,
  config?: SWRInfiniteConfiguration<GetAllOrderOutputData, Error>,
) => {
  const searchParams = useSearchParams();
  const query = {
    organizationId,
    ...GetAllOrderQuerySchema.parse(searchParams),
  };

  return useSWRInfinite(
    getCursorKey(ORDER_KEY, query),
    ([key, query]) => apiClient("@get/api/orders", { query, ...apiConfig }),
    config,
  );
};

export const useOrder = (id: string) => {
  return useSWR(getScopedKey(ORDER_KEY, id), ([key, id]) =>
    apiClient("@get/api/orders/:id", { params: { id }, ...apiConfig }),
  );
};

export const useUpdateOrderStatus = (
  id: string,
  organizationId: string | undefined,
) => {
  const { mutate } = useSWRConfig();

  return useSWRMutation(
    getScopedKey(ORDER_KEY, id),
    (key, { arg }: { arg: UpdateOrderStatusInputData }) =>
      apiClient("@patch/api/orders/:id/status", {
        params: { id },
        body: arg,
        ...apiConfig,
      }),
    {
      onSuccess: () => {
        mutate(unstable_serialize(getCursorKey(ORDER_KEY, { organizationId })));
        mutate(getScopedKey(ORDER_KEY, id));
      },
    },
  );
};
