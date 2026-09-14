import { CHECKOUT_KEY, ORDER_KEY } from "@/data/cacheKeys";
import { apiClient, apiConfig } from "@/lib/apiClient";
import { CreateCheckoutInputData } from "@/schema/checkout";
import { getCursorKey, getScopedKey } from "@/utilities/computeKey";
import { useSWRConfig } from "swr";
import { unstable_serialize } from "swr/infinite";
import useSWRMutation from "swr/mutation";

export const useWebCheckout = (organizationId: string | undefined) => {
  const { mutate } = useSWRConfig();

  return useSWRMutation(
    getScopedKey(CHECKOUT_KEY, organizationId),
    (key, { arg }: { arg: CreateCheckoutInputData }) =>
      apiClient("@post/api/checkout/web", { body: arg, ...apiConfig }),
    {
      onSuccess: () =>
        mutate(unstable_serialize(getCursorKey(ORDER_KEY, { organizationId }))),
    },
  );
};

export const usePosCheckout = (organizationId: string | undefined) => {
  const { mutate } = useSWRConfig();

  return useSWRMutation(
    getScopedKey(CHECKOUT_KEY, organizationId),
    (key, { arg }: { arg: CreateCheckoutInputData }) =>
      apiClient("@post/api/checkout/pos", { body: arg, ...apiConfig }),
    {
      onSuccess: () =>
        mutate(unstable_serialize(getCursorKey(ORDER_KEY, { organizationId }))),
    },
  );
};
