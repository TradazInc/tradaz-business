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
  const { mutate } = useSWRConfig();

  return useSWRMutation(
    getScopedKey(SHIPPING_CONFIG_KEY, organizationId),
    (key, { arg }: { arg: CreateShippingConfigInputData }) =>
      apiClient("@post/api/shipping-configs", { body: arg, ...apiConfig }),
    {
      onSuccess: () =>
        mutate(
          unstable_serialize(
            getCursorKey(SHIPPING_CONFIG_KEY, { organizationId }),
          ),
        ),
    },
  );
};

export const useUpdateShippingConfig = (
  id: string,
  organizationId: string | undefined,
) => {
  const { mutate } = useSWRConfig();

  return useSWRMutation(
    getScopedKey(SHIPPING_CONFIG_KEY, id),
    (key, { arg }: { arg: UpdateShippingConfigInputData }) =>
      apiClient("@put/api/shipping-configs/:id", {
        params: { id },
        body: arg,
        ...apiConfig,
      }),
    {
      onSuccess: () =>
        mutate(
          unstable_serialize(
            getCursorKey(SHIPPING_CONFIG_KEY, { organizationId }),
          ),
        ),
    },
  );
};

export const useRemoveShippingConfig = (organizationId: string | undefined) => {
  const { mutate } = useSWRConfig();

  return useSWRMutation(
    getScopedKey(SHIPPING_CONFIG_KEY, organizationId),
    (key, { arg }: { arg: string }) =>
      apiClient("@delete/api/shipping-configs/:id", {
        params: { id: arg },
        ...apiConfig,
      }),
    {
      onSuccess: () =>
        mutate(
          unstable_serialize(
            getCursorKey(SHIPPING_CONFIG_KEY, { organizationId }),
          ),
        ),
    },
  );
};

export const useRemoveShippingMethod = (organizationId: string | undefined) => {
  const { mutate } = useSWRConfig();

  return useSWRMutation(
    getScopedKey(SHIPPING_CONFIG_KEY, organizationId),
    (key, { arg }: { arg: string }) =>
      apiClient("@delete/api/shipping-configs/shipping-methods/:id", {
        params: { id: arg },
        ...apiConfig,
      }),
    {
      onSuccess: () =>
        mutate(
          unstable_serialize(
            getCursorKey(SHIPPING_CONFIG_KEY, { organizationId }),
          ),
        ),
    },
  );
};
