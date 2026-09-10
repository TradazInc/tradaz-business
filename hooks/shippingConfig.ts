import { SHIPPING_CONFIG_KEY } from "@/data/cacheKeys";
import { apiClient } from "@/lib/apiClient";
import {
  CreateShippingConfigInputData,
  GetAllShippingConfigOutputData,
  UpdateShippingConfigInputData,
} from "@/schema/shippingConfig";
import { getCursorKey, getScopedKey } from "@/utilities/computeKey";
import { searchQuery } from "@/utilities/searchQuery";
import { useSearchParams } from "next/navigation";
import { useSWRConfig } from "swr";
import useSWRInfinite, {
  SWRInfiniteConfiguration,
  unstable_serialize,
} from "swr/infinite";
import useSWRMutation from "swr/mutation";

export const useShippingConfigs = (
  organizationId: string | undefined,
  config?: SWRInfiniteConfiguration<GetAllShippingConfigOutputData, Error>,
) => {
  const searchParams = useSearchParams();
  const query = { organizationId, ...searchQuery(searchParams) };

  return useSWRInfinite(
    getCursorKey(SHIPPING_CONFIG_KEY, query),
    ([key, query]) => apiClient("@get/api/shipping-configs", { query }),
    config,
  );
};

export const useAddShippingConfig = (organizationId: string | undefined) => {
  const { mutate } = useSWRConfig();

  return useSWRMutation(
    getScopedKey(SHIPPING_CONFIG_KEY, organizationId),
    (key, { arg }: { arg: CreateShippingConfigInputData }) =>
      apiClient("@post/api/shipping-configs", { body: arg }),
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

export const useUpdateShippingConfig = (organizationId: string | undefined) => {
  const { mutate } = useSWRConfig();

  return useSWRMutation(
    getScopedKey(SHIPPING_CONFIG_KEY, organizationId),
    (
      key,
      {
        arg,
      }: { arg: { id: string; shippingConfig: UpdateShippingConfigInputData } },
    ) =>
      apiClient("@put/api/shipping-configs/:id", {
        params: { id: arg.id },
        body: arg.shippingConfig,
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
      apiClient("@delete/api/shipping-configs/:id", { params: { id: arg } }),
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
