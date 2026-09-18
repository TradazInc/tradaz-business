import { SHIPPING_CONFIG_KEY } from "@/data/cacheKeys";
import { apiClient, apiConfig } from "@/lib/apiClient";
import {
  CreateShippingConfigInputData,
  GetAllShippingConfigOutputData,
  GetAllShippingConfigQuerySchema,
  UpdateShippingConfigInputData,
} from "@/schema/shippingConfig";
import { getCursorKey, getScopedKey } from "@/utilities/computeKey";
import { useSWRConfig } from "swr";
import useSWRInfinite, {
  SWRInfiniteConfiguration,
  unstable_serialize,
} from "swr/infinite";
import useSWRMutation from "swr/mutation";
import { useSearchQuery } from "./useSearchQuery";

export const useShippingConfigs = (
  organizationId: string | undefined,
  config?: SWRInfiniteConfiguration<GetAllShippingConfigOutputData, Error>,
) => {
  const query = useSearchQuery(GetAllShippingConfigQuerySchema);

  return useSWRInfinite(
    getCursorKey(SHIPPING_CONFIG_KEY, { ...query, organizationId }),
    ([key, query]) =>
      apiClient("@get/api/shipping-configs", { query, ...apiConfig }),
    config,
  );
};

export const useAddShippingConfig = (organizationId: string | undefined) => {
  return useSWRMutation(
    unstable_serialize(getCursorKey(SHIPPING_CONFIG_KEY, { organizationId })),
    (key, { arg }: { arg: CreateShippingConfigInputData }) =>
      apiClient("@post/api/shipping-configs", { body: arg, ...apiConfig }),
  );
};

export const useUpdateShippingConfig = (organizationId: string | undefined) => {
  const { mutate } = useSWRConfig();

  return useSWRMutation(
    unstable_serialize(getCursorKey(SHIPPING_CONFIG_KEY, { organizationId })),
    (
      key,
      { arg }: { arg: { id: string; data: UpdateShippingConfigInputData } },
    ) =>
      apiClient("@put/api/shipping-configs/:id", {
        params: { id: arg.id },
        body: arg.data,
        ...apiConfig,
      }),
    {
      onSuccess: (data) => mutate(getScopedKey(SHIPPING_CONFIG_KEY, data.id)),
    },
  );
};

export const useRemoveShippingConfig = (organizationId: string | undefined) => {
  return useSWRMutation(
    unstable_serialize(getCursorKey(SHIPPING_CONFIG_KEY, { organizationId })),
    (key, { arg }: { arg: string }) =>
      apiClient("@delete/api/shipping-configs/:id", {
        params: { id: arg },
        ...apiConfig,
      }),
  );
};

export const useRemoveShippingMethod = (organizationId: string | undefined) => {
  return useSWRMutation(
    unstable_serialize(getCursorKey(SHIPPING_CONFIG_KEY, { organizationId })),
    (key, { arg }: { arg: string }) =>
      apiClient("@delete/api/shipping-configs/shipping-methods/:id", {
        params: { id: arg },
        ...apiConfig,
      }),
  );
};
