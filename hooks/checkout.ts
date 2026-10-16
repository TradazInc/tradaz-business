import { ORDER_KEY } from "@/data/cacheKeys";
import { apiClient, apiConfig } from "@/lib/apiClient";
import { scopeHeaders } from "@/utilities/scopeHeaders";
import { CreateCheckoutInputData } from "@/schema/checkout";
import { getCursorKey } from "@/utilities/computeKey";
import { unstable_serialize } from "swr/infinite";
import useSWRMutation from "swr/mutation";

export const useWebCheckout = (
  organizationId: string | undefined,
  teamId: string | undefined,
) => {
  return useSWRMutation(
    unstable_serialize(getCursorKey(ORDER_KEY, { organizationId })),
    (key, { arg }: { arg: CreateCheckoutInputData }) =>
      apiClient("@post/api/checkout/web", {
        body: arg,
        headers: scopeHeaders(organizationId, teamId),
        ...apiConfig,
      }),
  );
};

export const usePosCheckout = (
  organizationId: string | undefined,
  teamId: string | undefined,
) => {
  return useSWRMutation(
    unstable_serialize(getCursorKey(ORDER_KEY, { organizationId })),
    (key, { arg }: { arg: CreateCheckoutInputData }) =>
      apiClient("@post/api/checkout/pos", {
        body: arg,
        headers: scopeHeaders(organizationId, teamId),
        ...apiConfig,
      }),
  );
};
